import { Router } from "express";
import { Message } from "../../../domain/message/Message.js";
import { getMessages } from "../../../application/get-messages/get-messages-unit-case.js";
import { AddInMemoryMessage, GetInMemoryMessages } from "../../repositories/in-memory/InMemoryRepository.js";
import { addInMemoryMessage } from "../../../application/add-message/add-message-use-case.js";


export const MessagesRouter = Router();

MessagesRouter.get('/', async (req, res) => {
    const data: Message[] = await getMessages(GetInMemoryMessages)()
    //res.status(200).json(data)
    res.render('index', {messages:data})
})


MessagesRouter.get('/new', async (req, res) => {
    res.status(200).json("Add message page")
})

// I will create a middelware which will get all the post and application/json type of requests
// and modify the request body
MessagesRouter.post('/new', (req, res) => {
    const {body} = req
    addInMemoryMessage(AddInMemoryMessage)(body)
    res.redirect("/")
    
})