const Sequelize = require("sequelize");
const User = require("./User");
const { DB } = require("../connection");
const Game = require("./Game");

const Room = DB.define("rooms", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  roomTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  maxPlayers: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  isRoomLocked: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  roomPassword: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gameId: {
    type: Sequelize.INTEGER,
    references: {
      model: Game,
      key: "id",
    },
  },
});
Room.belongsTo(Game);
Game.hasMany(Room);
module.exports = Room;
