function wsService(userRepository) {
  async function findAndProcessMessages() {
    const allUsersWithMessages = await userRepository.findAllMessages();
    const allMessages = [...allUsersWithMessages]
      .filter((user) => user.previousMessages)
      .map((user) => user.previousMessages);
    const processedMessages = [];
    for (let i = 0; i < allMessages.length; i++) {
      processedMessages.push(...allMessages[i]);
    }
    return JSON.stringify(
      processedMessages.sort((a, b) => b.sendDate > a.sendDate)
    );
  }
  return {
    findAndProcessMessages,
  };
}
module.exports = wsService;
