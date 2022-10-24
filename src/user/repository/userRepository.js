function userRepository(User) {
  async function getAllUsers() {}
  async function createUser({ username, email, password, avatarUrl, approve }) {
    const user = new User({ username, email, password, avatarUrl, approve });
    user.save();
  }
  async function checkForUser({ email }) {
    return User.findOne({ email });
  }
  async function updateEmail({ email }) {
    return User.updateOne(
      { email },
      { $set: { approve: { isEmailApproved: true } } }
    );
  }
  return {
    getAllUsers,
    createUser,
    checkForUser,
    updateEmail,
  };
}

module.exports = userRepository;
