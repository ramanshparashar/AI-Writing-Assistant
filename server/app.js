const express = require("express");
const cors = require("cors");
require("dotenv").config();
const analyzeRouter = require("./api/analyze");
const grammarCheck = require("./api/grammarChecker");
const spellChecker = require("./api/spellChecker");
const app = express();


const PORT = 3000;

//config cors
app.use(cors());
app.use(express.json()); //for parsing application/json

//routes
app.use("/api/analyze", analyzeRouter);
app.use("/api/grammarchecker", grammarCheck);
app.use("/api/spellchecker", spellChecker);

//start server
app.listen(PORT, () => {
  console.log(`AI Writing app listening at http://localhost:${PORT}`);
});
