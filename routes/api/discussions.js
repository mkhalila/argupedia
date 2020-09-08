const express = require("express");
const router = express.Router();

// Load input validation
const validateCreateInput = require("../../validators/discussion-create");

// Load models
const Discussion = require("../../models/Discussion");
const User = require("../../models/User");
const Argument = require("../../models/Argument");
const ActionArgument = require("../../models/ActionArgument");
const ExpertOpinionArgument = require("../../models/ExpertOpinionArgument");
const CounterArgument = require("../../models/CounterArgument");

// Create a new discussion
router.post("/", (req, res) => {
  // Form validation
  const { errors, isValid } = validateCreateInput(req.body);
  console.log(errors);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Assign it a user
  User.findById(req.body.user).then((user) => {
    if (!user) {
      return res.status(404).json({ usernotfound: "User not found" });
    }

    // Create an argument
    argument = {};
    argument.user = user._id;
    argument.kind = req.body.scheme;
    Object.assign(argument, req.body.argumentValues);
    console.log(argument);
    if (argument.kind === "ActionArgument") {
      newArgument = new ActionArgument(argument);
    } else if (argument.kind === "ExpertOpinionArgument") {
      newArgument = new ExpertOpinionArgument(argument);
    } else {
      newArgument = new Argument(argument);
    }
    newArgument.save().then((argument) => {
      // Create new Discussion and return id
      discussion = {
        user: user._id,
        argument: argument._id,
        upvotes: [user._id],
      };
      console.log(argument);
      newDiscussion = new Discussion(discussion);
      newDiscussion.save().then((discussion) => {
        res.json(discussion);
      });
    });
  });
});

// router.post("/attack", (req, res) => {
//   // // Form validation
//   // const { errors, isValid } = validateCreateInput(req.body);
//   // console.log(errors);
//   // // Check validation
//   // if (!isValid) {
//   //   return res.status(400).json(errors);
//   // }

//   // Assign it a user
//   User.findById(req.body.user).then((user) => {
//     if (!user) {
//       return res.status(404).json({ usernotfound: "User not found" });
//     }

//     Discussion.findById(req.body.discussion).then((discussion) => {
//       if (!discussion) {
//         return res
//           .status(404)
//           .json({ discussionnotfound: "Discussion not found" });
//       }

//       // Create argument
//       argument = {};
//       argument.user = user._id;
//       argument.kind = req.body.scheme;
//       Object.assign(argument, req.body.argumentValues);

//       if (argument.kind === "ActionArgument") {
//         newArgument = new ActionArgument(argument);
//       } else if (argument.kind === "ExpertOpinionArgument") {
//         newArgument = new ExpertOpinionArgument(argument);
//       } else {
//         newArgument = new Argument(argument);
//       }
//       newArgument.save().then((argument) => {
//         counterArgument = {
//           user: user._id,
//           argument: argument._id,
//           upvotes: [user._id],
//           criticalQuestion: req.body.criticalQuestion,
//         };
//         newCounterArgument = new CounterArgument(counterArgument);
//         newCounterArgument.save().then((counter) => {
//           // Update discussion
//           discussion.counterArguments.push(counter._id);
//           discussion.attackRelation.set(counter._id, req.body.victim);
//           discussion.save().then((discussion) => {
//             res.json(discussion);
//           });
//         });
//       });
//     });
//   });
// });

// Retrieve all discussions
router.get("/", (req, res) => {
  Discussion.find().then((discussions) => res.json(discussions));
});

// Delete a discussion given an ID
router.delete("/", (req, res) => {
  Discussion.findById(req.body.id).then((discussion) => {
    Argument.findByIdAndDelete(discussion.argument).then((argument) => {
      Discussion.findByIdAndDelete(req.body.id).then((deleted) =>
        res.json(deleted)
      );
    });
  });
});

// Retrieve all Arguments
router.get("/arg", (req, res) => {
  Argument.find().then((discussions) => res.json(discussions));
});

router.post("/upvote", (req, res) => {
  Discussion.findById(req.body.id).then((discussion) => {
    if (discussion.upvotes.includes(req.body.user)) {
      console.log("not 1", req.body.user, discussion.upvotes);
      // Prevent more than one upvote by the same user
      return res.json();
    }
    if (discussion.downvotes.includes(req.body.user)) {
      // If downvoted, remove downvote
      console.log("not 2");
      discussion.downvotes.splice(
        discussion.downvotes.indexOf(req.body.user),
        1
      );
    }
    console.log("yes 1");
    discussion.upvotes.push(req.body.user);
    discussion.save().then((discussion) => {
      console.log("yes 2");
      res.json(discussion);
    });
  });
});

router.post("/downvote", (req, res) => {
  Discussion.findById(req.body.id).then((discussion) => {
    if (discussion.downvotes.includes(req.body.user)) {
      // Prevent more than one downvote by the same user
      return res.json();
    }
    if (discussion.upvotes.includes(req.body.user)) {
      // If upvoted, remove upvote
      discussion.upvotes.splice(discussion.upvotes.indexOf(req.body.user), 1);
    }
    discussion.downvotes.push(req.body.user);
    discussion.save().then((discussion) => {
      res.json(discussion);
    });
  });
});

// Given an ID
// Return Discussion object
// Given nothing
// Return all Discussions

// Counter Arguments

module.exports = router;
