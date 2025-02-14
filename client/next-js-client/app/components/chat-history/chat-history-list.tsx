'use client'

import { FC, useEffect, useRef } from "react";
import ChatHistoryItem from "./chat-history-item";
import classes from './chat-history-list.module.css';
import ChatData from "@/app/model/ChatData";

interface Props {
  chatData: ChatData | undefined;
}

const ChatHistoryList: FC<Props> = ({chatData}) => {
  const hiddenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (hiddenRef.current) {
      hiddenRef.current.scrollIntoView({
        behavior: 'smooth', // Optional for smooth scrolling
        block: 'end'
      });
    }  
  }, [chatData, hiddenRef]);

  const history = chatData && chatData.chatHistory && chatData.chatHistory.map(
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