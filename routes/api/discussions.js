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
const { count } = require("../../models/Argument");

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
        attackRelation: {},
      };
      console.log(argument);
      newDiscussion = new Discussion(discussion);
      newDiscussion.save().then((discussion) => {
        res.json(discussion);
      });
    });
  });
});

router.post("/attack", (req, res) => {
  // // Form validation
  // const { errors, isValid } = validateCreateInput(req.body);
  // console.log(errors);
  // // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  // Assign it a user
  User.findById(req.body.user).then((user) => {
    if (!user) {
      return res.status(404).json({ usernotfound: "User not found" });
    }

    Discussion.findById(req.body.discussion).then((discussion) => {
      if (!discussion) {
        return res
          .status(404)
          .json({ discussionnotfound: "Discussion not found" });
      }

      // Create argument
      argument = {};
      argument.user = user._id;
      argument.kind = req.body.scheme;
      Object.assign(argument, req.body.argumentValues);

      if (argument.kind === "ActionArgument") {
        newArgument = new ActionArgument(argument);
      } else if (argument.kind === "ExpertOpinionArgument") {
        newArgument = new ExpertOpinionArgument(argument);
      } else {
        newArgument = new Argument(argument);
      }
      newArgument.save().then((argument) => {
        counterArgument = {
          user: user._id,
          argument: argument._id,
          upvotes: [user._id],
          criticalQuestion: req.body.criticalQuestion,
        };
        newCounterArgument = new CounterArgument(counterArgument);
        newCounterArgument.save().then((counter) => {
          // Update discussion
          discussion.counterArguments.push(counter._id);
          console.log(String(counter._id), req.body.victim);
          discussion.attackRelation.set(String(counter._id), req.body.victim);
          discussion.save().then((discussion) => {
            res.json(discussion);
          });
        });
      });
    });
  });
});

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

// Retrieve Discussion by ID
router.get("/id", (req, res) => {
  Discussion.findById(req.query.id).then((discussion) => {
    User.findById(discussion.user).then((user) => {
      Argument.findById(discussion.argument).then((argument) => {
        const d = {
          _id: discussion._id,
          date: discussion.date,
          upvotes: discussion.upvotes,
          downvotes: discussion.downvotes,
          counterArguments: discussion.counterArguments,
          attackRelation: discussion.attackRelation,
        };

        d.user = {
          _id: user._id,
          name: user.name,
        };
        d.argument = argument;
        res.json(d);
      });
    });
  });
});

router.post("/upvote", (req, res) => {
  Discussion.findById(req.body.id).then((discussion) => {
    if (discussion.upvotes.includes(req.body.user)) {
      // Prevent more than one upvote by the same user
      return res.json();
    }
    if (discussion.downvotes.includes(req.body.user)) {
      // If downvoted, remove downvote
      discussion.downvotes.splice(
        discussion.downvotes.indexOf(req.body.user),
        1
      );
    }
    discussion.upvotes.push(req.body.user);
    discussion.save().then((discussion) => {
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

// Retrieve counter argument by ID
router.get("/counter/id", (req, res) => {
  CounterArgument.findById(req.query.id).then((counterArgument) => {
    const response = {
      date: counterArgument.date,
      upvotes: counterArgument.upvotes,
      downvotes: counterArgument.downvotes,
      criticalQuestion: counterArgument.criticalQuestion,
    };
    Argument.findById(counterArgument.argument).then((argument) => {
      response.argument = argument;
      User.findById(counterArgument.user).then((user) => {
        response.user = user.name;
        res.send(response);
      });
    });
  });
});

router.post("/counter/upvote", (req, res) => {
  CounterArgument.findById(req.body.id).then((ca) => {
    if (ca.upvotes.includes(req.body.user)) {
      // Prevent more than one upvote by the same user
      return res.json();
    }
    if (ca.downvotes.includes(req.body.user)) {
      // If downvoted, remove downvote
      ca.downvotes.splice(ca.downvotes.indexOf(req.body.user), 1);
    }
    ca.upvotes.push(req.body.user);
    ca.save().then((updated) => {
      res.json(updated);
    });
  });
});

router.post("/counter/downvote", (req, res) => {
  CounterArgument.findById(req.body.id).then((ca) => {
    if (ca.downvotes.includes(req.body.user)) {
      // Prevent more than one downvote by the same user
      return res.json();
    }
    if (ca.upvotes.includes(req.body.user)) {
      // If upvoted, remove upvote
      ca.upvotes.splice(ca.upvotes.indexOf(req.body.user), 1);
    }
    ca.downvotes.push(req.body.user);
    ca.save().then((updated) => {
      res.json(updated);
    });
  });
});

// Retrieve counter argument of a argument
router.get("/counterArgument", (req, res) => {
  const argument = req.query.id;
  CounterArgument.findOne({ argument }).then((ca) => res.json(ca));
});

router.get("/counterArguments", (req, res) => {
  CounterArgument.find().then((ca) => res.json(ca));
});

router.get("/what", (req, res) => {
  what = req.query.id;
  console.log(what);
  CounterArgument.findById(what).then((ca) => {
    console.log(ca);
    Argument.findById(what).then((a) => {
      console.log(a);
      res.json([]);
    });
  });
});

module.exports = router;
