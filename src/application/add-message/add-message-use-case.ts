import { Message } from "../../domain/message/Message.js";
import { AddMessage } from "../../domain/message/MessageRepository.js";
import { ensureMessageIsValid } from "../../domain/validation/ensure-message-is-valid.js";

export const addInMemoryMessage: (repo:AddMessage) => (message:Message) => void = (repo) => {
    return async function (message) {
        try{
            ensureMessageIsValid(message)
            repo(message)
        }catch(err){
            console.log(err)
        }
          
    }
} 