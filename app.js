const express = require("express");
const app = express();
const { body, validationResult, matchedData } = require("express-validator");
const indexRouter = require("./routes/index");
const gamesRouter = require("./routes/games");
const developersRouter = require("./routes/developers");
const genresRouter = require("./routes/genres");

app.use("/", indexRouter);
app.use("/games", gamesRouter);
app.use("/developers", developersRouter);
app.use("/genres", genresRouter);

const PORT = process.env.DATABASE_URL || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
