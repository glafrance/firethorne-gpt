'use client';

import { FC, useRef } from "react";
import Hint from "../shared/hint/hint";
import classes from "./prompt-element.module.css";
import { setPromptData } from "@/app/store/data-service";

interface Props {
  label: string;
  dataKey: string;
  placeholder: string;
  helpContent: Array<string>;
  height?: number;
}

const PromptElement: FC<Props> = ({...props}) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const textAreaStyle = props.height ? { height: props.height } : undefined;

  const updatePromptData = () => {
    if (textAreaRef && textAreaRef.current) {
      console.log('textAreaRef.current.value', textAreaRef.current.value);
      console.log('dataKey', props.dataKey);
      setPromptData({
        [props.dataKey]: textAreaRef.current.value
      });
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

export default PromptElement;