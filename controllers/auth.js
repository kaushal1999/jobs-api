const User = require("../models/user");
const StatusCodes = require("http-status-codes");
const error = require("../errors/index");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new error.badRequest("Provide all required fields");
   
  
  const user = await User.findOne({ email });

  if (!user) {
    throw new error.unauthenticated("User doesn`t exists!");
  }

  const isMatch = await user.comparePassword(password)

  if (!isMatch) {
    throw new error.unauthenticated("Wrong password!");
  }
  const token=user.createToken()
  res.status(StatusCodes.OK).json(token);
};
 

const register = async (req, res) => {
 
  const user = await User.create(req.body);
  const token = user.createToken()
  res.status(StatusCodes.CREATED).json(token);
};

module.exports = { login, register };
