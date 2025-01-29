import PromptElement from "./prompt-element";

export default function PromptEngineering() {
  const roleContent = [
    "A role is optional, but is one way of providing context to the chat engine, and results in better responses.",
    "For simple questions a role is unnecessary."
  ];

  return (
    <div>
      <PromptElement 
        label="Role" 
        placeholder="marketing executive, adademic researcher, student, etc." 
        helpContent={roleContent} 
      />
    </div>
  );
}