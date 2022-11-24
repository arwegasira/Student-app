
const Student = require('../Model/student');
const Enrollment = require('../Model/enrollment');

const enrolltoCourse = async(req,res,next) => {

    const enrollment = new Enrollment(req.body);
    await enrollment.save();
    res.status(200).json(enrollment)
}

module.exports = {
    enrolltoCourse
}