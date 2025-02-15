import ChatHistoryList from "@/app/components/chat-history/chat-history-list";
import ChatConversation from "./components/chat-conversation/chat-conversation";
import classes from './page.module.css';

export default async function Home() {
  return (
    <div className={classes.page}>
      <ChatHistoryList />
      <ChatConversation />
    </div>
  );
}