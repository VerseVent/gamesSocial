function gameRepository(Game, User, Room) {
  async function createRoom(roomData, createdBy) {
    const { roomTitle, maxPlayers, isRoomLocked, roomPassword, gameTitle } =
      roomData;
    const currentGame = await Game.findOne({ title: gameTitle });
    if (!currentGame) {
      throw new Error("there is no such a game in database");
    }
    const user = await User.findOne({ email: createdBy });
    await currentGame.rooms.push({
      roomTitle,
      maxPlayers,
      isRoomLocked,
      roomPassword,
      createdBy: user._id,
      currentPlayers: [user._id],
    });
    await Game.findOne({ title: gameTitle }).updateOne({
      $push: {
        rooms: {
          roomTitle,
          maxPlayers,
          isLocked,
          password,
          createdBy: user._id,
          currentPlayers: [user._id],
        },
      },
    });
    const roomObj = await Game.findOne(
      { title: gameTitle },
      { rooms: { $slice: -1 } }
    );

    console.log(await roomObj.populate("rooms.0.createdBy"));

    return roomObj;
    // return "wait a bit";
  }
  async function getGamesInfo() {
    const games = await Game.find({});
    return games;
  }
  async function getGameById(gameId) {
    const game = await Game.findOne({ _id: gameId });
    return game;
  }
  return {
    createRoom,
    getGamesInfo,
    getGameById,
  };
}
module.exports = gameRepository;
