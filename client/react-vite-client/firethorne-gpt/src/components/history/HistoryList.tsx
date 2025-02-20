import { useGetFirstPromptsQuery } from '../../store/conversation-api';
import classes from "./history-list.module.css"
import HistoryItem from "./HistoryItem";

export default function HistoryList() {
  const { data, error, isLoading } = useGetFirstPromptsQuery();

  if (isLoading) return <p>Loading prompts...</p>;
  if (error) return <p>Error fetching prompts.</p>;

  const content = data?.firstPrompts && (
    <ul>
      { data.firstPrompts.map( prompt => <HistoryItem key={prompt.id} prompt={prompt} /> )}
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