import ChatItem from "./chat-item";

export default interface Conversation {
  _id: string;
  promptData: {
    role: string;
    perspective: string;
    goal: string;
    additionalInfo: string;
  },
  items: ChatItem[];
  createdAt: Date;
}