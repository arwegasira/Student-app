
const mongoose = require('mongoose');

const schema = mongoose.Schema

const enrollmentSchema = new schema({

    studentId:{
        type:mongoose.Types.ObjectId,
        ref:'student',
        required:[true, 'Student ID is required']
    },
    subjectId:{
        type:mongoose.Types.ObjectId,
        ref:'subject',
        required:[true, 'Subject ID is required']
    },
    academicYear:{
        type:String,
        required:[true, 'Academic year is required']
    }
},
{ timestamps: true }
)

module.exports = mongoose.model('enrollment',enrollmentSchema);