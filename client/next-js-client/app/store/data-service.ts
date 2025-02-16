import { BehaviorSubject } from "rxjs";

import History from "../model/history";
import FirstGoal from "../model/first-goal";
import Conversation from "../model/conversation";
import ChatPrompt from "../model/chat-prompt";
import { buildPrompt } from "../utils/prompt";

// Properties for data and for observables //

const _helpPopupBS = new BehaviorSubject<string>('');

let _prompt: ChatPrompt | null = null; 
const _promptBS = new BehaviorSubject<ChatPrompt | null>(null);

const _chatHistoryBS = new BehaviorSubject<History | null>(null);

const _conversationFirstGoalsBS = new BehaviorSubject<FirstGoal[]>([]);

export function getHelpPopupBS() {
  return _helpPopupBS;
}

export function getPromptBS() {
  return _promptBS;
}

export function getChatHistoryBS() {
  return _chatHistoryBS;
}

export function getConversationFirstGoalsBS() {
  return _conversationFirstGoalsBS;
}

// Functions to set data monitored by observables //

export function setHelpPopup(value: string) {
  _helpPopupBS.next(value);
}

export async function setPrompt(field: string, data: string) {
  const newPrompt: ChatPrompt = {
    ..._prompt,
    [field]: data
  };
  _prompt = newPrompt;
  _promptBS.next(newPrompt);

  if (field === 'goal') {
    await submitPrompt();
  }
}

export async function loadChatHistory() {
  const chatHistory = await getChatHistory();

  _chatHistoryBS.next(chatHistory);
}

export async function loadConversationFirstGoals() {
  const firstGoals = await getFirstGoals();

  _conversationFirstGoalsBS.next(firstGoals);
}

// Functions to make API calls //

export async function getChatHistory(): Promise<History> {
  const response = await fetch('http://localhost:3100/chat/conversations');

  if (!response.ok) {
    console.log("Failed to get chat history.");
    throw new Error("Failed to get chat history.");
  }
  
  const resData = await response.json() as History;
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

export async function loadChatConversation(id: string): Promise<Conversation> {
  const response = await fetch(`http://localhost:3100/chat/conversations/${id}`);

  if (!response.ok) {
    console.log("Failed to get conversation with id " + id);
    throw new Error("Failed to get conversation with id" + id);
  }

  const resData = await response.json();

  return resData;
}

export async function submitPrompt() {
  if (_prompt && _prompt.goal) {
    const prompt: string = buildPrompt(_prompt);

    if (prompt !== '') {
      const input = {
        prompt,
        promptData: _prompt
      };
      const response = await fetch('http://localhost:3100/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      });
  
      if (!response.ok) {
        console.log("Failed to submit prompt.");
        throw new Error("Failed to submit prompt.");
      }
      
      const resData = await response.json();
      return resData;  
    }
  }
}
