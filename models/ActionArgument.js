const mongoose = require("mongoose");
const Argument = require("./Argument");

const Schema = mongoose.Schema; // Create Schema

const actionArgumentSchema = new Schema(
  {
    R: {
      type: String,
      required: true,
    },
    A: {
      type: String,
      required: true,
    },
    S: {
      type: String,
      required: true,
    },
    G: {
      type: String,
      required: true,
    },
    V: {
      type: String,
      required: true,
    },
  },
  options
);

actionArgumentSchema.methods.criticalQuestions = () => {
  return [
    `Are the believed circumstances "${this.R}" true?`,
    `Does the goal "${this.G}" realise the value "${this.V}" stated?`,
    `Are there alternative ways of realising the same goal "${this.G}"?`,
    `Is the value "${this.V}" indeed a legitimate value?`,
  ];
};

actionArgumentSchema.methods.summary = () => {
  return (
    `In the current circumstances "${this.R}"; ` +
    `We should perform action "${this.A}"; ` +
    `Which will result in new circumstances "${this.S}"; ` +
    `Which will realise goal "${this.G}"; ` +
    `Which will promote value "${this.V}".`
  );
};

module.exports = ActionArgument = Argument.discriminator(
  "ActionArgument",
  actionArgumentSchema
);
