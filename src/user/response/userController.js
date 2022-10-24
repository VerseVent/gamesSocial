require("dotenv").config();

function userController(userService, userRepository) {
  //GET NEW USER
  async function getAllUsers(req, res) {
    const { getAllUsers } = userRepository; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const users = await getAllUsers();
    res.json(users);
  }
  //CREATE NEW USER
  async function createUser(req, res, next) {
    try {
      const userData = req.body;
      if (!req.file) throw new Error("No file uploaded!");
      userData.avatarUrl = req.file.path;
      await userService.createUser(userData);
      res.json("user created");
    } catch (e) {
      next(e);
    }
  }
  //VERIFY USER EMAIL
  async function verifyEmail(req, res, next) {
    const { accessToken } = req.params;
    try {
      await userService.verifyEmail({ accessToken });
      res.redirect(301, "http://localhost:8080/login");
    } catch (e) {
      next(e);
    }
  }
  async function loginUser(req, res, next) {
    const userData = req.body;
    try {
      const resData = await userService.checkUser({ userData });

      res.json(resData);
    } catch (e) {
      next(e);
    }
  }
  async function authUser(req, res, next) {
    try {
      res.json(req.user);
    } catch (e) {
      next(e);
    }
  }
  return {
    getAllUsers,
    createUser,
    verifyEmail,
    loginUser,
    authUser,
  };
}
module.exports = userController;
