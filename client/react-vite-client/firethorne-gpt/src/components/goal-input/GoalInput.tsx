import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setPromptData } from "../../store/slices/prompt-data-slice";
import classes from './goal-input.module.css';

export default function GoalInput() {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [goal, setGoal] = useState('');
  const dispatch = useDispatch();
 
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
        dispatch(setPromptData({ field: 'goal', value: goal }));
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
