'use client'

import { useEffect, useRef } from "react";
import ChatConversationItem from "./chat-conversation-item";
import classes from './chat-conversation-item.module.css';
import ChatConversation from "@/app/model/conversation";

interface ChatConversationListProps {
  chatConversation: ChatConversation | null;
}

export default function ChatConversationList({chatConversation}: ChatConversationListProps) {
  const hiddenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (hiddenRef.current) {
      hiddenRef.current.scrollIntoView({
        behavior: 'smooth', // Optional for smooth scrolling
        block: 'end'
      });
    }  
  }, [chatConversation, hiddenRef]);

  const conversation = chatConversation && chatConversation.items && chatConversation.items.map(
    (item, index) => <ChatConversationItem 
      key={`${index}`} 
      prompt={item.prompt} 
      response={item.response} 
    />
  );

  return (
    <>
      <div
        className={classes.List}>
        {conversation}
        <div ref={hiddenRef}></div>
      </div>
    </>
  )
}
