'use client';

import { ChangeEvent, useState } from "react";

import styles from "./page.module.css";

const defaultResult = { content: '' };

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(defaultResult);

  const onPromptChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  async function fetchData() {
    setResult(defaultResult);

    if (prompt) {
      const response = await fetch('http://localhost:3100/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chatData: prompt })
      });

      if (!response.ok) {
        console.log("Failed to send chat data.");
        throw new Error("Failed to send chat data.");
      }
      
      const resData = await response.json();
      setResult(resData.result);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.promptContainer}>
        <textarea
          onChange={onPromptChangeHandler}
          placeholder="Enter prompt to send to ChatGPT..." />
        <button onClick={fetchData}>Submit</button>
      </div>
      <p>{result?.content}</p>
    </div>
  );
}
