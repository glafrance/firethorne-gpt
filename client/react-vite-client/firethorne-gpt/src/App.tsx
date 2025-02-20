import classes from './App.module.css';
import ChatHistoryList from "./components/chat-history/ChatHistoryList";

function App() {
  return (
    <div className={classes.App}>
      <ChatHistoryList />
      {/* <ChatConversation /> */}
    </div>
  );
}

export default App
