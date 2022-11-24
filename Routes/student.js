
const express = require('express');
const router = express.Router();

const {enrolltoCourse,fetchStudentCourse} = require('../Controller/students');

router.post('/enroll',enrolltoCourse);
router.get('/mycourses/:id',fetchStudentCourse)

module.exports = router;