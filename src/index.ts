import express  from "express";
import { processMessagesApiEndpoints } from "./infrastructure/process-endpoints/message/process-api-endpoints.js";
import { MessagesRouter } from "./infrastructure/routers/message/messages-router.js";
import path from "path";
import { fileURLToPath } from "url";
import { postRequestHandler } from "./infrastructure/middlewares/post-requests/post-request-handler.js";
import { dotEnv } from "../process-env-variables/dotEnv.js";
dotEnv()

const app = express()
const PORT = process.env.PORT;
app.disable('x-powered-by')

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Pug template engine config
// set the directory where the template files are located
// need absolute path
app.set('views', path.join(dirname, 'infrastructure', 'views'))
// set the view template engine to use
app.set('view engine', 'pug')


app.use(postRequestHandler);
processMessagesApiEndpoints(app)(MessagesRouter)


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})