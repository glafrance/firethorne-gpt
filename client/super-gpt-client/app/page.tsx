'use server'

import PromptInput from "./components/chat-input/prompt-input";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.promptContainer}>
        <PromptInput />
      </div>
    </div>
  );
}
