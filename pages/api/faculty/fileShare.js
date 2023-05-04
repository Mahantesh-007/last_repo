import connectDB from '@/middleware/db';
import File from '@/models/Upload';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { filename, description, subject, code, department, author } = req.body;
  
    const file = new File({
      filename,
      description,
      subject,
      code,
      department,
      author
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
