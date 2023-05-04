import connectDB from "@/middleware/db";
import Department from "@/models/Department";

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { department } = req.body;

    try {
      // Create a new department document and save it to the database
      const newDepartment = new Department({ department });
      await newDepartment.save();

      // Return a success response
      res.status(201).json({ message: 'Department created successfully!' });
    } catch (error) {
      // Return an error response if there's an error saving the department
      res.status(500).json({ message: 'Failed to create department.' });
    }
  } else {
    // Return an error response for any other HTTP method
    res.status(405).json({ message: 'Method not allowed' });
  }
}
