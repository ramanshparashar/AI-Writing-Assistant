require("dotenv").config();
const express = require("express");
const axios = require("axios");
const spellChecker = express.Router();

spellChecker.post("/", async (req, res) => {
    const { text } = req.body;
    
      try {
        const response = await axios.post(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
          {
            contents: [
              {
                parts: [
                  {
                    text: `You are a helpful assistant that checks and corrects spelling errors in the following text. Only return the corrected text without any additional comments or context:\n\n${text}`
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
})

module.exports = spellChecker;