const {StatusCodes} = require('http-status-codes')
const errorHandlerMiddleware = (err,req,res,next) =>{

    let customError ={
        message: err.message ||'Something went wrong,try again later',
        statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }


// will add mongosee validation errors
// if mongoose dup error
if(err.code === 11000){
    customError.message = `${Object.keys(err.keyValue)} should be unique`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
}

    return res.status(customError.statusCode).json(customError.message);
    //return res.status(customError.statusCode).json({message:customError.message})
}

module.exports = errorHandlerMiddleware;