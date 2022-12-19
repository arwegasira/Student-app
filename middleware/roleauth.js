
const {StatusCodes} = require('http-status-codes');
const {UnauthorizedError} = require('../errors/');
const roleauth = (role) =>{

    return (req, res, next)=>{
        if(!role.includes(req.user.role)){
            throw new UnauthorizedError('Not authorized');
        }
      next();
    }
}

module.exports = roleauth;
   