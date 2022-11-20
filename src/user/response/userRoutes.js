const router = require("express").Router();
const upload = require("../../configs/multer");
const authenticate = require("../../game/request/authenticate");

module.exports = function (userController) {
  const {
    getAllUsers,
    createUser,
    verifyEmail,
    loginUser,
    authUser,
    getUserById,
  } = userController;

  router.get("/auth", authenticate, authUser);
  router.get("/getUserById/:id", authenticate, getUserById);
  router.post("/signup", upload.single("avatar"), createUser);
  router.post("/login", loginUser);
  router.get("/verify/:accessToken", verifyEmail);
  router.get("/", getAllUsers);
  return router;
};
