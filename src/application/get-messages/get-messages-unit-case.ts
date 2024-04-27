import { Message } from "../../domain/Message.js";
import { GetMessages } from "../../domain/MessageRepository.js";

export const getMessages: (repositoy:GetMessages) => () => Promise<Message[]> = (repositoy) => {
    return async function(){
        return await repositoy()
    }
}