// genres router
const express = require("express");
const router = express.Router();

router.get("/", () => {
  console.log("You've reached the Genres page!");
});

module.exports = router;
