
require('express-async-errors');
require('dotenv').config();

const express = require('express');
const app = express();
const connect = require('./db/connect');
require('http-status-codes');



//routes
const auth = require('./Routes/auth');

const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');

const port = 3000;

app.use('/home', (req,res)=>{
 res.send('Hello  world');
})


//usefull express middleware
app.use(express.json());

//API routes
app.use('/api/v1/auth',auth);

// not found response
app.use(notFound);
app.use(errorHandlerMiddleware);


const start = async()=>{
 await connect(process.env.MONGO_URI).then(res=>{
   app.listen(port,console.log(`Sever is listening on ${port}`)); 
 }).catch(err=>console.log(err))
}

start();

