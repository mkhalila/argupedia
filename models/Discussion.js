const mongoose = require("mongoose");
const Argument = require("./Argument");
const User = require("./User");
const CounterArgument = require("./CounterArgument");

const Schema = mongoose.Schema; // Create Schema

let Discussion = new Schema({
  user: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  upvotes: [String],
  downvotes: [String],
  argument: {
    type: String,
    required: true,
  },
  counterArguments: [String],
  attackRelation: Map,
});

Discussion.methods.score = () => {
  return this.upvotes.length - this.downvotes.length;
};

Discussion.methods.upvote = (user, cb) => {
  console.log(this.upvotes);
  // this.upvotes.push(user);
  return cb();
};

Discussion.methods.downvote = (user) => {
  this.downvotes.push(user);
};

module.exports = Discussion = mongoose.model("discussions", Discussion);
