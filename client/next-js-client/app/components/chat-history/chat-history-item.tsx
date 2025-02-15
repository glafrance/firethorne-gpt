'use client';

import FirstGoal from "@/app/model/first-goal";
import classes from './chat-history-item.module.css';
import { loadConversation } from "@/app/actions";
import { useCallback } from "react";

interface ChatHistoryItemProps {
  firstGoal: FirstGoal;
}

export default function ChatHistoryItem({firstGoal: {goal, id}}: ChatHistoryItemProps) {
  const clickHandler = useCallback(function clickHandler() {
    loadConversation(id);
  }, [id]);

  return (
    <div 
      className={classes.Prompt} 
      title={goal}
      onClick={clickHandler}
    >{goal}</div>
  );
}