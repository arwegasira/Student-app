

const {UnauthorizedError} = require('../errors/index')
const jwt = require('jsonwebtoken');
const authenticationMiddleware =  (req,res,next)=>{

    const authHeader = req.headers.authorization;

    if(!authHeader || ! authHeader.startsWith('Bearer ')){
        throw new UnauthorizedError('Invalid authorization')
    }
    const token = authHeader.split(' ')[1];

 
    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        const {id:userId, username,role} = decoded ; 
        req.user = {userId,username,role};

        next()
        
    } catch (error) {
       throw new UnauthorizedError('Invalid authorization') 
    }
 
 
 

}

module.exports = authenticationMiddleware