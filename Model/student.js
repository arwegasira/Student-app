const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const schema = mongoose.Schema;

const studentSchema =  new schema({
username:{
    type:String,
    required:[true,'Name is required'],
    minLength:5
},

email:{
 type:String,
 required:[true,'Email is required'],
 match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Invalid email'],
 unique: true
},
password:{
    type:String,
    match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,'Invalid password']
},

regNumber:{
    type:String,
    
},

enrollments:{
    subject:[{subjectId:{type:String,required:[true,'course is required'],ref:'subject'},academicYear:{type:String,required:[true,'Academic year is required']},results:{catMarks:{type:Number},examMarks:{type:Number}}}]
   
}

},{ timestamps: true })


studentSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

})

studentSchema.methods.generateToken =  function(){
    return jwt.sign({id:this._id, username:this.username},process.env.SECRET_KEY,{ expiresIn:'30d'});
}

studentSchema.methods.comparePassword = async function(candidatePassword){
 return await bcrypt.compare(candidatePassword,this.password);
}

studentSchema.methods.addEnrollments = async function(enrollment){
    return this.enrollments.subject.push(enrollment)
}
module.exports = mongoose.model('student', studentSchema);