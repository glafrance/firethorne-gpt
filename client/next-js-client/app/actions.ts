'use server'

import { revalidatePath } from "next/cache";
import {loadChatHistory, submitPromptData } from "./store/data-service"
import PromptData from "./model/PromptData";

export async function sendPromptData(prompt: PromptData) {
  await submitPromptData(prompt);  
  loadChatHistory();
  revalidatePath('/');
}