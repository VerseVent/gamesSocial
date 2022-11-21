const router = require("express").Router();
const authenticate = require("../request/authenticate");
module.exports = function (gameController) {
  const {
    getGamesInfo,
    getGameById,
    createRoom,
    deleteRoomUser,
    deleteRoomCreatorAndRoom,
  } = gameController;
  router.get("/getGamesInfo", authenticate, getGamesInfo);
  router.get("/getGameById/:gameId", authenticate, getGameById);
  router.post("/createRoom", authenticate, createRoom);
  router.delete(
    "/deleteRoomCreatorAndRoom/:userId/:gameId/:roomId",
    authenticate,
    deleteRoomCreatorAndRoom
  );
  router.patch("/deleteRoomUser/:userId", authenticate, deleteRoomUser);
  return router;
};
