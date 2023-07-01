const badRequest = require("../errors/BadRequest")
const unauthenticated = require("../errors/unauthenticated")
const customError=require("../errors/custom-error")



module.exports={
   badRequest,customError,unauthenticated
}