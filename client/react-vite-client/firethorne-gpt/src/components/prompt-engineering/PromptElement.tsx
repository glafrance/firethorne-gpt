import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPromptData } from "../../store/slices/prompt-data-slice";
import Hint, { HintContent } from '../shared/hint/Hint';
import classes from "./prompt-element.module.css";  
import { RootState } from "../../store/store";

interface PromptElementProps {
  label: string;
  dataKey: string;
  placeholder: string;
  helpContent: HintContent;
  height?: number;
}

export default function PromptElement({...props}: PromptElementProps) {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const textAreaStyle = props.height ? { height: props.height } : undefined;
  const promptData = useSelector((state: RootState) => state.promptData.data);


  useEffect(() => {
    if (!promptData || Object.keys(promptData).length === 0) {
      setValue('');
    }
  }, [promptData]);

  function onChangeText(evt: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(evt.target.value);
  }

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
        value={value}
        placeholder={props.placeholder} 
        onChange={onChangeText}
        onBlur={updatePromptData} 
      />
      <Hint id={props.helpContent.id} helpText={props.helpContent.helpText} />
    </div>
  )
};
