function gameController(gameService) {
  async function createRoom(req, res, next) {
    try {
      const roomData = req.body;
      const createdBy = req.user.email;
      console.log("Controller body data", roomData);
      const roomObj = await gameService.createRoom(roomData, createdBy);
      console.log("Controller roomData: ", roomObj);
      const currentRoom = roomObj._doc.rooms[0];
      res.json(currentRoom);
    } catch (e) {
      next(e);
    }
  }
  async function getGamesInfo(req, res, next) {
    try {
      const gamesInfo = await gameService.getGamesInfo();
      res.json(gamesInfo);
    } catch (e) {
      next(e);
    }
  }
  async function getGameById(req, res, next) {
    const gameId = req.params.gameId;
    const game = await gameService.getGameById(gameId);
    console.log(game);
    res.json(game);
  }
  return {
    createRoom,
    getGamesInfo,
    getGameById,
  };
}
module.exports = gameController;
