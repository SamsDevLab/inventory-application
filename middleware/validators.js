const { body, validationResult, matchedData } = require("express-validator");

exports.validateAddGame = [
  body("game")
    .trim()
    .notEmpty()
    .withMessage("'Game Title' cannot be empty")
    .isLength({ min: 1, max: 30 })
    .withMessage(
      "'Game Title' has to be at least 1 character and no more than 20 characters long",
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 400;
      error.errors = errors.array();

      return next(error);
    }
    next();
  },
];

exports.validateAddOrEditDeveloper = [
  body("developer")
    .trim()
    .notEmpty()
    .withMessage("'Developer' cannot be empty")
    .isLength({ min: 1, max: 30 })
    .withMessage(
      "'Developer' has to be at least 1 character and no more than 20 characters long",
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 400;
      error.errors = errors.array();

      return next(error);
    }
    next();
  },
];

exports.validateAddOrEditGenre = [
  body("genre")
    .trim()
    .notEmpty()
    .withMessage("'Genre' cannot be empty")
    .isLength({ min: 1, max: 30 })
    .withMessage(
      "'Genre' has to be at least 1 character and no more than 20 characters long",
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 400;
      error.errors = errors.array();

      return next(error);
    }
    next();
  },
];
