import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPromptData } from "../../store/slices/prompt-data-slice";
import classes from './goal-input.module.css';
import { RootState } from "../../store/store";

export default function GoalInput() {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const promptData = useSelector((state: RootState) => state.promptData.data);
  const [goal, setGoal] = useState('');
  const dispatch = useDispatch();
 
  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [])

  useEffect(() => {
    if (!promptData || Object.keys(promptData).length === 0) {
      setGoal('');
    }
  }, [promptData]);

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
      value={goal}
      onKeyDown={onKeyDownHandler}
      placeholder="Enter the goal here. This is what you want to know. You may have provided the optional role, perspective and optional extra information, but the goal is most important. What do you want GPT to generate? A marketing plan, travel itinerary, an essay on the life of Shakespeare?"
    />
  )
}
