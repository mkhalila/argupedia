const mongoose = require("mongoose");

const Schema = mongoose.Schema; // Create Schema

let Argument = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
  },
  { discriminatorKey: "kind" }
);

module.exports = Argument = mongoose.model("arguments", Argument);
