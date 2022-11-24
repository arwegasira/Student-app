
const Subject = require('../Model/subjects');
const {StatusCodes} = require('http-status-codes');


const addSubject = async (req,res,next)=>{
const subject = new Subject(req.body);
await subject.save();
res.status(StatusCodes.OK).json(subject);


}


 module.exports = {
    addSubject,
   
 }   
