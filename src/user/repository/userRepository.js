function userRepository(User) {
  async function getAllUsers() {}
  async function createUser({
    username,
    email,
    password,
    avatarUrl,
    isEmailApproved,
  }) {
    try {
      await User.create({
        username: username,
        email,
        password,
        avatarUrl,
        isEmailApproved,
      });
    } catch (e) {
      throw e;
    }
  }
  async function checkForUser({ email }) {
    const user = await User.findOne({ where: { email: email } });

    return user;
  }
  async function updateEmail({ email }) {
    return User.update({ isEmailApproved: true }, { where: { email } });
  }
  async function getUserById(userId) {
    const userWithRoom = await User.findOne({
      where: { id: userId },
      include: { all: true, nested: true },
    });
    return userWithRoom;
  }
  return {
    getAllUsers,
    getUserById,
    createUser,
    checkForUser,
    updateEmail,
  };
}

module.exports = userRepository;
