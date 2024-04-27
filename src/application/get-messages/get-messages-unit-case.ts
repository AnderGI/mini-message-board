import { Message } from "../../domain/message/Message.js";
import { GetMessages } from "../../domain/message/MessageRepository.js";

export const getMessages: (repositoy:GetMessages) => () => Promise<Message[]> = (repositoy) => {
    return async function(){
        return await repositoy()
    }
}