require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const userRouter = require('./routes/user.routes');
const todoRouter = require("./routes/todo.routes");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URL)
.then(()=>{
    console.log("MongoDB connected")
})
.catch((error)=>{
    console.log(error);
})

app.use("/api/auth", userRouter);
app.use("/api/todos", todoRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})
