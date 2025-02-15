import ChatPrompt from "./chat-prompt";
import ChatResponse from "./chat-response";

export default interface ChatItem {
  prompt: ChatPrompt;
  response: ChatResponse;
}