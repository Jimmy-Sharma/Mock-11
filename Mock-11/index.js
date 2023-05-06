const express = require("express")
const { connection } = require("./db")
require("dotenv").config()
const cors = require("cors")
const { UserRouter } = require("./routes/users.routes")
let { authen } = require("./middleware/authenticate")
let { bookRouter } = require("./routes/books.routes")

const app = express()
app.use(express.json())
app.use(cors())
app.use("/api", UserRouter)
app.use(authen)
app.use("/api", bookRouter)


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Connected to DB")
        console.log(`Running on port ${process.env.port}`)
    } catch (error) {
        console.log("Unable to connect")
        console.log(error)
    }
})