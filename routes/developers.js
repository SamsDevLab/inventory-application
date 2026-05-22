// developers router
const express = require("express");
const router = express.Router();
const { validateAddOrEditDeveloper } = require("../middleware/validators");
const { handleErrors } = require("../middleware/errors");
const developersController = require("../controllers/developers");

router.get("/", developersController.getAllDevelopers);

router.get("/add", developersController.renderAddDeveloperForm);
router.post(
  "/add",
  validateAddOrEditDeveloper,
  handleErrors,
  developersController.addDeveloperToDatabase,
);

router.get("/edit/:id", developersController.renderEditForm);
router.post(
  "/edit/:id",
  validateAddOrEditDeveloper,
  handleErrors,
  developersController.addEditedDevToDatabase,
);

router.post("/delete/:id", developersController.deleteDeveloper);

module.exports = router;
