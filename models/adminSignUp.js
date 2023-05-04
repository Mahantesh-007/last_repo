import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  usn: {
    type: String,
    required: false
  },
  department: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isFaculty: {
    type: Boolean,
    default: false
  },
  isStudent: {
    type: Boolean,
    default: false
  }
});

mongoose.models = {}
const Register = mongoose.model('Register', adminSchema);

export default Register;