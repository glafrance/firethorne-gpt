import flameImg from '../../assets/images/flame.png';
import classes from './conversation-item.module.css';

interface ConversationItemProps {
  key: string,
  prompt: string;
  response: string;
}

export default function ConversationItem({prompt, response}: ConversationItemProps) {
  return (
    <div className={classes.Item}>
      <div className={classes.Response}>
        <img 
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
