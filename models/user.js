const mongoose = require("mongoose");

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
    maxlength: 30,
  },
});

module.exports=mongoose.model("User",userSchema)
