import ChatHistoryList from "@/app/components/chat-history/chat-history-list";
import classes from './page.module.css';

export default async function Home() {
  return (
    <div className={classes.page}>
      <ChatHistoryList />
    </div>
  );
}