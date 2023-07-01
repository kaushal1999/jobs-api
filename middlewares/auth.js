const { unauthenticated } = require("../errors")
const jwt = require("jsonwebtoken");


function auth(req,res,next) {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new unauthenticated("Authetication failed")
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId=payload.userId
       next()
    } catch (error) {
        throw new unauthenticated("Authentication failed")
    }
    
}


module.exports=auth