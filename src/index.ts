import express, { NextFunction, Request, Response }  from "express";
import { processMessagesApiEndpoints } from "./process-enpoints/process-api-endpoints.js";
import { MessagesRouter } from "./routers/messages-router.js";

const app = express()
const PORT = process.env.PORT ?? 3000;


// Create a middlewrae the will handle POST and application/json requests
// By modifiying the request body

const handlePostJsonMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {method, headers} = req;
    	
    if(method.toUpperCase() !== "POST") return next()
    if(headers['content-type'] !== "application/json") return next();

    // Get the request body info while data is arriving
    let requestBufferData:Buffer[] = [];
    req.on('data', (chunksOfData:Buffer) => {
        requestBufferData.push(chunksOfData)
    })

    // Modify the request body so that i contains the JSON data when data arrival finishes
    req.on('end', () => {

        req.body = JSON.parse(Buffer.concat(requestBufferData).toString())
        return next()
    })

    
}

app.use(handlePostJsonMiddleware)

processMessagesApiEndpoints(app)(MessagesRouter)

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})