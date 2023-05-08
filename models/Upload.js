import mongoose  from "mongoose";


const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required : true
  },
  department: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});

mongoose.models = {}
const File = mongoose.model('File', fileSchema);

export default File;