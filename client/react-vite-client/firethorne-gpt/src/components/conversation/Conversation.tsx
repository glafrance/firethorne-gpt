import { Conversation as Model } from "../../store/conversation-api";
import PromptEngineering from "../prompt-engineering/PromptEngineering";
import ConversationList from "./ConversationList";
import classes from './conversation.module.css';
import GoalInput from "../goal-input/goalInput";
import { useState } from "react";

export default function Conversation() {
  const [activeConversation, setActiveConversation] = useState<Model | null>(null);

  // getActiveConversationBS().subscribe({
  //   next: conversation => {
  //     console.log('chat-conversation.tsx', conversation);
  //     activeConversation = conversation;
  //   },
  //   error: err => {
  //     console.log("Failed to get updated active conversation: ", err);
  //   }
  // });

  const content = activeConversation && <ConversationList conversation={activeConversation} />;

  return (
    <div className={classes.Conversation}>
      <div className={classes.Instruction}>
        <p>Firethorne GPT makes it easier to leverage GPT technologies to your advantage.</p>
        <p>Providing a role, a perspective, a goal, and extra information helps GPT provide the most relevant and useful response.</p>
        <p>Only a goal is required, and for simple queries that may be enough, but often the role, perspective, and additional information are essential.</p>
      </div>
      <PromptEngineering />
      {content}
      <GoalInput />
    </div>
  )
}