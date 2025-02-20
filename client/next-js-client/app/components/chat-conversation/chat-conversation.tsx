import Conversation from "@/app/model/conversation";
import PromptEngineering from "../prompt-engineering/prompt-engineering";
import ChatConversationList from "./chat-conversation-list";
import classes from './chat-conversation.module.css';
import GoalInput from "../goal-input/goal-input";
import { getActiveConversationBS } from "@/app/store/data-service";
import { revalidatePath } from "next/cache";

export default function ChatConversation() {
  let activeConversation: Conversation | null = null;

  getActiveConversationBS().subscribe({
    next: conversation => {
      console.log('chat-conversation.tsx', conversation);
      activeConversation = conversation;
    },
    error: err => {
      console.log("Failed to get updated active conversation: ", err);
    }
  });

  let conversation;
  
  if (activeConversation) {
    conversation = <ChatConversationList chatConversation={activeConversation} />;
    revalidatePath('/');
  }

  return (
    <div className={classes.Conversation}>
      <div className={classes.Instruction}>
        <p>Firethorne GPT makes it easier to leverage GPT technologies to your advantage.</p>
        <p>Providing a role, a perspective, a goal, and extra information helps GPT provide the most relevant and useful response.</p>
        <p>Only a goal is required, and for simple queries that may be enough, but often the role, perspective, and additional information are essential.</p>
      </div>
      <PromptEngineering />
      {conversation}
      <GoalInput />
    </div>
  )
}