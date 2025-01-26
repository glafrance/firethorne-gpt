'use client'

import { ChangeEvent, useEffect, useRef, useState } from "react";

import classes from './prompt-input.module.css';
import { sendPromptData } from "@/app/actions";

const PromptInput = () => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [])

  const onPromptChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const onKeyDownHandler = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {    
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      await sendPromptData(prompt);
    }
  };

  return (
    <textarea
      ref={textAreaRef}
      className={classes.Textarea}
      onChange={onPromptChangeHandler}
      onKeyDown={onKeyDownHandler}
      placeholder="Enter prompt to send to ChatGPT..."
    />
  )
}

export default PromptInput;