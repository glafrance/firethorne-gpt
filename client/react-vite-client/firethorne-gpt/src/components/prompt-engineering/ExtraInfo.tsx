import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { useDispatch } from "react-redux";

import Hint, { HintContent } from "../shared/hint/hint";
import classes from './extra-info.module.css';
import { setPromptData } from "../../store/slices/prompt-data-slice";

interface ExtraInfoItem {
  id: string;
  text: string;
}

export default function ExtraInfo() {
  const [extraInfo, setExtraInfo] = useState<ExtraInfoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const dispatch = useDispatch();

  const helpContent: HintContent = {
    id: 'extra-info',
    helpText: [
      'Extra information helps GPT provide a relevant response.',
      'Short bullet points are best. Here are some examples:',
      'no more than 500 words',
      'no explantion or extra text',
      'keep the tone casual, not stiff and formal',
      'Try to limit your extra information to between 5 - 10 items.'
    ]
  };

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(evt.target.value);
  }

  function handleKeyDown(evt: React.KeyboardEvent<HTMLInputElement>) {
    if (evt.code === 'Enter') {
      addItem();
    }
  }

  function addItem() {
    if (inputValue !== '') {
      const item: ExtraInfoItem = {
        id: uuidv4(),
        text: inputValue
      };

      setExtraInfo(curr => {
        const newExtraInfo = [...curr, item];

        dispatch(setPromptData({ field: 'additionalInformation', value: newExtraInfo.join(", ") }));

        return newExtraInfo;
      });

      setInputValue('');
    }
  }

  function deleteItem(id: string) {
    setExtraInfo(curr => {
      const newExtraInfo = curr.filter(item => item.id !== id);

      dispatch(setPromptData({ field: 'additionalInformation', value: newExtraInfo.join(", ") }));

      const newInfo = newExtraInfo;
      return newInfo;
    });
  }

  const extraInfoItems = extraInfo.map((item) => {
    return (
      <div 
        key={item.id}
        className={classes.ExtraInfoItem}>
        <p>{item.text}<span className={classes.DeleteIcon} onClick={() => deleteItem(item.id)}>X</span></p>
      </div>
    );
  });

  return (
    <div className={classes.InfoContainer}>
      <div className={classes.InputContainer}>
        <label>Extra Information:</label>
        <input 
          type="text" 
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="500 words or less, no additional text or description, etc." />
        <p className={classes.AddBtn} onClick={addItem}>+</p>
        <Hint id={helpContent.id} helpText={helpContent.helpText} />
      </div>
      <div className={classes.ExtraInfoContainer}>
        {extraInfoItems}
      </div>
    </div>
  )
}