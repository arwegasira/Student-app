
const Student = require('../Model/student');
const Enrollment = require('../Model/enrollment');
const {StatusCodes} = require('http-status-codes');
const {NotFoundError,BadRequestError} = require('../errors')

const enrolltoCourse = async(req,res,next) => {
//check if enrollment already exists for academicYear
    const {studentId,subjectId,academicYear} = req.body;
    const enrollmentExists = await Enrollment.findOne({studentId: studentId, subjectId: subjectId,academicYear:academicYear})
    if(enrollmentExists) throw new BadRequestError('You are already enrolled to this course.');

    const enrollment = new Enrollment(req.body);
    await enrollment.save();
    res.status(StatusCodes.OK).json(enrollment)
}
const fetchStudentCourse = async(req, res, next) => {
    const studentId = req.params.id;
    const {academicYear} = req.query
    let queryObj = {studentId: studentId};
    if(academicYear) queryObj.academicYear = academicYear;

    const enrollment = await Enrollment.find(queryObj).populate('subjectId');
    if(!enrollment) throw new NotFoundError('No enrollment found');

    res.status(StatusCodes.OK).json(enrollment);
    
}
module.exports = {
    enrolltoCourse,
    fetchStudentCourse
}

