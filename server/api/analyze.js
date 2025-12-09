// server/api/analyze.js
const axios = require("axios");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sentence } = req.body || {};
  if (!sentence) return res.status(400).json({ error: "sentence is required" });

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
                text: `Rephrase ONLY the following sentence in 3 different ways.
                       Do not explain anything, do not define anything, and do not change the meaning.
                       Each rephrasing should be on a new line without numbering.
                       Sentence: "${sentence}"`
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

    const raw = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const rephrasedSentences = raw
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);

    return res.json({ rephrasedSentences });
  } catch (error) {
    console.error("Analyze error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Analyze failed" });
  }
};
