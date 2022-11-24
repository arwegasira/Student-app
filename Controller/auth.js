
const {StatusCodes} = require('http-status-codes');
const Student = require('../Model/student');


const register = async(req, res,next) => {

    const student = new Student(req.body)
    await student.save()
    const token = student.generateToken();
    res.status(StatusCodes.OK).json({msg:'Ok',token});
}

const login = (req, res, next) => {
    const {password,email} = req.body;
    if(!password || !email) {

        
    }
}

module.exports = {
    register,
    login
}