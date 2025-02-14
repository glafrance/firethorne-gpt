import PromptData from "../model/PromptData";

export async function submitPrompt(promptData: PromptData) {
  if (promptData) {
    const response = await fetch('http://localhost:3100/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(promptData)
    });

    if (!response.ok) {
      console.log("Failed to submit prompt.");
      throw new Error("Failed to submit prompt.");
    }
    
    const resData = await response.json();
    return resData;
  }
}

export async function getChatHistory() {
  const response = await fetch('http://localhost:3100/chat');

  if (!response.ok) {
    console.log("Failed to get chat history.");
    throw new Error("Failed to get chat history.");
  }
  
  const resData = await response.json();
  return resData;
}

export async function getChatCount() {
  const response = await fetch('http://localhost:3100/chat-count');

  if (!response.ok) {
    console.log("Failed to get chat count.");
    throw new Error("Failed to get chat count.");
  }
  
  const resData = await response.json();
  return resData;
}
