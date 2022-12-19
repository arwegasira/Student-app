
const express = require('express');
const router = express.Router() ; 

const {addSubject,fetchCourseEnrollments,markStudent} = require('../Controller/admin');


router.post('/addsubject', addSubject);
router.get('/courseEnrollments/:id',fetchCourseEnrollments)
router.post('/markstudent/:id',markStudent);


module.exports = router;

