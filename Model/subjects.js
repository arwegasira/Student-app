
const mongoose = require('mongoose');

const schema = mongoose.Schema;

const subjectSchema = new schema({
 
    name:{
        type: String,
        required:[true,'Course Name is required'],
        minLength:3,
        unique: true
    },
    
    code:{
        type: String,
        required:[true,'Code is required'],
        unique: true
    }
},{ timestamps: true })

module.exports = mongoose.model('subject', subjectSchema);