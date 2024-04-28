import { Router } from "express";
import { Message } from "../../../domain/message/Message.js";
import { getMessages } from "../../../application/get-messages/get-messages-unit-case.js";
import {
  AddInMemoryMessage,
  GetInMemoryMessages,
} from "../../repositories/in-memory/InMemoryRepository.js";
import { addMessage } from "../../../application/add-message/add-message-use-case.js";
import {
  GetMongoDbMessages,
  AddMongoDbMessage,
} from "../../repositories/mongodb/ports/MongoDBRepository.js";

export const MessagesRouter = Router();

MessagesRouter.get("/", async (req, res) => {
  try {
    const data: Message[] = await getMessages(GetMongoDbMessages)();
    res.status(200).render("index", { messages: data });
  } catch (err) {
    // send err to db or to some report
    res.status(500).json({ message: "Internal server error" });
  }
});

MessagesRouter.get("/new", async (req, res) => {
  res.status(200).render("form");
});

// I will create a middelware which will get all the post and application/json type of requests
// and modify the request body
MessagesRouter.post("/new", (req, res) => {
  const { body } = req;
  try {
    addMessage(AddMongoDbMessage)(body);
    res.status(200).redirect("/");
  } catch (err) {
    // send err to db or to some report
    res.status(500).json({ message: "Internal server error" });
  }
});
