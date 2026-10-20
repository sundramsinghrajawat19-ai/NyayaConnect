require("dotenv").config();

const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const bcrypt = require("bcryptjs");
const path = require("path");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

const client = new MongoClient(process.env.MONGODB_URI, {
  autoSelectFamily: false
});

let db;
let users;
let cases;

app.use(express.json());
app.use(express.json());

app.use(session({
  name: "nyaya.sid",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    client,
    dbName: "nyayaconnect",
    collectionName: "sessions"
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000
  }
}));

async function connectDB() {
  await client.connect();

  db = client.db("nyayaconnect");
  users = db.collection("users");
  cases = db.collection("case_analyses");

  await db.command({ ping: 1 });

  await users.createIndex({ email: 1 }, { unique: true });



  app.use(express.static(path.join(__dirname, "public")));

  console.log("MongoDB connected successfully!");
}

function requireAuth(req, res, next) {
  if (!req.session?.user) {
    return res.status(401).json({
      error: "Please log in to continue."
    });
  }

  next();
}

function regenerateSession(req) {
  return new Promise((resolve, reject) => {
    req.session.regenerate(error => {
      if (error) reject(error);
      else resolve();
    });
  });
}

// Check server status
app.get("/api/health", (req, res) => {
  res.json({ message: "NyayaConnect backend is running!" });
});

// Create account
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      name.trim().length > 100 ||
      password.length < 8 ||
      password.length > 72 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return res.status(400).json({
        error: "Enter a valid name and email. Password must be 8–72 characters."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await users.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(409).json({
        error: "An account with this email already exists."
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await users.insertOne({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      createdAt: new Date()
    });

    await regenerateSession(req);

    req.session.user = {
      id: result.insertedId.toString(),
      name: name.trim(),
      email: normalizedEmail
    };

    await new Promise((resolve, reject) => {
      req.session.save(error => {
        if (error) reject(error);
        else resolve();
      });
    });

    res.status(201).json({
      message: "Account created successfully!",
      user: req.session.user
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: "An account with this email already exists."
      });
    }

    console.error("Signup failed:", error.message);
    res.status(500).json({ error: "Could not create account." });
  }
});

// Log in
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        error: "Enter your email and password."
      });
    }

    const user = await users.findOne({
      email: email.trim().toLowerCase()
    });

    if (
      !user ||
      !(await bcrypt.compare(password, user.passwordHash))
    ) {
      return res.status(401).json({
        error: "Invalid email or password."
      });
    }

    await regenerateSession(req);

    req.session.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email
    };

    await new Promise((resolve, reject) => {
      req.session.save(error => {
        if (error) reject(error);
        else resolve();
      });
    });

    res.json({
      message: "Login successful!",
      user: req.session.user
    });
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(500).json({ error: "Could not log in." });
  }
});

// Get current logged-in user
app.get("/api/me", (req, res) => {
  res.json({ user: req.session?.user || null });
});

// Log out
app.post("/api/logout", (req, res) => {
  req.session.destroy(error => {
    if (error) {
      return res.status(500).json({
        error: "Could not log out."
      });
    }

    res.clearCookie("nyaya.sid", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    });

    res.json({ message: "Logged out successfully." });
  });
});

// MongoDB test route
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await db.collection("test_records").insertOne({
      message: "NyayaConnect MongoDB test successful",
      createdAt: new Date()
    });

    res.json({
      message: "Record saved successfully!",
      id: result.insertedId
    });
  } catch (error) {
    console.error("Database test failed:", error.message);
    res.status(500).json({ error: "Could not save record." });
  }
});

// Private case history: only return this user's cases
app.get("/api/cases", requireAuth, async (req, res) => {
  try {
    const savedCases = await cases
      .find({ userId: req.session.user.id })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(savedCases);
  } catch (error) {
    console.error("Failed to load case history:", error.message);
    res.status(500).json({
      error: "Unable to load case history."
    });
  }
});

// Analyze a legal problem using Gemini
app.post("/api/analyze", requireAuth, async (req, res) => {
  const { problem } = req.body;

  if (
    typeof problem !== "string" ||
    problem.trim().length < 15
  ) {
    return res.status(400).json({
      error: "Please describe your problem in at least 15 characters."
    });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: "Gemini API key is not configured."
    });
  }

  try {
    const { GoogleGenAI } = await import("@google/genai");

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `
You are the general legal information assistant for NyayaConnect.

Explain the user's legal problem in simple language.
Do not claim to be a lawyer or give a definitive legal opinion.
Do not invent laws, citations, deadlines, or facts.
If jurisdiction is unknown, explain that laws vary by location.
Recommend consulting a qualified lawyer for specific advice.

Return only valid JSON in this format:
{
  "explanation": "A clear explanation of the problem",
  "nextSteps": [
    "Practical step one",
    "Practical step two",
    "Practical step three"
  ]
}

User's problem:
${problem.trim()}
      `,
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text);

    if (
      typeof result.explanation !== "string" ||
      !Array.isArray(result.nextSteps) ||
      !result.nextSteps.every(step => typeof step === "string")
    ) {
      throw new Error("Invalid response format");
    }

    const savedCase = await cases.insertOne({
      userId: req.session.user.id,
      problem: problem.trim(),
      explanation: result.explanation,
      nextSteps: result.nextSteps,
      createdAt: new Date()
    });

    res.json({
      message: "Problem analyzed successfully!",
      id: savedCase.insertedId,
      problem: problem.trim(),
      explanation: result.explanation,
      nextSteps: result.nextSteps
    });
  } catch (error) {
    console.error("Gemini analysis failed:", error.message);

    res.status(502).json({
      error: "Unable to analyze the problem right now. Please try again."
    });
  }
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error("Startup failed:", error.message);
    process.exit(1);
  });