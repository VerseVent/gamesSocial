const express = require("express");
const cors = require("cors");
const error = require("./error");
const bodyParser = require("body-parser");

module.exports = function app() {
  const { User } = require("./models/user");
  const userRepository = require("./user/repository/userRepository")(User);
  const userService = require("./user/response/userService")(userRepository);
  const userController = require("./user/response/userController")(
    userService,
    userRepository
  );
  const userRoutes = require("./user/response/userRoutes")(
    userController,
    userRepository
  );

  const { Game } = require("./models/game");
  const gameRepository = require("./game/db/gameRepository")(Game, User);
  const gameService = require("./game/response/gameService")(gameRepository);
  const gameController = require("./game/response/gameController")(
    gameService,
    gameRepository
  );
  const gameRoutes = require("./game/response/gameRoutes")(gameController);

  const app = express();
  const server = require("http").createServer(app);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(cors());
  app.use(express.json());
  app.use("/user", userRoutes);
  app.use("/game", gameRoutes);

  app.use(error.clientError);
  app.use(error.serverError);

  return server;
};
