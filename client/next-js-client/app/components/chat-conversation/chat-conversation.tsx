import Conversation from "@/app/model/conversation";
import PromptEngineering from "../prompt-engineering/prompt-engineering";
import PromptInput from "../prompt-input/prompt-input";
import ChatConversationList from "./chat-conversation-list";
import classes from './chat-conversation.module.css';

export default function ChatConversation() {
  const conversation: Conversation | null = null;

  return (
    <div className={classes.Conversation}>
      <div className={classes.Instruction}>
        <p>Firethorne GPT makes it easier to leverage GPT technologies to your advantage.</p>
        <p>Providing a role, a perspective, a goal, and extra information helps GPT provide the most relevant and useful response.</p>
        <p>Only a goal is required, and for simple queries that may be enough, but often the role, perspective, and additional information are essential.</p>
      </div>
      <PromptEngineering />
      <PromptInput />
      <ChatConversationList chatConversation={conversation} />
    </div>
  )
}