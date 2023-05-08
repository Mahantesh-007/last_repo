import connectDB from "@/middleware/db";
import Rate from "@/models/Rating";
connectDB();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { userId,file,rating } = req.body;
        const newRate = new Rate({
          userId,
          file,
          rating,
          isRated:true
        });
        await newRate.save();
        res.status(201).json({ success: true, data: newRate });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
      case 'PUT':
        try {
          const { userId, file, rating, id } = req.body;
          const updatedRate = await Rate.findByIdAndUpdate(id, { userId, file, rating }, { new: true });
          res.status(200).json({ success: true, data: updatedRate });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      
    case 'GET':
      try {
        const rates = await Rate.find({});
        res.status(200).json({ success: true, data: rates });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}


