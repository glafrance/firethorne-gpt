import { BehaviorSubject } from "rxjs";

import ChatHistory from "../model/chat-history";
import FirstGoal from "../model/first-goal";
import ChatConversation from "../model/chat-conversation";

let _chatHistory: ChatHistory | null = null; 
const _chatHistoryBS = new BehaviorSubject<ChatHistory | null>(null);

let _conversationFirstGoals: FirstGoal[]; 
const _conversationFirstGoalsBS = new BehaviorSubject<FirstGoal[]>([]);

export function getChatHistoryBS() {
  return _chatHistoryBS;
}

export function getConversationFirstGoalsBS() {
  return _conversationFirstGoalsBS;
}

export async function loadChatHistory() {
  const chatHistory = await getChatHistory();

  _chatHistory = chatHistory;
  _chatHistoryBS.next(chatHistory);
}

export async function loadConversationFirstGoals() {
  const firstGoals = await getFirstGoals();

  _conversationFirstGoals = firstGoals;
  _conversationFirstGoalsBS.next(firstGoals);
}

export async function getChatHistory(): Promise<ChatHistory> {
  const response = await fetch('http://localhost:3100/chat/conversations');

  if (!response.ok) {
    console.log("Failed to get chat history.");
    throw new Error("Failed to get chat history.");
  }
  
  const resData = await response.json() as ChatHistory;
  return resData;
}

export async function getFirstGoals(): Promise<FirstGoal[]> {
  const response = await fetch('http://localhost:3100/chat/first-goals');

  if (!response.ok) {
    console.log("Failed to get conversation first goals.");
    throw new Error("Failed to get conversation first goals.");
  }
  
  const resData = await response.json();
  const firstGoals = resData?.firstGoals || [];
  return firstGoals;
}

export async function loadChatConversation(id: string): Promise<ChatConversation> {
  const response = await fetch(`http://localhost:3100/chat/conversations/${id}`);

  if (!response.ok) {
    console.log("Failed to get conversation with id " + id);
    throw new Error("Failed to get conversation with id" + id);
  }

  const resData = await response.json();

  return resData;
}

// export async function submitPromptData(prompt: PromptData) {
//   setPromptData(prompt);

//   return await submitPrompt(_promptData);
// }

// export async function submitPrompt(promptData: PromptData) {
//   if (promptData) {
//     const response = await fetch('http://localhost:3100/chat', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(promptData)
//     });

//     if (!response.ok) {
//       console.log("Failed to submit prompt.");
//       throw new Error("Failed to submit prompt.");
//     }
    
//     const resData = await response.json();
//     return resData;
//   }
// }

