import { useRef } from "react";
import { useDispatch } from "react-redux";

import { setPromptData } from "../../store/slices/prompt-data-slice";
import Hint, { HintContent } from '../shared/hint/hint';
import classes from "./prompt-element.module.css";  

interface PromptElementProps {
  label: string;
  dataKey: string;
  placeholder: string;
  helpContent: HintContent;
  height?: number;
}

export default function PromptElement({...props}: PromptElementProps) {
  const dispatch = useDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const textAreaStyle = props.height ? { height: props.height } : undefined;

  const updatePromptData = () => {
    if (textAreaRef && textAreaRef.current) {
      dispatch(setPromptData({ field: props.dataKey, value: textAreaRef.current.value }));
    }
  }

  return (
    <div className={classes.Element}>
      <label>{props.label}</label>
      <textarea 
        ref={textAreaRef}
        style={textAreaStyle} 
        placeholder={props.placeholder} 
        onBlur={updatePromptData} 
      />
      <Hint id={props.helpContent.id} helpText={props.helpContent.helpText} />
    </div>
  )
};
