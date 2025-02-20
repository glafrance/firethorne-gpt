'use client'

import { useEffect, useRef } from "react";
import ConversationItem from "./ConversationItem";
import { Conversation } from "../../store/conversation-api";
import classes from './conversation-item.module.css';

interface ConversationListProps {
  conversation: Conversation | null;
}

export default function ConversationList({conversation}: ConversationListProps) {
  const hiddenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (hiddenRef.current) {
      hiddenRef.current.scrollIntoView({
        behavior: 'smooth', // Optional for smooth scrolling
        block: 'end'
      });
    }  
  }, [conversation, hiddenRef]);

  const content = conversation && conversation.items && conversation.items.map(
    (item, index) => <ConversationItem 
      key={`${index}`} 
      prompt={item.prompt} 
      response={item.response} 
    />
  );

  return (
    <>
      <div
        className={classes.List}>
        {content}
        <div ref={hiddenRef}></div>
      </div>
    </>
  )
}
