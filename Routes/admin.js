
const express = require('express');
const router = express.Router() ; 

const {addSubject,} = require('../Controller/subjects');
const {fetchCourseEnrollments} = require('../Controller/students')

router.post('/addsubject', addSubject);
router.get('/courseEnrollments/:id',fetchCourseEnrollments)

module.exports = router;

