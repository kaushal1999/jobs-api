const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    maxlength: 50,
  },
  position: {
    type: String,
    required: true,
    maxlength: 100,
  },
  status: {
    type: String,
      default: "Pending",
    enum:["Interview","Pending","Declined"]
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref:"User"
  }
}, { timestamps: true });


module.exports=mongoose.model("Job",jobSchema)