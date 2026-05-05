import express from "express"
import path from "path"
import cors from "cors"
import {createAccount, getAccount, getAccounts} from "./donor_db.js"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()

app.use(cors())
app.use(express.static("public"))

app.get("/donor_site", async (req,res) => {
    const accounts = await getAccounts()
    res.send(accounts)
})   

//Copy & pasted from expressjs.com/en/guide/error-handling.html
//These lines handle errors magically but idk how it works fr
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})