const customError = require("./custom-error");
const StatusCodes=require("http-status-codes")

class badRequest extends customError{

    badRequest(message) {
        this.message=message
        this.status = StatusCodes.BAD_REQUEST
    }
}

module.exports=badRequest