const mongoose = require("mongoose");

const ApproveSchema = mongoose.Schema({
  isEmailApproved: Boolean,
});

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  avatarUrl: String,
  approve: ApproveSchema,
  dodgeList: [],
  friendsList: [],
  favoriteGamesList: [String],
});

const User = mongoose.model("User", UserSchema);
// User.updateOne();
module.exports = {
  User,
};
