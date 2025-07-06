import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [createChatBotMessage(`Hello! How can I help you today?`)],
  botName: "AI Assistant",
  customStyles: {
    botMessageBox: {
      backgroundColor: '#0d9488', // A nice teal color
    },
    chatButton: {
      backgroundColor: '#0d9488',
    },
  },
};

export default config;