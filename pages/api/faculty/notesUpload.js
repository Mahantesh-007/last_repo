import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import connectDB from '@/middleware/db';
import Uploads from '@/models/file'
import { createReadStream } from 'fs';

connectDB();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
};

export default async function handler(req, res) {
  const { name } = req.body;
  const data = createReadStream(req.file.path);

  // Generate a unique ID for the file
  const id = uuidv4();

  try {
    // Upload the file to GitHub
    const response = await axios.put(`https://github.com/Mahantesh-007/file_uploads/${id}-${name}`, {
      message: `Add ${name}`,
      content: Buffer.from(data).toString('base64'),
      branch: process.env.GITHUB_BRANCH,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    
      },
    });

    // Save the file to MongoDB
    const file = new Uploads({
      name,
      url: response.data.content.download_url,
    });
    await file.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}
