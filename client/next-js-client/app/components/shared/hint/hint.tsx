'use client';

import { FC, useState } from "react";
import { IoMdHelp } from "react-icons/io";

import classes from "./hint.module.css";

interface Props {
  content: Array<string>;
}

const Hint: FC<Props> = ({content}) => {
  const [showHelp, setShowHelp] = useState(false);

  function toggleHelp() {
    setShowHelp(curr => !curr);
  }

  const helpContent = content.map((line, index) => <p key={index}>{`${line}`}</p>);

  const help = (
    <div className={classes.HintContainer}>
      <div className={classes.Header}>
        <p className={`${classes.Clickable}`} onClick={toggleHelp}>X</p>
      </div>
      <div className={classes.Content}>
        {helpContent}
      </div>
    </div>
  );

  return (
    <>
      {!showHelp && <IoMdHelp size={20} className={classes.Clickable} onClick={toggleHelp} />}
      {showHelp && help}
    </>
  )
};

export default Hint;