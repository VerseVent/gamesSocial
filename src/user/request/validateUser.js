const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();
const usernameSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8)
  .is()
  .max(20)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .not()
  .spaces()
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]);

usernameSchema.is().min(2).is().max(15).has().not().spaces();

module.exports = function validateUser({ password, username }) {
  const resultPassword = passwordSchema.validate(password, { details: true });
  const resultUsername = usernameSchema.validate(username, { details: true });
  return { resultPassword, resultUsername };
};
