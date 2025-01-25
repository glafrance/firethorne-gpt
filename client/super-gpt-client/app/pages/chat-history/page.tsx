import PromptInput from "@/app/components/chat-input/prompt-input";
import ChatHistoryList from "@/app/components/chat-history/chat-history-list";
import classes from './page.module.css';

export default function ChatHistory() {

  return (
    <div className={classes.page}>
      <ChatHistoryList />
      <PromptInput />
    </div>
  );
}