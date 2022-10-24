const mongoose = require("mongoose");

const { Schema } = mongoose;

const GameSchema = new Schema({
  title: String,
  imgUrl: String,
  players: Number,
  rooms: [
    {
      roomTitle: String,
      maxPlayers: Number,
      isLocked: Boolean,
      password: String,
      createdBy: { type: Schema.Types.ObjectId, ref: "User" },
      currentPlayers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
  ],
});

const Game = mongoose.model("Game", GameSchema);
// async function createStartGames() {
//   await Game.create({
//     title: "dota2",
//     imgUrl:
//       "https://res.cloudinary.com/dih4qr4at/image/upload/v1659278291/games_images/dota2_img_eqlzis.jpg",
//     players: 0,
//     rooms: [],
//   });
//   await Game.create({
//     title: "apex",
//     imgUrl:
//       "https://res.cloudinary.com/dih4qr4at/image/upload/v1659278278/games_images/apex_img_qblldf.jpg",
//     players: 0,
//     rooms: [],
//   });
//   await Game.create({
//     title: "rust",
//     imgUrl:
//       "https://res.cloudinary.com/dih4qr4at/image/upload/v1659278299/games_images/rust_img_dowk5k.png",
//     players: 0,
//     rooms: [],
//   });
//   await Game.create({
//     title: "dyinglight2",
//     imgUrl:
//       "https://res.cloudinary.com/dih4qr4at/image/upload/v1659278308/games_images/dyinglight2_img_lofspa.jpg",
//     players: 0,
//     rooms: [],
//   });
// }
// createStartGames();
module.exports = {
  Game,
};

// async function createGameWithUsers() {
//   const newUser1 = TestUsers.create({ username: "usernameTest" });
//   console.log(newUser1);
//   const newUser2 = new TestUsers({ username: "usernameTest" });
//   newUser1.save();
//   newUser2.save();
// }
// createGameWithUsers();
// const newGame = new Game({
//   title: "testTitle",
//   players: 23015,
//   rooms: [
//     {
//       createdBy: newUser._id,
//       maxPlayers: 5,
//       currentPlayers: [newUser._id, newUser2._id],
//       isLocked: false,
//       password: null,
//     },
//   ],
// });
// User.updateOne();
