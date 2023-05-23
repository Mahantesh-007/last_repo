
import Subjects from '@/models/Subject';
import connectDB from '@/middleware/db';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { subjectname, code, department, semester, authorId } = req.body;

      const newSubject = new Subjects({
        subjectname,
        code,
        department,
        semester,
        authorId
      });

      await newSubject.save();
      res.status(201).json({ message: 'Subject added successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Could not add subject.' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { _id } = req.body;

      const deletedSubject = await Subjects.findByIdAndDelete(_id);
      if (!deletedSubject) {
        res.status(404).json({ message: 'Subject not found.' });
        return;
      }

      res.status(200).json({ message: 'Subject deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Could not delete subject.' });
    }
  } else {
    res.status(400).json({ message: 'Invalid request method.' });
  }
}
