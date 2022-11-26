
const Student = require('../Model/student');
const Enrollment = require('../Model/enrollment');
const {StatusCodes} = require('http-status-codes');
const {NotFoundError,BadRequestError} = require('../errors')

const enrolltoCourse = async(req,res,next) => {

const {subjectId,academicYear,studentId}  = req.body;

//if(!subjectId || !academicYear) throw new BadRequestError('Subject and Academic Year are required');

//fetch student information
 const student = await Student.findOne({_id: studentId});
if(!student) throw new NotFoundError('Student not registered');
const enrolledCourses = student.enrollments.subject;

//Check if enrollment exist
const exist = enrolledCourses.filter(el => el.subjectId === subjectId && el.academicYear === academicYear)
if(exist.length) throw new BadRequestError('Student already enrolled to course');

// add enrollment
await student.addEnrollments({subjectId,academicYear}) ;
await student.save();



res.status(StatusCodes.OK).json({msg:'Ok',enrolledCourses})
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

