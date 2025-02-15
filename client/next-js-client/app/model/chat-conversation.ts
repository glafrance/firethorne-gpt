import ChatItem from "./chat-item";

export default interface ChatConversation {
  _id: string;
  items: ChatItem[];
  createdAt: Date;
}