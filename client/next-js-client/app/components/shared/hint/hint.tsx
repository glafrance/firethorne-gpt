'use client';

import { FC, useEffect, useState } from "react";

import classes from "./hint.module.css";
import { getHelpPopupBS, setHelpPopup } from "@/app/store/data-service";
import { HelpPopup } from "@/app/model/help-popup";

interface Props {
  content: HelpPopup;
}

const Hint: FC<Props> = ({content}) => {
  const [showHelp, setShowHelp] = useState(false);

  function handleHelpPopupChange() {

  }

  useEffect(() => {
    getHelpPopupBS().subscribe({
      next: result => {
        setShowHelp(result === content.id);
      },
      error: err => {
        console.log('Error getting update on open help popup');
      }
    })
  }, []);

  function toggleHelp() {
    if (showHelp) {
      setHelpPopup('');      
    } else {
      setHelpPopup(content.id);
    }
  }

  const helpContent = content.helpText.map((line, index) => <p key={index}>{`${line}`}</p>);

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
      {!showHelp && <p className={classes.Clickable} onClick={toggleHelp}>?</p>}
      {showHelp && help}
    </>
  )
};

export default Hint;