const Sequelize = require("sequelize");
const { DB } = require("../connection");
const Room = require("./Room");

const User = DB.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  avatarUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isEmailApproved: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
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
User.belongsTo(Room);
Room.hasMany(User);

module.exports = User;
