import express from "express"
import colors from "colors"
import morgan from "morgan"
import { config } from "dotenv"


import connectDB from "./config/db.js"
import schoolRoutes from "./routes/v1/schools.js"

config()

const app = express();
const port = process.env.PORT || 8000

// middlewares
app.use(express.json())

app.use(morgan("combined"))

// to get an overview of http verbs involved in a FE req
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

// routes

app.get("/", (req,res) => {
    res.send("Welcome to our homepage")
})

app.use("/api/v1/schools", schoolRoutes);


connectDB()
app.listen(port, () =>
    console.log(
        `Server running in ${process.env.NODE_ENV} mode | Port ${port}`.yellow
            .bold
    )
);