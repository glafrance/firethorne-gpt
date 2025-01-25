import { FC } from "react";

import classes from './chat-history-item.module.css';

interface Props {
  prompt: string;
  responseText: string;
}

const ChatHistoryItem: FC<Props> = ({prompt, responseText}) => {
  return (
    <div className={classes.Item}>
      <p>{prompt}</p>
      <p>{responseText}</p>
    </div>
  );
}

export default ChatHistoryItem;