import { Router } from "express";
import { Message } from "../domain/Message.js";
import { getMessages } from "../application/get-messages/get-messages-unit-case.js";
import { AddInMemoryMessage, GetInMemoryMessages } from "../infrastructure/repositories/in-memory/InMemoryRepository.js";
import { addInMemoryMessage } from "../application/add-message/add-message-use-case.js";


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
 

export const MessagesRouter = Router();

MessagesRouter.get('/', async (req, res) => {
    const data: Message[] = await getMessages(GetInMemoryMessages)()
    res.status(200).json(data)
})

// I will create a middelware which will get all the post and application/json type of requests
// and modify the request body
MessagesRouter.post('/new', (req, res) => {
    const {body} = req
    addInMemoryMessage(AddInMemoryMessage)(body)
    res.status(200).json({"message": "Messages added"})
})