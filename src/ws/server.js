const WebSocket = require("ws");
const { uuid } = require("uuidv4");

module.exports = (server, userRepository) => {
  const wsService = require("./wsService")(userRepository);
  const wss = new WebSocket.Server({
    server: server,
  });
  const clients = new Map();

  wss.on("connection", async function connection(ws) {
    ws.on("error", () => {
      ws.close(300, "Something went wrong");
    });
    ws.on("close", () => {
      clients.delete(ws);
      console.log("Close");
      ws.close(1001, "Normal Close");
    });

    const id = uuid();
    const metadata = { id };
    const startMessages = await wsService.findAndProcessMessages();

    clients.set(ws, metadata);
    ws.send(startMessages);

    ws.on("message", async function message(data) {
      const receivedMessage = JSON.parse(data);
      const message = {
        text: receivedMessage.msg,
        sender: receivedMessage.user,
        sendDate: receivedMessage.sendDate,
      };
      await userRepository.updateMessages({
        email: receivedMessage.user,
        message,
      });
      const messages = await wsService.findAndProcessMessages();
      [...clients.keys()].forEach((client) => {
        client.send(messages);
      });
    });
  });
};
