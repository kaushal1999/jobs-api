const User = require("../models/user");
const StatusCodes = require("http-status-codes");
const error = require("../errors/index");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new error.badRequest("Provide all required fields");
   
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  console.log(hashedPassword);
  const tempUser={email,password:hashedPassword}
  const user = await User.find(tempUser);

  if (user.length === 0) {
    throw new error.unauthenticated("User doesn`t exists!");
  }

  res.status(StatusCodes.ACCEPTED).json(user);
};
 

const register = async (req, res) => {
 
  const user = await User.create(req.body);
  const token = user.createToken()
  res.status(StatusCodes.CREATED).json(token);
};

module.exports = { login, register };
