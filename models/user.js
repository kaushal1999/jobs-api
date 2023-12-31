const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxlength: 30,
  },
  email: {
      type: String,
      unique:true,
      required: [true, "Email is required"],
      match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Provide a valid email"
]
  },
  password: {
    type: String,
      required: [true, "Password is required"],
    minlength:6,
  },
});


userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})


userSchema.methods.createToken = function() {

  return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn:"30d"
  })
}

userSchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword, this.password) 
  return isMatch
}

module.exports=mongoose.model("User",userSchema)
