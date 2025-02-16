import ChatPrompt from "../model/chat-prompt";

export const buildPrompt = (prompt: ChatPrompt): string => {
  let promptText = '';

  if (prompt.goal) {
    if (prompt.role) {
      promptText += `You are a ${prompt.role}.`;
    }
  
    if (prompt.perspective) {
      promptText += ` You should respond from the perspective of ${prompt.perspective}.`;
    }
  
    if (prompt.additionalInformation) {
      promptText += ` Consider this additional information in your response: ${prompt.additionalInformation}.`;
    }

    promptText += `Here is the primary goal of the response you will provide: ${prompt.goal}`;
  }

  return promptText;
};