
const {StatusCodes} = require('http-status-codes');
const Student = require('../Model/student');


const register = async(req, res,next) => {
    const student = new Student(req.body)
    await student.save()
    res.status(StatusCodes.OK).json({msg:'Ok',student});
}

const login = (req, res, next) => {
    res.send('Login route');
}

module.exports = {
    register,
    login
}