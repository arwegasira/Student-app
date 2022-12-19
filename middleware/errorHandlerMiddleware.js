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
//mongoose cast error
if(err.name === 'CastError'){
    customError.statusCode = StatusCodes.NOT_FOUND;
    customError.message = `No item found with id: ${err.value}`
}


//mongoose validation error
if(err.name === 'ValidationError'){
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = `${Object.values(err.errors).map(el=>el.message).join(', ')}`;
}
    //return res.status(customError.statusCode).json(err);
    return res.status(customError.statusCode).json({message:customError.message})
}

module.exports = errorHandlerMiddleware;