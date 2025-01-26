'use client'

import { getChatHistory } from "@/app/utils/http";
import { useEffect, useRef, useState } from "react";
import ChatHistoryItem from "./chat-history-item";
import classes from './chat-history-list.module.css';

interface ChatItem {
  id: string,
  prompt: string;
  response: string;
}

const ChatHistoryList = () => {
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
  const hiddenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchChatHistory() {
      const history = await getChatHistory();
      setChatHistory(history);
    };

    fetchChatHistory();

  }, []);

  useEffect(() => {
    if (hiddenRef.current) {
      hiddenRef.current.scrollIntoView({
        behavior: 'smooth', // Optional for smooth scrolling
        block: 'end'
      });
    }  
  }, [chatHistory, hiddenRef]);

  const history = chatHistory && chatHistory.map(
    item => <ChatHistoryItem 
      key={item.id} 
      prompt={item.prompt} 
      response={item.response} 
    />
  );

  return (
    <>
      <div
        className={classes.List}>
        {history}
        <div ref={hiddenRef}></div>
      </div>
    </>
  )
}

export default ChatHistoryList;