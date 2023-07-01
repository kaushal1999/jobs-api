class customError extends Error{

    customError(message,statusCode) {
        this.message = message
        this.status=statusCode
    }
}

module.exports=customError