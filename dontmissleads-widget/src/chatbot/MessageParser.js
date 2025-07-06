class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    // This is where we will eventually send the message to n8n
    // For now, it just calls the action provider
    this.actionProvider.handleUserMessage(message);
  }
}

export default MessageParser;