const { connectToDb } = require("./connection");

require("dotenv").config();

module.exports = (async function server() {
  try {
    await connectToDb();

    const server = require("./app")();
    server.listen(process.env.EXPRESS_PORT, () => {
      console.log(
        `Server(express) is running on port ${process.env.EXPRESS_PORT}`
      );
    });
  } catch (e) {
    console.log(e);
  }
})();
