

require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Check whether the backend is running
app.get("/api/health", (req, res) => {
  res.json({
    message: "NyayaConnect backend is running!"
  });
});

// Analyze a legal problem using Gemini
app.post("/api/analyze", async (req, res) => {
  const { problem } = req.body;

  if (typeof problem !== "string" || problem.trim().length < 15) {
    return res.status(400).json({
      error: "Please describe your problem in at least 15 characters."
    });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: "Gemini API key is not configured on the server."
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
Do not claim to be a lawyer or provide a definitive legal opinion.
Do not invent laws, legal citations, deadlines, or facts.
If the jurisdiction is unknown, explain that applicable laws vary by location.
Suggest practical next steps and recommend consulting a qualified lawyer
for advice specific to the user's circumstances.

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

    res.json({
      message: "Problem analyzed successfully!",
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

app.listen(PORT, () => {
  console.log(`NyayaConnect running at http://localhost:${PORT}`);
});
