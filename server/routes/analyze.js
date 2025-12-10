// require("dotenv").config();
// const express = require("express");
// const analyzeRouter = express.Router();
// const axios = require("axios");

// analyzeRouter.post("/", async (req, res) => {
//   const { sentence } = req.body;

//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-4o-mini",
//         messages: [
//           {
//             role: "system",
//             content:
//               "You are a helpful assistant that rephrases sentences. Only return the rephrased sentences without any additional comments or context.",
//           },
//           {
//             role: "user",
//             content: `${sentence}`,
//           },
//         ],
//         max_tokens: 150,
//         n: 3,
//         stop: null,
//         temperature: 0.7,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         },
//       }
//     );
//     console.log("Response from OpenAI:", response.data);
//   } catch (error) {
//     console.log("Error calling OpenAI API:", error);
//     res.status(500).json({ error: error.message });
//   }
// });
// module.exports = analyzeRouter;

//========================================================================================


// require("dotenv").config();
// const express = require("express");
// const analyzeRouter = express.Router();
// const axios = require("axios");

// analyzeRouter.post("/", async (req, res) => {
//   const { sentence } = req.body;

//   try {
//     const response = await axios.post(
//       "https://api.perplexity.ai/chat/completions", 
//       {
//         model:"sonar-pro",
//         messages: [
//           {
//             role: "system",
//             content:
//               "You are a helpful assistant that ONLY rephrases the given text. Do not search the web, add citations, or provide explanations.",
//           },
//           {
//             role: "user",
//             content: `Rephrase ONLY the following sentence in 3 different ways. 
//                       Do not explain anything, do not define anything, and do not change the meaning. 
//                       Here is the sentence: "${sentence}".
//                       Return each rephrasing on a new line without numbering.`,
//           },
//         ],
//         max_tokens: 150,
//         temperature: 0.7,
//         return_citations: false,
//         search_domain_filter: [],
//         top_p: 1,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
//         },
//       }
//     );

//     // Get the single text block
//     const text = response.data.choices[0].message.content.trim();

//     // Split into multiple rephrasings
//     const rephrasedSentences = text
//       .split("\n")
//       .map(line => line.replace(/^\d+[\).\s]*/, "").trim())
//       .filter(line => line.length > 0);

//     res.json({ rephrasedSentences });
//   } catch (error) {
//     console.log("Error calling Perplexity API:", error.response?.data || error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = analyzeRouter;

//========================================================================================

require("dotenv").config();
const express = require("express");
const axios = require("axios");

const analyzeRouter = express.Router();

analyzeRouter.post("/", async (req, res) => {
  const { sentence } = req.body;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
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

    const text = response.data.candidates[0].content.parts[0].text.trim();
    const rephrasedSentences = text.split("\n").map(line => line.trim()).filter(Boolean);

    res.json({ rephrasedSentences });
  } catch (error) {
    console.error("Error calling Gemini API:", error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = analyzeRouter;



