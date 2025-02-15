
import { getConversationFirstGoalsBS, loadConversationFirstGoals } from "@/app/store/data-service";
import classes from "./chat-history-list.module.css"
import ChatHistoryItem from "./chat-history-item";
import FirstGoal from "@/app/model/first-goal";

export default function ChatHistoryList() {
  let firstGoals: FirstGoal[] = [];

  getConversationFirstGoalsBS().subscribe({
    next: result => {
      firstGoals = result;
    },
    error: err => {
      console.log('Error getting chat history first goals', err);
    }
  });  

  loadConversationFirstGoals();  

  let historyItems = firstGoals?.map((item) => {
    return <ChatHistoryItem key={item.id} firstGoal={item} /> 
  });

  return (
    <div className={classes.Content}>
      <h3>Conversation History</h3>
      <div className={classes.List}>
        {historyItems}
      </div>
    </div>
  );
}