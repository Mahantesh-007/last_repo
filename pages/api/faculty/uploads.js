import connectDB from '@/middleware/db';
import Upload from '@/models/file';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fileName, fileUrl } = req.body;
  
    const file = new Upload({
      fileName,
     fileUrl,
    });

    try {
      const newFile = await file.save();
      res.status(201).json({success: "successful"});
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error saving file" });
    }
  } else {
    res.status(404).send("Not Found");
  } 
    
}
