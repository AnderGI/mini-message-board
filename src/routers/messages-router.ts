import { Router } from "express";
import { Message } from "../model/Message.js";


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

MessagesRouter.get('/', (req, res) => {
    res.status(200).json(messages)
})

// I will create a middelware which will get all the post and application/json type of requests
// and modify the request body
MessagesRouter.post('/new', (req, res) => {
    const {body} = req
    res.status(200).json(body)
})