function gameService(gameRepository) {
  async function createRoom(roomData, createdBy) {
    return await gameRepository.createRoom(roomData, createdBy);
  }
  async function getGamesInfo() {
    const games = await gameRepository.getGamesInfo();
    // return games.map((game) => {
    // game._doc.roomsLength = game.rooms.length;
    // const { rooms, ...newGameObj } = game._doc;
    // return newGameObj;
    return games;
    // });
  }
  async function getGameById(gameId) {
    const game = await gameRepository.getGameById(gameId);
    return game;
  }
  async function deleteRoomCreatorAndRoom(data) {
    try {
      const user = await gameRepository.deleteRoomCreatorAndRoom(data);

      return user;
    } catch (e) {
      throw e;
    }
  }
  async function deleteRoomUser(userId) {}
  return {
    createRoom,
    getGamesInfo,
    getGameById,
    deleteRoomUser,
    deleteRoomCreatorAndRoom,
  };
}
module.exports = gameService;
