'use client'

import { ChangeEvent, useState } from "react";

import { submitPrompt } from "@/app/utils/http";
import classes from './prompt-input.module.css';
import { redirect } from "next/navigation";

const PromptInput = () => {
  const [prompt, setPrompt] = useState('');

  const onPromptChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const onKeyDownHandler = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {    
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      const result = await submitPrompt(prompt);

      if (result) {
        // TODO this seems like a hack, but how to refresh the chat history page if user submits a prompt from there.
        if (window.location.pathname.endsWith('chat-history')) {
          location.reload();
        } else {
          redirect('/pages/chat-history');
        }
      }
    }
  };

  return (
    <textarea
      className={classes.Textarea}
      onChange={onPromptChangeHandler}
      onKeyDown={onKeyDownHandler}
      placeholder="Enter prompt to send to ChatGPT..." />
  )
}

export default PromptInput;