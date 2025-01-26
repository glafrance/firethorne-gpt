'use client'

import { ChangeEvent, useEffect, useRef, useState } from "react";

import { submitPrompt } from "@/app/utils/http";
import classes from './prompt-input.module.css';

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

      const result = await submitPrompt(prompt);

      if (result) {
        // TODO this seems like a hack, but how to refresh the chat history page if user submits a prompt from there.
        location.reload();
      }
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