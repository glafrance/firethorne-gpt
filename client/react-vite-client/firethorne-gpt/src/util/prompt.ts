import { Prompt } from "../store/slices/prompt-data-slice";

export const buildPrompt = (prompt: Prompt | null): string => {
  let promptText: string = '';

  if (prompt) {
    if (prompt.goal) {
      if (prompt.role) {
        promptText += `You are this: ${prompt.role}.`;
      }
    
      if (prompt.perspective) {
        promptText += ` Your perspective should be this: ${prompt.perspective}.`;
      }
    
      if (prompt.additionalInformation) {
        promptText += ` Consider this additional information in your response: ${prompt.additionalInformation}.`;
      }
  
      promptText += ` Here is the primary goal of the response you will provide: ${prompt.goal}`;
    }
  }


  return promptText;
};