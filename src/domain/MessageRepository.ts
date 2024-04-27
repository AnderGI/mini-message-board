import { Message } from "./Message.js";

export type GetMessages = () => Promise<Message[]>;
export type AddMessage = (newMessage:Message) => void