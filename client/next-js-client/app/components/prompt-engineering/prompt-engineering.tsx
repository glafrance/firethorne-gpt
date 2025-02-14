import PromptElement from "./prompt-element";
import classes from './prompt-engineering.module.css';

export default function PromptEngineering() {
  const roleContent = [
    "A role is optional, but is one way of providing context to the chat engine, and results in better responses.",
    "For simple questions a role is unnecessary."
  ];
  const perspectiveContent = [
    "Role is 'who', perspective is 'how'. Perspective is the viewpoint from which the chat engine should respond.",
    "The role might be 'travel blogger', the perspective might be 'first time visitor' or 'seasoned visitor'.",
    "For simple questions the perspective is unnecessary, but for more complex queries the perspective, like the role, and allow the chat engine to provide a response that is closer to your goal."
  ];

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
        placeholder="social influencer, government official, teacher, etc." 
        helpContent={perspectiveContent} 
      />
    </div>
  );
}