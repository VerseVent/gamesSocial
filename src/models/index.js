const User = require("./User");
const Game = require("./Game");
const Room = require("./Room");
const RoomAdmin = require("./RoomAdmin");

module.exports = {
  User,
  Game,
  Room,
  RoomAdmin,
};

// async function createStartGames() {
//   await Game.create({
//     title: "dota2",
//     imgUrl:
//       "https://res.cloudinary.com/dih4qr4at/image/upload/v1659278291/games_images/dota2_img_eqlzis.jpg",
//     players: 0,
//   });
//   await Game.create({
//     title: "apex",
//     imgUrl:
//       "https://res.cloudinary.com/dih4qr4at/image/upload/v1659278278/games_images/apex_img_qblldf.jpg",
//     players: 0,
//   });
//   await Game.create({
//     title: "rust",
//     imgUrl:
//       "https://res.cloudinary.com/dih4qr4at/image/upload/v1659278299/games_images/rust_img_dowk5k.png",
//     players: 0,
//   });
//   await Game.create({
//     title: "dyinglight2",
//     imgUrl:
//       "https://res.cloudinary.com/dih4qr4at/image/upload/v1659278308/games_images/dyinglight2_img_lofspa.jpg",
//     players: 0,
//   });
// }
// createStartGames();
