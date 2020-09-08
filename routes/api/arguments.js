const express = require("express");
const router = express.Router();

// Load input validation
const validateRegisterInput = require("../../validators/user-register");
const validateLoginInput = require("../../validators/user-login");
const validateUserDeleteInput = require("../../validators/user-delete");
const validateUserReadInput = require("../../validators/user-read");
const validateUserUpdateInput = require("../../validators/user-update");

// Load User model
const Argument = require("../../models/Argument");

// Get a single argument
router.get("/id", (req, res) => {
  // Form validation
  // const { errors, isValid } = validateUserReadInput(req.body); // Check validation

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  const id = req.query.id;

  // Find user by id
  Argument.findById(id).then((argument) => {
    // Check if user exists
    if (!argument) {
      return res.status(404).json({ argumentnotfound: "Argument not found" });
    }

    return res.status(200).json({
      argument,
    });
  });
});

module.exports = router;
