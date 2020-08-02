const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUserUpdateInput(data) {
  let errors = {}; // Convert empty fields to an empty string so we can use validator functions

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.newEmail = !isEmpty(data.newEmail) ? data.newEmail : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
  data.newPassword2 = !isEmpty(data.newPassword2) ? data.newPassword2 : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!Validator.isEmail(data.newEmail)) {
    errors.newEmail = "New email is invalid";
  }

  // Password checks
  if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
    errors.newPassword = "New Password must be at least 6 characters";
  }
  if (!Validator.equals(data.newPassword, data.newPassword2)) {
    errors.newPassword2 = "New Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
