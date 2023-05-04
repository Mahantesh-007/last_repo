import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
    unique:true,
  },
});


mongoose.models = {}
const Departments = mongoose.model('Departments', departmentSchema);

export default Departments;
