import { Model, connect, model } from "mongoose";
import { Message } from "../../../../domain/message/Message.js";
import { MessageSchema } from "../schemas/messages/MessageSchema.js";
import {
  AddMessage,
  GetMessages,
} from "../../../../domain/message/MessageRepository.js";

/*
Already added in mongo
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

*/

const messageModel: Model<Message> = model<Message>("Message", MessageSchema);

export const mongoDbRun = async (envVar: string) => {
  await connect(envVar);
};

export const GetMongoDbMessages: GetMessages = async () => {
  // devuelve los documents
  const collectionDocuments = await messageModel.find({}).exec();
  const messages: Message[] = collectionDocuments.map((docu) => {
    const { user, added, text } = docu;
    return { user, added, text };
  });

  return Promise.resolve(messages);
};

export const AddMongoDbMessage: AddMessage = async (newMessage: Message) => {
  await messageModel.create(newMessage);
};
