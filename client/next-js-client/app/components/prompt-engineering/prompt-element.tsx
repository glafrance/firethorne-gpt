'use client';

import { FC, useEffect, useRef, useState } from "react";
import Hint from "../shared/hint/hint";
import classes from "./prompt-element.module.css";  
import { HelpPopup } from "@/app/model/help-popup";
// import { getConversationIdBS, setPromptData } from "@/app/store/data-service";

interface Props {
  label: string;
  dataKey: string;
  placeholder: string;
  helpContent: HelpPopup;
  height?: number;
}

const PromptElement: FC<Props> = ({...props}) => {
  const [conversationId, setConversationId] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const textAreaStyle = props.height ? { height: props.height } : undefined;

  // useEffect(() => {
  //   getConversationIdBS().subscribe({
  //     next: id => {
  //       if (id) {
  //         setConversationId(id);
  //       }
  //     },
  //     error: err => console.log('Error getting conversation id in prompt-element', err)
  //   });  
  // }, []);

  const updatePromptData = () => {
    if (textAreaRef && textAreaRef.current && conversationId) {
      // setPromptData({
      //   conversationId,
      //   [props.dataKey]: textAreaRef.current.value
      // });
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