// server/app.js - safe for local dev and Vercel
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import the serverless handlers (these export a function (req, res))
const analyzeHandler = require("./api/analyze");
const grammarHandler = require("./api/grammarChecker");
const spellHandler = require("./api/spellChecker");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("AI Writing server (local dev). Use POST /api/spellChecker, /api/grammarChecker, /api/analyze");
});


app.post("/api/analyze", (req, res) => analyzeHandler(req, res));
app.post("/api/grammarChecker", (req, res) => grammarHandler(req, res));
app.post("/api/spellChecker", (req, res) => spellHandler(req, res));


if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`AI Writing app listening at http://localhost:${PORT}`);
  });
} else {
  console.log("Running on Vercel - Express server not started. Using serverless /api handlers.");
}

module.exports = app;
