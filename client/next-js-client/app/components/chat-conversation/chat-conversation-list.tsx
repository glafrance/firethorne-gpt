'use client'

import { FC, useEffect, useRef } from "react";
import ChatConversationItem from "./chat-conversation-item";
import classes from './chat-conversation-item.module.css';
import ChatConversation from "@/app/model/conversation";

interface Props {
  chatConversation: ChatConversation | null;
}

const ChatConversationList: FC<Props> = ({chatConversation}) => {
  const hiddenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (hiddenRef.current) {
      hiddenRef.current.scrollIntoView({
        behavior: 'smooth', // Optional for smooth scrolling
        block: 'end'
      });
    }  
  }, [chatConversation, hiddenRef]);

  // const conversation = chatData && chatData.chatHistory && chatData.chatHistory.map(
  //   item => <ChatHistoryItem 
  //     key={item.id} 
  //     prompt={item.prompt} 
  //     response={item.response} 
  //   />
  // );

  return (
    <>
      <div
        className={classes.List}>
        {/* {history} */}
        <div ref={hiddenRef}></div>
      </div>
    </>
  )
}

export default ChatConversationList;