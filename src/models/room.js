const mongoose = require("mongoose");

const { Schema } = mongoose;

const RoomSchema = new Schema({
  roomTitle: String,
  maxPlayers: Number,
  isRoomLocked: Boolean,
  roomPassword: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  currentPlayers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Room = mongoose.model("Room", RoomSchema);

module.exports = {
  Room,
};
