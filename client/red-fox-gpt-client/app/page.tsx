'use client';

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [data, setData] = useState({ data: ''});

  async function fetchData() {
    const response = await fetch('http://localhost:3100/chat', {
      method: 'POST'
    });
    const resData = await response.json();
    setData(resData);
  }

  return (
    <div className={styles.page}>
      <div className={styles.promptContainer}>
        <input type="text" placeholder="Enter prompt to send to ChatGPT..." />
        <button onClick={fetchData}>Submit</button>
      </div>
      <p>{data.data}</p>
    </div>
  );
}
