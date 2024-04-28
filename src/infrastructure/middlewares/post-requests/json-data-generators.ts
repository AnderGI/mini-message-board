export type jsonDataGenerators = (data:string) => JSON

export const applicationJson: jsonDataGenerators = (data:string) => JSON.parse(data)

export const xWWWFormUrlencoded: jsonDataGenerators = (data:string) => {
    let userDataRecord:Record<string,string> = {};
    data.split("&").forEach(pair => {
        const [key, value] = pair.split("=")
        // add to it only if it does not exist
        if(!(key in userDataRecord)) userDataRecord[key] = value.replace(/%20/g, ' ')
    })
    return JSON.parse(JSON.stringify(userDataRecord))
}