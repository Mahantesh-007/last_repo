import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false
  },
  file: {
    type: String,
    required: false
  },
  rating: {
    type: String,
    required: true
  },
  isRated: {
    type: Boolean,
    default: false
  }
});


mongoose.models = {}
const Rate =  mongoose.model('Rating', ratingSchema);

export default Rate;
