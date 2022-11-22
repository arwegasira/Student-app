
const express = require('express');
const router = express.Router();

const {register,login} = require('../Controller/auth');

router.post('/signup',register)
router.get('/signin',login)

module.exports = router;