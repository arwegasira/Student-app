const Counter = require('../Model/counter');
const User = require('../Model/user');
const Role = require('../Model/role');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError,NotFoundError,UnauthorizedError} = require('../errors/index');
const counter = require('../Model/counter');

const registerStudent = async(req, res,next) => {
    //get roles
    const role = Role.filter(role => role.name.toLocaleLowerCase() === req.query.role.toLocaleLowerCase())[0]._id;
    //increment registration number
     Counter.findOneAndUpdate({name:'REG Number'},{$inc:{value:1}},{returnDocument:'after'}).then(async(el)=>{
    if(el === null ){
        const counter = new Counter({name:'REG Number',value:1})
        await counter.save()
    }
    const nextReg = `GS${new Date().getFullYear().toString()}-${el.value}`
    req.body.regNumber = nextReg;
    req.body.role = role;
    const student = new User(req.body)
    await student.save()
    const token = student.generateToken();
    res.status(StatusCodes.OK).json({msg:'Ok',token,regNumber:student.regNumber});
        
})


}

const registerLecture = async (req, res) => {
    //get roles
    const role = Role.filter(role => role.name.toLocaleLowerCase() === req.query.role.toLocaleLowerCase())[0]._id;
    const user = new User({username:req.body.username,email:req.body.email,password:req.body.password,role:role})
    await user.save()
    const token = user.generateToken()
    
    res.status(StatusCodes.OK).json({msg:'Ok',token})
}


const login = async(req, res, next) => {
    const {password,email} = req.body;
    if(!password || !email)  throw new BadRequestError('Email and password are required');

    // find that student user
    const user = await User.findOne({email: email});
   

    if(!user) throw new UnauthorizedError('Invalid credentials');
    const ispasswordCorrect = await user.comparePassword(password);
   

    if(!ispasswordCorrect) throw new UnauthorizedError('Invalid password')
    const token = user.generateToken();
 
    res.status(StatusCodes.OK).json({user:{userId:user._id,username:user.username},token})
 
}

module.exports = {
    registerStudent,
    login,
    registerLecture,

}