const express = require("express");
const app = express();
const { body, validationResult, matchedData } = require("express-validator");

const PORT = process.env.DATABASE_URL || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
