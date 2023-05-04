import mongoose from 'mongoose';


const subjectSchema = new mongoose.Schema({
  subjectname: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true
  }
});

mongoose.models = {}

const Subjects = mongoose.model('Subject', subjectSchema);

export default Subjects;
