
const express = require('express');
const router = express.Router();

const {enrolltoCourse} = require('../Controller/students');

router.post('/enroll',enrolltoCourse);

module.exports = router;