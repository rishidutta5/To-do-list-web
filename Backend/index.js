require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const userRouter = require('./routes/user.routes');
const todoRouter = require("./routes/todo.routes");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://rishirajdutta1505_db_user:n9yn4kQw0e89AE7y@cluster0.9l8bq8w.mongodb.net/?appName=Cluster0")
.then(()=>{
    console.log("MongoDB connected")
})
.catch((error)=>{
    console.log(error);
})

app.use("/api/auth", userRouter);
app.use("/api/todos", todoRouter);

app.listen(3000, ()=>{
    console.log(`server running on port 3000`);
})
