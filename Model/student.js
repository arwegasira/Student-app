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
    match:[/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,'Invalid password']
},

regNumber:{
    type:String,
    
}

},{ timestamps: true })


studentSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

})

studentSchema.methods.generateToken =  function(){
    return jwt.sign({id:this.id, username:this.username},process.env.SECRET_KEY,{ expiresIn:'30d'});
}

studentSchema.methods.comparePassword = async function(candidatePassword){
 return await bcrypt.compare(candidatePassword,this.password,);
}

module.exports = mongoose.model('student', studentSchema);