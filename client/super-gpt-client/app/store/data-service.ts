import { BehaviorSubject } from "rxjs";

import { getChatHistory, submitPrompt } from "../utils/http";
import PromptData from "../model/PromptData";
import ChatData from "../model/ChatData";

const _promptDataBS = new BehaviorSubject<PromptData | null>(null);
const _chatDataBS = new BehaviorSubject<ChatData | null>(null);

let _promptData: PromptData = { role: '', perspective: '', prompt: '' };
console.log('initialized', _promptData);
let _chatData: ChatData = { chatHistory: [] }; 

export function getPromptDataBS() {
  return _promptDataBS;
}

export function setPromptData(promptData: PromptData) {
  console.log('setPromptData', promptData);
  console.log('before', _promptData);
  _promptData = {
    ..._promptData,
    ...promptData
  };

  console.log('after', _promptData);
  _promptDataBS.next(_promptData);
}

export function getChatDataBS() {
  return _chatDataBS;
}

export async function loadChatHistory() {
  const chatHistory = await getChatHistory();

  _chatData = { chatHistory };
  _chatDataBS.next(_chatData);
}

export async function submitPromptData(prompt: PromptData) {
  console.log('making backend call - before', _promptData);
  setPromptData(prompt);

  console.log('making backend call - after', _promptData);
  return await submitPrompt(_promptData);
}
