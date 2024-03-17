
const mongoose = require("./index");


const empSchema = new mongoose.Schema(
  {
    userName: { type: String, required: [true, "Name is Required"] },
    imageUrl: [],
    email: { type: String, required: [true, "Email is required"],  },
    mobile: { type: String, required: [true, "Mobile No is required"] },
    designation: { type: String },
    gender: { type: String},
    course: { type: Array },
    
    createdAt: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
  }
);

const empModel = mongoose.model("employee", empSchema);
module.exports = empModel;
