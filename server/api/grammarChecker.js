// server/api/grammarChecker.js
const axios = require("axios");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: "text is required" });

  try {
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    const response = await axios.post(
      url,
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
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    return res.json({ correctedText });
  } catch (error) {
    console.error("Grammar error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Grammar check failed" });
  }
};
