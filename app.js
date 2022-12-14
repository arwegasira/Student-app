
require('express-async-errors');
require('dotenv').config();
require('http-status-codes');

const roles = require('./Model/role');
const adminRole = roles.filter(role => role._id === 1)[0]._id ;
const studentRole = roles.filter(role => role._id === 2)[0]._id; 
const lecturerRole = roles.filter(role => role._id === 3)[0]._id ;


const express = require('express');
const app = express();


//security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');


const connect = require('./db/connect');

//security options
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(xss());


//authenticationMiddleware
const authmiddleware = require('./middleware/authentication');
const roleauth = require('./middleware/roleauth');


//routes
const auth = require('./Routes/auth');
const admin = require('./Routes/admin');
const student = require('./Routes/student');


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
app.use('/api/v1/admin',authmiddleware,roleauth([adminRole,studentRole]),admin);
app.use('/api/v1/student',authmiddleware,roleauth([adminRole,studentRole]),student);

// not found response
app.use(notFound);
app.use(errorHandlerMiddleware);


const start = async()=>{
 await connect(process.env.MONGO_URI).then(res=>{
   app.listen(port,console.log(`Sever is listening on ${port}`)); 

      }).catch(err=>console.log(err))
}

start();


