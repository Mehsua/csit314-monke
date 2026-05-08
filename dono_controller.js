import express from "express"
import path from "path"
import cors from "cors"
import {getAccounts} from "./dono_db.js"
import {fileURLToPath} from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.post("/login", async (req, res) => {
    const { username, password } = req.body

    try {
        const accounts = await getAccounts()

        const user = accounts.find(
            acc => acc.username === username && acc.password === password
        )

        if (user) {
            res.json({ success: true, message: "Login successful" })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (err) {
        console.error(err)
        res.status(500).json({ success: false, message: "Server error" })
    }
})

app.get("/dono_site", async (req,res) => {
    const accounts = await getAccounts()
    res.send(accounts)
})

//Runtime error handling from expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})
