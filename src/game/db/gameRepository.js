function gameRepository(Game, User, Room, RoomAdmin) {
  async function createRoom(roomData, createdBy) {
    const { roomTitle, maxPlayers, isRoomLocked, roomPassword, gameTitle } =
      roomData;
    const currentGame = await Game.findOne({ title: gameTitle });
    if (!currentGame) {
      throw new Error("there is no such game in database");
    }
    const user = await User.findOne({ email: createdBy });
    if (user.roomId) {
      throw new Error("Please exit from actual room");
    }
    const room = await Room.create({
      roomTitle,
      maxPlayers,
      isRoomLocked,
      roomPassword,
      gameId: currentGame.id,
    });
    const resUpdate = await User.update(
      { roomId: room.id },
      {
        where: {
          email: createdBy,
        },
      }
    );

    RoomAdmin.create({ createdBy: user.id, roomId: room.id });

    return room;
  }
  async function getGamesInfo() {
    const games = await Game.findAll({});
    return games;
  }
  async function getGameById(gameId) {
    const game = await Game.findOne({ where: { id: gameId } });
    return game;
  }
  return {
    createRoom,
    getGamesInfo,
    getGameById,
  };
}
module.exports = gameRepository;
