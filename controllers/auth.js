
const User = require("../models/user")
const StatusCodes=require("http-status-codes")
const login = (req,res) => {
      
}

const register = async (req, res) => {
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json(user)
};

module.exports={login,register}