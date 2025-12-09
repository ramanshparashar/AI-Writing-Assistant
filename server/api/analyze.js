const axios = require("axios");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error("MISSING_GEMINI_API_KEY in runtime!");
    return res.status(500).json({ error: "MISSING_GEMINI_API_KEY" });
  }

  const { sentence } = req.body || {};
  if (!sentence) return res.status(400).json({ error: "sentence is required" });

  try {
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    const payload = {
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
    };

    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY
      },
      timeout: 60000
    });

    console.log("Gemini raw response (analyze):", JSON.stringify(response.data, null, 2));

    const raw = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const rephrasedSentences = raw
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);

    return res.json({ rephrasedSentences });
  } catch (error) {
    console.error("Analyze error:", error.response?.data || error.message || error);
    return res.status(500).json({
      error: "Analyze failed",
      details: error.response?.data || error.message
    });
  }
};
