
const User = require("../models/user")
const StatusCodes = require("http-status-codes")



const login = async (req,res) => {
    const user = await User.find(req.body)
    if (!user) res.status(StatusCodes.UNAUTHORIZED).send("Provide valid credentials!")
    res.status(StatusCodes.ACCEPTED).json(user);
}

const register = async (req, res) => {
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json(user)
};

module.exports={login,register}