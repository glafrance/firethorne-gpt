import Image from "next/image";

import flameImg from '../../assets/images/flame.png';
import classes from './chat-conversation-item.module.css';

interface ChatConversationItemProps {
  key: string,
  prompt: string;
  response: string;
}

export default function ChatConversationItem({prompt, response}: ChatConversationItemProps) {
  return (
    <div className={classes.Item}>
      <div className={classes.Response}>
        <Image 
          src={flameImg} 
          width={20} 
          height={20} 
          alt='flame icon'
        />
        <span className={classes.ResponseText}>{response}</span>
      </div>
      <p className={classes.Prompt}>{prompt}</p>
    </div>
  );
}
