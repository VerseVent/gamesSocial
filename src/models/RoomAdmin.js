const Sequelize = require("sequelize");
const User = require("./User");
const { DB } = require("../connection");
const Room = require("./Room");

const RoomAdmin = DB.define("room_admin", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  createdBy: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: "id",
    },
  },
  roomId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Room,
      key: "id",
    },
  },
});

module.exports = RoomAdmin;
