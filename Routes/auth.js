
const express = require('express');
const router = express.Router();

const {registerStudent,login,registerLecture } = require('../Controller/auth');

router.post('/signup',registerStudent);
router.post('/signup/lecturer',registerLecture);
router.get('/signin',login);

module.exports = router;