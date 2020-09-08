const mongoose = require("mongoose");
const Argument = require("./Argument");

const Schema = mongoose.Schema; // Create Schema

const expertOpinionArgumentSchema = new Schema({
  E: {
    type: String,
    required: true,
  },
  D: {
    type: String,
    required: true,
  },
  A: {
    type: String,
    required: true,
  },
});

expertOpinionArgumentSchema.methods.criticalQuestions = () => {
  return [
    `How credible is "${this.E}" as an Expert?`,
    `Is "${this.E}" an expert in the field that "${this.A}" is in?`,
    `Is "${this.A}" consistent with what other experts assert?`,
  ];
};

expertOpinionArgumentSchema.methods.summary = () => {
  return (
    `"${this.E}" is an expert in subject domain "${this.D}" ` +
    `containing proposition "${this.A}". ` +
    `"${this.E}" asserts that "${this.A}" is true.` +
    `Therefore "${this.A}" is true.`
  );
};

module.exports = ExpertOpinionArgument = Argument.discriminator(
  "ExpertOpinionArgument",
  expertOpinionArgumentSchema,
  { discriminatorKey: "kind" }
);
