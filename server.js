
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Allow the server to read JSON data
app.use(express.json());

// Serve our frontend files
app.use(express.static(path.join(__dirname, "public")));

// Test API endpoint
app.get("/api/health", (req, res) => {
  res.json({
    message: "NyayaConnect backend is running!"
  });
});


app.post("/api/analyze", (req, res) => {
  const { problem } = req.body;

  if (typeof problem !== "string" || problem.trim().length < 15) {
    return res.status(400).json({
      error: "Please describe your problem in at least 15 characters."
    });
  }

  res.json({
    message: "Problem received successfully!",
    problem: problem.trim(),
    explanation:
      "Your description has reached the NyayaConnect backend. A reliable legal explanation will require further analysis of the facts and applicable law.",
    nextSteps: [
      "Organize relevant documents and correspondence.",
      "Write down important events in chronological order.",
      "Consult a qualified lawyer about your specific situation."
    ]
  });
});

app.listen(PORT, () => {
  console.log(`NyayaConnect running at http://localhost:${PORT}`);
});
