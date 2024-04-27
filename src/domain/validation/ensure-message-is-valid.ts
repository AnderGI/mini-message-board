import { Message } from "../Message.js";



const isMessageTextValid = (message:Message) => {
    return message.text.length > 0 
}


const isMessageUserValid = (message:Message) => {
    return message.user.length > 0 
}


// Trhow error if message is not valid
export const ensureMessageIsValid : (message:Message) => void = (message) => {
    const isTextValid:Boolean = isMessageTextValid(message)
    const isUserValid:Boolean = isMessageUserValid(message)
    const isValid:Boolean = isTextValid && isUserValid
    if(!isValid) throw new Error('Not a valid message')
    message.added = new Date()
}