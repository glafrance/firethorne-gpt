'use client'

import { v4 as uuidv4 } from 'uuid';

import { getChatHistory } from "@/app/utils/http";
import { useEffect, useState } from "react";
import ChatHistoryItem from "./chat-history-item";
import classes from './chat-history-list.module.css';

interface ChatItem {
  prompt: string;
  responseText: string;
}

const ChatHistoryList = () => {
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);

  useEffect(() => {
    async function fetchChatHistory() {
      const history = await getChatHistory();
      setChatHistory(history);
    };

    fetchChatHistory();
  }, []);
  
  const history = chatHistory && chatHistory.map(item => <ChatHistoryItem key={uuidv4()} prompt={item.prompt} responseText={item.responseText} />);

  return (
    <div className={classes.List}>
      <h1>Chat History List</h1>
      {history}
    </div>
  )
}

export default ChatHistoryList;