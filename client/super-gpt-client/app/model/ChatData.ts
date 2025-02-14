import ChatItem from "./ChatItem";

export default interface ChatData {
  conversationId?: string;
  chatHistory: ChatItem[];
}