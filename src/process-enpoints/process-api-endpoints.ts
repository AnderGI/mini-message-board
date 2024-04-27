import { Application, Router } from "express"

export const processMessagesApiEndpoints: (app:Application) => (messages:Router) => void = (app) => {
   return function(messagesRouter:Router){
        app.use(messagesRouter)
   }
}