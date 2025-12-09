// server/api/spellChecker.js
// const axios = require("axios");

// module.exports = async (req, res) => {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { text } = req.body || {};
//   if (!text) return res.status(400).json({ error: "text is required" });

//   try {
//     const url =
//       "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

//     const payload = {
//       contents: [
//         {
//           parts: [
//             {
//               text: `You are a helpful assistant that checks and corrects spelling errors in the following text. Only return the corrected text without any additional comments or context:\n\n${text}`
//             }
//           ]
//         }
//       ]
//     };

//     const response = await axios.post(url, payload, {
//       headers: {
//         "Content-Type": "application/json",
//         "x-goog-api-key": process.env.GEMINI_API_KEY
//       },
//       timeout: 60000
//     });

//     console.log("Gemini raw response (spell):", JSON.stringify(response.data, null, 2));

//     const correctedText =
//       response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
//       ?? response.data?.response?.text?.trim()
//       ?? "";

//     return res.json({ correctedText });
//   } catch (error) {
//     console.error("Spell error:", error.response?.data || error.message || error);
//     return res.status(500).json({
//       error: "Spell check failed",
//       details: error.response?.data || error.message
//     });
//   }
// };

// server/api/spellChecker.js (TEMP DEBUG — replace only for testing)
module.exports = async (req, res) => {
  // accept only POST as before
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // check request body
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: "text is required" });

  // debug info about runtime and environment
  try {
    return res.json({
      ok: true,
      message: "Debug endpoint responding",
      env_has_GEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
      node_version: process.version,
      time: new Date().toISOString()
    });
  } catch (err) {
    console.error("Debug handler error:", err);
    return res.status(500).json({ error: "Debug handler failed", details: String(err) });
  }
};

