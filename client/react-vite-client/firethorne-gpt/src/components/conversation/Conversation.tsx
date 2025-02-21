import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useCreateConversationMutation } from "../../store/conversation-api";
import PromptEngineering from "../prompt-engineering/PromptEngineering";
import ConversationList from "./ConversationList";
import classes from './conversation.module.css';
import GoalInput from "../goal-input/GoalInput";
import { RootState } from "../../store/store";
import { buildPrompt } from "../../util/prompt";
import { reset } from "../../store/slices/prompt-data-slice";

export default function Conversation() {
  const [createConversation, { data, error, isLoading }] = useCreateConversationMutation();
  const promptData = useSelector((state: RootState) => state.promptData.data);
  const dispatch = useDispatch();

  const conversationCreator = useCallback(async () => {
    if (promptData?.goal) {
      const fullPrompt: string = buildPrompt(promptData);

      if (fullPrompt !== '') {
        await createConversation({ prompt: fullPrompt }).unwrap();
        dispatch(reset());        
      }  
    }

  }, [promptData, createConversation, dispatch]);

  useEffect(() => {
    async function callConversationCreator() {
      await conversationCreator();
    }

    callConversationCreator();
  }, [promptData, conversationCreator]);

  const loading = isLoading && <p>Loading conversation...</p>;
  const errorMessage = error && <p>Error loading conversation.</p>;

  const content = data && <ConversationList conversation={data} />;

  return (
    <div className={classes.Conversation}>
      <div className={classes.Instruction}>
        <p>Firethorne GPT makes it easier to leverage GPT technologies to your advantage.</p>
        <p>Providing a role, a perspective, extra information, and a goal  helps GPT provide the most relevant and useful response.</p>
        <p>Only a goal is required, and for simple queries that may be enough, but often the role, perspective, and additional information are essential.</p>
      </div>
      <PromptEngineering />
      {content}
      <GoalInput />
      {loading}
      {errorMessage}
    </div>
  )
}