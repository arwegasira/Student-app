const Counter = require('../Model/counter');
const {StatusCodes} = require('http-status-codes');
const Student = require('../Model/student');
const {BadRequestError,NotFoundError,UnauthorizedError} = require('../errors/index');
const counter = require('../Model/counter');


const register = async(req, res,next) => {
    //increment registration number

     Counter.findOneAndUpdate({name:'REG Number'},{$inc:{value:1}},{returnDocument:'after'}).then(async(el)=>{
    if(el === null ){
        const counter = new Counter({name:'REG Number',value:1})
        await counter.save()
    }
    const nextReg = `GS${new Date().getFullYear().toString()}-${el.value}`
    req.body.regNumber = nextReg;
    const student = new Student(req.body)
    await student.save()
    const token = student.generateToken();
    res.status(StatusCodes.OK).json({msg:'Ok',token});
        
})


}

const login = async(req, res, next) => {
    const {password,email} = req.body;
    if(!password || !email)  throw new BadRequestError('Email and password are required');

    // find that student user
    const student = await Student.findOne({email: email});
   

    if(!student) throw new UnauthorizedError('Invalid credentials');
    const ispasswordCorrect = await student.comparePassword(password);
   

    if(!ispasswordCorrect) throw new UnauthorizedError('Invalid password')
    const token = student.generateToken();
 
    res.status(StatusCodes.OK).json({user:{userId:student._id,username:student.username},token})
 
}

module.exports = {
    register,
    login
}