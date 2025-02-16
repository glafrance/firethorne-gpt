'use client'

import { ChangeEvent, useEffect, useRef, useState } from "react";

import classes from './goal-input.module.css';
import { setPrompt } from "@/app/store/data-service";

export default function GoalInput() {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [goal, setGoal] = useState('');
 
  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [])

  const onGoalChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setGoal(event.target.value);
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {    
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      if (goal) {
        setPrompt('goal', goal);
      }
    }
  };

  return (
    <textarea
      ref={textAreaRef}
      className={classes.Textarea}
      onChange={onGoalChangeHandler}
      onKeyDown={onKeyDownHandler}
      placeholder="Enter the goal here. This is what you want to know. You may have provided the optional role, perspective and optional extra information, but the goal is most important. What do you want GPT to generate? A marketing plan, travel itinerary, an essay on the life of Shakespeare?"
    />
  )
}
