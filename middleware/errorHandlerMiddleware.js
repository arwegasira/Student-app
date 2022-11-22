const {StatusCodes} = require('http-status-codes')
const errorHandlerMiddleware = (err,req,res,next) =>{

    let customError ={
        message: err.message ||'Something went wrong,try again later',
        statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }


// will add mongosee validation errors

    return res.status(customError.statusCode).json(err)
    return res.status(customError.statusCode).json({message:customError.message})
}

module.exports = errorHandlerMiddleware;