const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validators/user-register");
const validateLoginInput = require("../../validators/user-login");
const validateUserDeleteInput = require("../../validators/user-delete");
const validateUserReadInput = require("../../validators/user-read");
const validateUserUpdateInput = require("../../validators/user-update");

// Load User model
const User = require("../../models/User");

// Create/Register a new user
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// Authenticate a user and return login token
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body); // Check validation

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// Get a single user
router.get("/", (req, res) => {
  // Form validation
  const { errors, isValid } = validateUserReadInput(req.body); // Check validation

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    return res.status(200).json({
      user,
    });
  });
});

// Get a single user
router.get("/id", (req, res) => {
  // Form validation
  // const { errors, isValid } = validateUserReadInput(req.body); // Check validation

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  const id = req.query.id;

  // Find user by id
  User.findById(id).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    return res.status(200).json({
      user,
    });
  });
});

// Delete user
router.delete("/", (req, res) => {
  // Form validation
  const { errors, isValid } = validateUserDeleteInput(req.body); // Check validation

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        User.deleteOne({ email }).then((user) => {
          return res.status(200).json({
            success: true,
          });
        });
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// Update user
router.put("/", (req, res) => {
  // Form validation
  const { errors, isValid } = validateUserUpdateInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  const update = {
    name: req.body.name,
    email: req.body.newEmail,
    password: req.body.newPassword,
  };

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(update.password, salt, (err, hash) => {
            if (err) throw err;
            update.password = hash;
            User.findOneAndUpdate({ email: req.body.email }, update).then(
              (user) => {
                return res.status(200).json({
                  success: true,
                });
              }
            );
          });
        });
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.get("/all", (req, res) => {
  User.find().then((users) => res.send(users));
});

module.exports = router;
