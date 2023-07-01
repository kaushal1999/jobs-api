const StatusCodes=require("http-status-codes")

const errorHandler = (err, req, res, next) => {
    res.send(err.message)
}

module.exports=errorHandler