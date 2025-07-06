class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  // This function is called by the MessageParser
  handleUserMessage = async (message) => {
    // The URL from your n8n Webhook node
    const webhookUrl = 'https://oxendineleads.app.n8n.cloud/webhook-test/8aabe83c-43ba-4c2d-a411-8bc1255a8a5f';

    const requestBody = {
      message: message,
    };

    try {
      // Make the API call to our n8n workflow
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      // Get the AI's response from the n8n workflow
      const botResponse = this.createChatBotMessage(data.reply);

      // Add the AI's response to the chat
      this.addMessageToState(botResponse);

    } catch (error) {
      console.error("Error connecting to the backend:", error);
      const errorResponse = this.createChatBotMessage("Sorry, I'm having trouble connecting right now.");
      this.addMessageToState(errorResponse);
    }
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;