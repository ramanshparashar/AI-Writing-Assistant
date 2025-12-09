// quick script: listModels.js
const axios = require('axios');
require('dotenv').config();

(async () => {
  try {
    const res = await axios.get(
      'https://generativelanguage.googleapis.com/v1beta/models',
      { headers: { 'x-goog-api-key': process.env.GEMINI_API_KEY } }
    );
    console.log('Available models:', res.data);
  } catch (err) {
    console.error('listModels error:', err.response?.data || err.message);
  }
})();
