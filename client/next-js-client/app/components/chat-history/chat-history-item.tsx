'use client';

import FirstGoal from "@/app/model/first-goal";
import classes from './chat-history-item.module.css';
import { useCallback } from "react";
import { loadChatConversation } from "@/app/store/data-service";

interface ChatHistoryItemProps {
  firstGoal: FirstGoal;
}

export default function ChatHistoryItem({firstGoal: {goal, id}}: ChatHistoryItemProps) {
  const clickHandler = useCallback(function clickHandler() {
    loadChatConversation(id);
  }, [id]);

  return (
    <div 
      className={classes.Prompt} 
      title={goal}
      onClick={clickHandler}
    >{goal}</div>
  );
}