const mongoose = require("mongoose");
const Argument = require("./Argument");
const User = require("./User");

const Schema = mongoose.Schema; // Create Schema

let CounterArgument = new Schema({
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
  criticalQuestion: {
    type: String,
    required: true,
  },
  argument: {
    type: String,
    required: true,
  },
});

CounterArgument.methods.score = () => {
  return this.upvotes.length - this.downvotes.length;
};

CounterArgument.methods.upvote = (user) => {
  this.upvotes.push(user);
};

CounterArgument.methods.downvote = (user) => {
  this.downvotes.push(user);
};

module.exports = CounterArgument = mongoose.model(
  "counter_arguments",
  CounterArgument
);
