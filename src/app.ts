import express, { Express } from "express"
import routes from "./routes/routes";
import * as dotenv from "dotenv"

const app = express()

app.use(express.json())
app.use('/', routes)

app.listen(8080, () => {
    console.log(`Server listening on port 8080`)
})
