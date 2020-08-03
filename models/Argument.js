const mongoose = require("mongoose");
const User = require("./User");

const Schema = mongoose.Schema; // Create Schema

const Argument = new Schema(
  {
    user: {
      type: User,
      required: true,
    },
  },
  { discriminatorKey: "kind" }
);

module.exports = Argument = mongoose.model("arguments", Argument);
