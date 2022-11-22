
const mongoose = require('mongoose');

const shema = mongoose.Schema;

const subjectSchema = new schema({
 
    name:{
        type: String,
        required:[true,'Course Name is required'],
        minLength:3
    },
    
    code:{
        type: String,
        required:[true,'Code is required']
    }
},{ timestamps: true })

module.exports = mongoose.model('subject', subjectSchema);