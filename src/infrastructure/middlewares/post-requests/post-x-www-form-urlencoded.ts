import { NextFunction, Request, Response } from "express";

export const handlePostXWWWFormUrlEncodedData = (req:Request, res:Response, next:NextFunction) => {
    const {method, headers} = req
    // Only POST and application/x-www-form-urlencoded requests
    if(method.toUpperCase() !== "POST") return next();
    if(headers['content-type'] !== 'application/x-www-form-urlencoded') return next()


    let data:string = ''
    
    req.on('data', (chunk:Buffer) => {
        data += chunk.toString()
    })

    req.on('end', () => {
        // example : username=Ander&text=Hola%20que%20tal
        let userDataRecord:Record<string,string> = {};
        data.split("&").forEach(pair => {
            const [key, value] = pair.split("=")
            // add to it only if it does not exist
            if(!(key in userDataRecord)) userDataRecord[key] = value.replace(/%20/g, ' ')
        })
        req.body = JSON.parse(
            JSON.stringify(userDataRecord)
        )
        return next()
    })
}