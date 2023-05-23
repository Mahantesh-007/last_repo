
import Subjects from '@/models/Subject';
import connectDB from '@/middleware/db';

connectDB();

export default async function handler(req, res) {
  switch(req.method ) {
    case "POST":
    try {
      const { subjectname, code, department, semester, authorId } = req.body;
      const uppercaseCode = code.toUpperCase();

      const newSubject = new Subjects({
        subjectname,
        code: uppercaseCode,
        department,
        semester,
        authorId
      });

      await newSubject.save();
      res.status(201).json({ message: 'Subject added successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Could not add subject.' });
    }
    break;

    case "DELETE":
      try {
        const { _id } = req.query;
        const user = await Subjects.findOne({ _id });

        if (!user) {
          res.status(404).json({ success: false, error: "User not found" });
          return;
        }

        await Subjects.deleteOne({ _id });
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
      
    default:
      res.status(400).json({ message: 'Invalid request method.' });
      break;
  }
}
