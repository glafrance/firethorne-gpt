import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Hint, { HintContent } from "../shared/hint/Hint";
import classes from './extra-info.module.css';
import { setPromptData } from "../../store/slices/prompt-data-slice";
import { RootState } from "../../store/store";

interface ExtraInfoItem {
  id: string;
  text: string;
}

export default function ExtraInfo() {
  const [extraInfo, setExtraInfo] = useState<ExtraInfoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const promptData = useSelector((state: RootState) => state.promptData.data);
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

  useEffect(() => {
    if (!promptData || Object.keys(promptData).length === 0) {
      setExtraInfo([]);
      setInputValue('');
    }
  }, [promptData]);

  useEffect(() => {
    const extraInfoString = extraInfo.reduce((retVal, curr) => {
      return retVal + curr.text;
    }, "");
    dispatch(setPromptData({ field: 'additionalInformation', value: extraInfoString }));
  }, [dispatch, extraInfo]);

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(evt.target.value);
  }

  function handleKeyDown(evt: React.KeyboardEvent<HTMLInputElement>) {
    if (evt.code === 'Enter') {
      addItem();
    }
  }

  function handleBlur() {
    if (inputValue !== '') {
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
        return newExtraInfo;
      });

      setInputValue('');
    }
  }

  function deleteItem(id: string) {
    setExtraInfo(curr => {
      const newExtraInfo = curr.filter(item => item.id !== id);
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
          onBlur={handleBlur}
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