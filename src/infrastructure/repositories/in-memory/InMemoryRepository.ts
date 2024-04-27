import { Message } from "../../../domain/Message.js";
import { AddMessage, GetMessages } from "../../../domain/MessageRepository.js";

const messages:Message[] = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
 ];
 

 export const GetInMemoryMessages:GetMessages = () => {
    return Promise.resolve(messages);
 }

 export const AddInMemoryMessage: AddMessage = (message:Message) => {
   messages.push(message)
    
 }