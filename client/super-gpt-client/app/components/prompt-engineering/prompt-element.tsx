'use client';

import { FC } from "react";
import Hint from "../shared/hint/hint";
import classes from "./prompt-element.module.css";

interface Props {
  label: string;
  placeholder: string;
  helpContent: Array<string>;
  height?: number;
}

const PromptElement: FC<Props> = ({...props}) => {
  const textAreaStyle = props.height ? { height: props.height } : undefined;

  return (
    <div className={classes.Element}>
      <label>{props.label}</label>
      <textarea style={textAreaStyle} placeholder={props.placeholder} />
      <Hint content={props.helpContent} />
    </div>
  )
};

export default PromptElement;