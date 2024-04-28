import { Schema } from "mongoose";
import { Message } from "../../../../../domain/message/Message.js";

const MessagesSchema : Schema<Message> = new Schema<Message>({
    text: {type: String, required : true},
    user: {type: String, required : true},
    added: {type:Date, required: false, default: () => Date.now()}
})