import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { HelpPopupState } from "../../../store/slices/help-popup-slice";
import { setActivePopup } from "../../../store/slices/help-popup-slice";
import classes from "./hint.module.css";

export interface HintContent {
  id: string;
  helpText: string[];
}

export default function Hint({id, helpText}: HintContent) {
  const [showHelp, setShowHelp] = useState(false);
  const activePopup = useSelector((state: HelpPopupState) => state.activePopup);
  const dispatch = useDispatch();

  useEffect(() => {
    setShowHelp(id === activePopup);
  }, [id, activePopup]);

  function toggleHelp() {
    if (showHelp) {
      dispatch(setActivePopup(null));
    } else {
      dispatch(setActivePopup(id));
    }
  }

  let helpContent = <p className={classes.Clickable} onClick={toggleHelp}>?</p>;

  if (showHelp) {
    const helpLines = helpText.map((line, index) => <p key={index}>{`${line}`}</p>);

    helpContent = (
      <div className={classes.HintContainer}>
        <div className={classes.Header}>
          <p className={`${classes.Clickable}`} onClick={toggleHelp}>X</p>
        </div>
        <div className={classes.Content}>
          {helpLines}
        </div>
      </div>
    );  
  }

  return (
    helpContent
  )
};
