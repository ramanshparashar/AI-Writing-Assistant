require("dotenv").config();
const express = require("express");
const axios = require("axios");
const grammarCheck = express.Router();

grammarCheck.post("/", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: `Correct the grammar of the following text and return only the corrected sentence:\n\n${text}`
              }
            ]
          }
        ]
      },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: process.env.GEMINI_API_KEY }
      }
    );

    const correctedText =
      response.data.candidates[0]?.content?.parts[0]?.text?.trim() || "";

    res.json({ correctedText });
  } catch (error) {
    console.error("Error calling Gemini API:", error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = grammarCheck;
