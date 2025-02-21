import { HintContent } from "../shared/hint/Hint";
import PromptElement from "./PromptElement";
import ExtraInfo from "./ExtraInfo";
import classes from './prompt-engineering.module.css';

export default function PromptEngineering() {
  const roleContent: HintContent = {
    id: 'role',
    helpText: [
      "A role is optional, but is one way of providing context to the chat engine, and results in better responses.",
      "For simple questions a role is unnecessary."
    ]
  };
  const perspectiveContent: HintContent = {
    id: 'perspective',
    helpText: [
      "Role is 'who', perspective is 'how'. Perspective is the viewpoint from which the chat engine should respond.",
      "The role might be 'politician', the perspective might be 'adventurous' or 'conservative'.",
      "For simple questions the perspective is unnecessary, but for more complex queries the perspective, like the role, and allow the chat engine to provide a response that is closer to your goal."
    ]
  };

  return (
    <div className={classes.ElementsContainer}>
      <PromptElement 
        label="Role:"
        dataKey='role' 
        placeholder="marketing executive, adademic researcher, student, etc." 
        helpContent={roleContent} 
      />
      <PromptElement 
        label="Perspective:" 
        dataKey='perspective' 
        placeholder="adventurous, conservative, concerned, inquisitive, etc." 
        helpContent={perspectiveContent} 
      />
      <ExtraInfo />
    </div>
  );
}