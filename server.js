import express from "express"
import colors from "colors"
import morgan from "morgan"
import { config } from "dotenv"

config()

const app = express();
const port = process.env.PORT || 8000

app.get("/", (req,res) => {
    res.send("Welcome to our homepage")
})

app.listen(port, ()=>console.log(`Server running on port ${port}`))