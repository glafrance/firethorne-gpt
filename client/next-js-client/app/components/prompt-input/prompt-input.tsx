'use client'

import { ChangeEvent, useEffect, useRef, useState } from "react";

import classes from './prompt-input.module.css';
// import { sendPromptData } from "@/app/actions";
// import { getConversationIdBS } from "@/app/store/data-service";

const PromptInput = () => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [prompt, setPrompt] = useState('');
  const [conversationId, setConversationId] = useState('');
 
  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.focus();
    }

    // getConversationIdBS().subscribe({
    //   next: id => {
    //     if (id) {
    //       setConversationId(id);
    //     }
    //   },
    //   error: err => console.log('Error getting conversation id in prompt-element', err)
    // });  
  }, [])

  const onPromptChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const onKeyDownHandler = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {    
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      if (prompt && conversationId) {
        // await sendPromptData({ 
        //   conversationId,
        //   prompt 
        // });
      }
    }
  };

  return (
    <textarea
      ref={textAreaRef}
      className={classes.Textarea}
      onChange={onPromptChangeHandler}
      onKeyDown={onKeyDownHandler}
      placeholder="Enter the goal here. This is what you want to know. You may have provided the optional role, perspective and optional extra information, but the goal is most important. What do you want GPT to generate? A marketing plan, travel itinerary, an essay on the life of Shakespeare?"
    />
  )
}

export default PromptInput;