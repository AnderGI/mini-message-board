import { NextFunction, Request, Response } from "express";

// Create a middlewrae the will handle POST and application/json requests
// By modifiying the request body
export const handlePostJsonMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {method, headers} = req;
    	
    if(method.toUpperCase() !== "POST") return next()
    if(headers['content-type'] !== "application/json") return next();

    // Get the request body info while data is arriving
    let data:string= ''
    req.on('data', (chunksOfData:Buffer) => {
        data += chunksOfData.toString()
    })

    // Modify the request body so that i contains the JSON data when data arrival finishes
    req.on('end', () => {
        req.body = JSON.parse(data)
        return next()
    })

    
}
