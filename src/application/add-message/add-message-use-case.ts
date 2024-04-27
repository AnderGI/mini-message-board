import { Message } from "../../domain/Message.js";
import { AddMessage } from "../../domain/MessageRepository.js";

export const addInMemoryMessage: (repo:AddMessage) => (message:Message) => void = (repo) => {
    return async function (message) {
        // Validar message
          repo(message)
    }
} 