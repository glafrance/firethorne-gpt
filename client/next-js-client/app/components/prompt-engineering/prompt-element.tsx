'use client';

import { useRef } from "react";
import Hint from "../shared/hint/hint";
import classes from "./prompt-element.module.css";  
import { HelpPopup } from "@/app/model/help-popup";
import { setPrompt } from "@/app/store/data-service";

interface PromptElementProps {
  label: string;
  dataKey: string;
  placeholder: string;
  helpContent: HelpPopup;
  height?: number;
}

export default function PromptElement({...props}: PromptElementProps) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const textAreaStyle = props.height ? { height: props.height } : undefined;

  const updatePromptData = () => {
    if (textAreaRef && textAreaRef.current) {
      setPrompt(props.dataKey, textAreaRef.current.value);
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
      <Hint content={props.helpContent} />
    </div>
  )
};
