import mongoose  from "mongoose";


const noteSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  }

});

mongoose.models = {}
const Upload = mongoose.model('Uploads', noteSchema);

export default Upload;
