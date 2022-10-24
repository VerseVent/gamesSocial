require("dotenv").config();
const validateUser = require("../request/validateUser");
const jwt = require("jsonwebtoken");

const cloudinary = require("../../configs/cloudinary.config");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function userService(userRepository) {
  async function createUser({
    username,
    email,
    password,
    avatarUrl,
    favoriteGamesList,
  }) {
    const validationResult = validateUser({ username, password });
    const errors = [
      ...validationResult.resultPassword,
      ...validationResult.resultUsername,
    ];
    if (errors.length !== 0) throwError(errors[0].message, 401);

    const isUserExists = await userRepository.checkForUser({ email });
    if (isUserExists) throwError("User already exists", 401);

    const { url: cloudinaryAvatarUrl } = await cloudinary.uploader.upload(
      avatarUrl
    );

    const user = {
      username,
      email,
      password,
      avatarUrl: cloudinaryAvatarUrl,
      approve: { isEmailApproved: false },
      dodgeList: [],
      friendsList: [],
      favoriteGamesList,
    };
    await userRepository.createUser(user);

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    const url = `${process.env.APP_HOST}/user/verify/${accessToken}`;
    console.log(user.avatarUrl);
    console.log(accessToken);
    const msg = {
      to: email,
      from: "mike.82pronka.27a@gmail.com",
      subject: `Verification mail for ${username}`,
      text: "and easy to do anywhere, even with Node.js",
      html: `<div>
          <img src='${user.avatarUrl}'/>
          <strong>Confirm your account by following this <a href = ${url}>link</a></strong>
      </div>
      `,
    };
    sgMail.send(msg);
  }
  async function verifyEmail({ accessToken }) {
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, user) => {
        if (err) throwError("Your access token is incorrect", 401);
        await userRepository.updateEmail({ email: user.email });
      }
    );
  }
  async function checkUser({ userData }) {
    const { email, password } = userData;
    const user = await userRepository.checkForUser({ email });

    if (!user) throwError("There is no user with such email", 401);
    if (user.password !== password) throwError("Wrong password", 401);
    if (!user.approve.isEmailApproved)
      throwError("Please verify your email", 401);
    const jwtToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
    const resData = {
      user: user,
      token: jwtToken,
    };
    return resData;
  }
  return {
    createUser,
    verifyEmail,
    checkUser,
  };
}
module.exports = userService;

const throwError = (message, status) => {
  const err = new Error(message);
  err.status = status;
  throw err;
};
