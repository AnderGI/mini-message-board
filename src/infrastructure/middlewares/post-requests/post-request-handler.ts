import { NextFunction, Request, Response } from "express";
import { jsonDataGeneratorFactory } from "./json-data-generator-factory.js";

const acceptableContentTypes: string[] = ["application/json", 'application/x-www-form-urlencoded']

export const postRequestHandler = (req:Request, res:Response, next:NextFunction) => {
    const {method, headers} = req;
    const {"content-type" : content} = headers
    // Only hanlde post request
    if(method.toUpperCase() !== "POST") return next()
    // Ensure the content type passed in is acceptable
    if(!content || acceptableContentTypes.indexOf(content) === -1) return next()

    // For Post method we have to listen to data event
    // where chunks of buffer data willl be concatenated to an string variable
    let data:string = ''
    req.on('data', (chunk:Buffer) => {
        data += chunk.toString();
    })

    // The way that data is handled will depend on the content type
    // It will be done on the end event
    // It will always modify the request body with the same json like message structure
    req.on('end', () => {
        req.body = jsonDataGeneratorFactory(data, content)
        return next()
    })

}


