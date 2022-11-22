
const {StatusCodes} = require('http-status-codes');
const notFound = (req,res)=>{
res.status(StatusCodes.BAD_REQUEST).json({message:'Ressource not found'})
}

module.exports = notFound;