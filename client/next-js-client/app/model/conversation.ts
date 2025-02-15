import ChatItem from "./chat-item";

export default interface Conversation {
  _id: string;
  items: ChatItem[];
  createdAt: Date;
}