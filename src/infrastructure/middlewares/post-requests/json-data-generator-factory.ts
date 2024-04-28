import { applicationJson, jsonDataGenerators, xWWWFormUrlencoded } from "./json-data-generators.js"

// content-type as key : function that will generate a message domain entity JSON once req onend event fires
const contentToGeneratorMapper: Record<string, jsonDataGenerators> = {
    "application/json" : applicationJson, 
    "application/x-www-form-urlencoded" : xWWWFormUrlencoded
}

// The factory will help maintain OCP
export const jsonDataGeneratorFactory = (data:string, contentType:string) => contentToGeneratorMapper[contentType](data)
