
const {StatusCodes} = require('http-status-codes');
const Student = require('../Model/student');
const {BadRequestError,NotFoundError,UnauthorizedError} = require('../errors/index')


const register = async(req, res,next) => {

    const student = new Student(req.body)
    console.log(req.body)
    await student.save()
    const token = student.generateToken();
    res.status(StatusCodes.OK).json({msg:'Ok',token});
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
 
    res.status(StatusCodes.OK).json({token})
 
}

module.exports = {
    register,
    login
}