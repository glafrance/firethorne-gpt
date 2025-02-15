import { FC } from "react";
import Image from "next/image";

import superImg from '../../assets/images/super.png';
import classes from './chat-history-item.module.css';

interface Props {
  key: string,
  prompt: string;
  response: string;
}

const ChatConversationItem: FC<Props> = ({prompt, response}) => {
  return (
    <div className={classes.Item}>
      <div className={classes.Response}>
        <Image 
          src={superImg} 
          width={19} 
          height={15} 
          alt='super icon'
        />
        <span className={classes.ResponseText}>{response}</span>
      </div>
      <p className={classes.Prompt}>{prompt}</p>
    </div>
  );
}

export default ChatConversationItem;