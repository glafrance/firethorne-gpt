'use server'

import { revalidatePath } from "next/cache";
import {loadChatConversation, loadChatHistory } from "./store/data-service"
// import {submitPromptData } from "./store/data-service"
// import PromptData from "./model/PromptData";

// export async function sendPromptData(prompt: PromptData) {
//   await submitPromptData(prompt);  
//   loadChatHistory();
//   revalidatePath('/');
// }

export async function loadConversation(conversationId: string) {
  await loadChatConversation(conversationId);  
}