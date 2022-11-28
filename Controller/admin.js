
const Subject = require('../Model/subjects');
const Student = require('../Model/student');
const {StatusCodes} = require('http-status-codes');
const {NotFoundError, BadRequestError} = require('../errors')


const addSubject = async (req,res,next)=>{
const subject = new Subject(req.body);
await subject.save();
res.status(StatusCodes.OK).json(subject);


}

const fetchCourseEnrollments = async(req, res, next) => {

   const{query:{academicYear},params:{id:courseId}} = req;

   let queryObj = {
    'enrollments.subject.subjectId':courseId
   }

   if(academicYear) {
     queryObj = {
        'enrollments.subject.subjectId':courseId,
        'enrollments.subject.academicYear':academicYear
       }
   }

  const enrollments = await Student.find(queryObj).select('username regNumber email');
  if(!enrollments.length) throw new NotFoundError('No enrollments found');


   res.status(StatusCodes.OK).json({students:enrollments,count:enrollments.length})
    

}


const markStudent = async(req, res, next) => {
   const {params:{id:studentId},query:{courseId,academicYear},body:{cat,exam}} = req;

   if(!studentId || !courseId) throw new BadRequestError('Course and student are required');

   const student = await Student.findOne({_id:studentId,'enrollments.subject.subjectId':courseId});
   
   if(!student) throw new BadRequestError('Student not enrolled to this course');

   student.enrollments.subject.forEach(item =>{
       if(item.subjectId === courseId && item.academicYear === academicYear) {
         item.results.catMarks = Number(cat)
         item.results.examMarks = Number(exam)
       } 
   })

   const result = await student.save();

   

   res.status(StatusCodes.OK).json(result);
}


 module.exports = {
    addSubject,
    fetchCourseEnrollments,
    markStudent
   
 }   
