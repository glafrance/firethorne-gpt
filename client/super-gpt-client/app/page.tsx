import PromptInput from "@/app/components/prompt-input/prompt-input";
import ChatHistoryList from "@/app/components/chat-history/chat-history-list";
import classes from './page.module.css';
import { getChatCount } from "./utils/http";
import PromptEngineering from "./components/prompt-engineering/prompt-engineering";
import { getChatDataBS } from "./store/data-service";

export default async function Home() {
  let chatData;

  getChatDataBS().subscribe({
    next: result => {
      chatData = result;
    },
    error: err => {
      console.log('Error getting chat data', err);
    }
  });  

  const chatCount = await getChatCount();

  const chatHistory = (chatCount.count > 0) && <ChatHistoryList chatData={chatData} />;
  const promptEngineering = (chatCount.count === 0) && <PromptEngineering />;
  const pageClass = (chatCount.count === 0) ? classes.start : classes.history;  

  return (
    <div className={`${classes.page} ${pageClass}`}>
      {chatHistory}
      {promptEngineering}
      <PromptInput />
    </div>
  );
}