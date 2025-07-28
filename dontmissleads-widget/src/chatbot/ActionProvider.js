class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  // This function is called by the MessageParser
  handleUserMessage = async (message) => {
    // FIXED: Correct n8n webhook URL with proper ID
    const webhookUrl = 'https://oxendineleads.app.n8n.cloud/webhook/38bab8c2-35b9-4f73-9d87-93f5eacd42e5';
    
    // FIXED: Include context in request body
    const requestBody = {
      message: message,
      context: 'HVAC service website chat - help with heating, cooling, repairs, estimates, and scheduling'
    };

    try {
      // FIXED: Added Authorization header
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-test-missedhvac-20250726'
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // FIXED: Handle different possible response formats from n8n
      const aiResponse = data.response || data.reply || data.message || 'Sorry, I received an empty response.';
      
      // Get the AI's response from the n8n workflow
      const botResponse = this.createChatBotMessage(aiResponse);
      
      // Add the AI's response to the chat
      this.addMessageToState(botResponse);
      
    } catch (error) {
      console.error("Error connecting to the backend:", error);
      const errorResponse = this.createChatBotMessage("I'm sorry, I'm having trouble connecting right now. Please try again in a moment.");
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
