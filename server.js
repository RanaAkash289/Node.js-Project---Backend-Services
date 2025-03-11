const express = require("express");
const errorHandler = require("./middleWare/errorHandller");
const connectDb = require("./config/dbconnection");
const env = require('dotenv').config();
connectDb();
const app = express();
const port = process.env.port || 5000;

//by default middleware for body and params. to access the body we can use this.
app.use(express.json());
app.use("/api/getContact", require("./routes/contactRoutes"));

app.use("/api/userRoute", require("./routes/userRoutes"));
//custome error handler
app.use(errorHandler);



app.listen(port, ()=>{
    console.log("connected");
});