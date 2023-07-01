const { StatusCodes } = require("http-status-codes");
const customError = require("./custom-error");

class unauthenticated extends customError{
    unauthenticated(message) {
        this.message = message;
        this.status=StatusCodes.UNAUTHORIZED
    }
}

module.exports = unauthenticated


