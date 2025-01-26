'use server'

import { revalidatePath } from "next/cache";
import {loadChatHistory, submitPromptData } from "./store/data-service"

export async function sendPromptData(prompt: string) {
  await submitPromptData(prompt);  
  loadChatHistory();
  revalidatePath('/');
}