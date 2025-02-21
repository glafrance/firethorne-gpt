import classes from './App.module.css';
import HistoryList from "./components/history/HistoryList";
import Conversation from "./components/conversation/Conversation";

function App() {
  return (
    <div className={classes.App}>
      <HistoryList />
      <Conversation />
    </div>
  );
}

export default App
