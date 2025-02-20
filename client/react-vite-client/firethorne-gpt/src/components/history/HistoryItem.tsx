import { Prompt } from "../../store/conversation-api";
import classes from './history-item.module.css';

interface HistoryItemProps {
  prompt: Prompt;
}

export default function HistoryItem({prompt}: HistoryItemProps) {
  function clickHandler() {
  }

  return (
    <div 
      className={classes.Prompt} 
      title={prompt.prompt}
      onClick={clickHandler}
    >{prompt.prompt}</div>
  );
}