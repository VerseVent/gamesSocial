require("dotenv").config();

module.exports = (async function server() {
  const db = await require("./connection")();
  const server = require("./app")(db);
  server.listen(process.env.EXPRESS_PORT, () => {
    console.log(
      `Server(express) is running on port ${process.env.EXPRESS_PORT}`
    );
  });
})();
