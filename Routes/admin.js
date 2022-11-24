
const express = require('express');
const router = express.Router() ; 

const {addSubject} = require('../Controller/subjects');

router.post('/addsubject', addSubject);

module.exports = router;

