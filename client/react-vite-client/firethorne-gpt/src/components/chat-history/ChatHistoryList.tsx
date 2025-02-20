import { useGetFirstPromptsQuery } from '../../store/conversationApi';
import classes from "./chat-history-list.module.css"

export default function ChatHistoryList() {
  const { data, error, isLoading } = useGetFirstPromptsQuery();

  if (isLoading) return <p>Loading prompts...</p>;
  if (error) return <p>Error fetching prompts.</p>;

  const content = data?.firstPrompts && (
    <ul>
      {data.firstPrompts.map(item => (
        <li key={item.id} title={item.prompt}>{item.prompt}</li>
      ))}
    </ul>
  );


  return (
    <div className={classes.Content}>
      <h3>Conversation History</h3>
      <div className={classes.List}>
        {content}
      </div>
    </div>
  );
}