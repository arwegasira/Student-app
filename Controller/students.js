
const Student = require('../Model/user');
const {StatusCodes} = require('http-status-codes');
const {NotFoundError,BadRequestError} = require('../errors')

const enrolltoCourse = async(req,res,next) => {

const {subjectId,academicYear,studentId}  = req.body;

if(!subjectId || !academicYear) throw new BadRequestError('Subject and Academic Year are required');

//fetch student information
 const student = await Student.findOne({_id: studentId});
if(!student) throw new NotFoundError('Student not registered');
const enrolledCourses = student.enrollments.subject;

//Check if enrollment exist
const exist = enrolledCourses.filter(el => el.subjectId === subjectId && el.academicYear === academicYear)
if(exist.length) throw new BadRequestError('Student already enrolled to course');

// add enrollment
await student.addEnrollments({subjectId,academicYear}) ;
await Student.updateOne({_id: student._id},{'enrollments.subject':student.enrollments.subject});


res.status(StatusCodes.OK).json({msg:'Ok',enrolledCourses})

}


const fetchStudentCourse = async(req, res, next) => {
    const studentId = req.params.id;
    const {academicYear} = req.query

   

    let result = await Student.findOne({_id:studentId}).populate('enrollments.subject.subjectId').exec();
    if(!result) throw new NotFoundError('No enrollment found');

    if(academicYear){
        result = result.enrollments.subject.filter(el=> el.academicYear === academicYear)
    }else{
        result = result.enrollments.subject
    }
    
      res.status(StatusCodes.OK).json({result,count:result.length});
    
}


module.exports = {
    enrolltoCourse,
    fetchStudentCourse,
  
}

