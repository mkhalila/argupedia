const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCreateInput(data) {
  let errors = {}; // Convert empty fields to an empty string so we can use validator functions

  data.user = !isEmpty(data.user) ? data.user : "";
  data.scheme = !isEmpty(data.scheme) ? data.scheme : "";
  data.argumentValues = !isEmpty(data.argumentValues)
    ? data.argumentValues
    : {}; // Name checks

  // ID checks
  if (Validator.isEmpty(data.user)) {
    errors.user = "User field is required";
  }

  // Scheme checks
  if (Validator.isEmpty(data.scheme)) {
    errors.scheme = "Scheme field is required";
  } else if (
    data.scheme !== "ActionArgument" &&
    data.scheme !== "ExpertOpinionArgument"
  ) {
    errors.scheme = `"${data.scheme}" is not a valid scheme`;
  }

  // Argument Values checks
  // if (Validator.isEmpty(data.argumentValues)) {
  //   errors.argumentValues = "Argument values are required";
  // } //else if (data.scheme === "ArgumentScheme") {
  //}

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
