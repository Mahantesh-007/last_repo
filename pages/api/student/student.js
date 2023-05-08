import connectDB from "@/middleware/db";
import Register from "@/models/adminSignUp";
connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const { username, usn, email, password } = req.body;

        // Check if the provided USN already exists in the database
        const existingUser = await Register.findOne({ usn });
        if (existingUser) {
          return res
            .status(400)
            .json({ success: false, error: "USN already exists" });
        }

        const user = await Register.create({
          username,
          usn,
          email,
          password,
        });

        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }

      break;
    case "PUT":
      try {
        const { _id } = req.query;
        const user = await Register.findOne({ _id });

        if (!user) {
          res.status(404).json({ success: false, error: "User not found" });
          return;
        }

        user.isStudent = true;
        await user.save();
        res.status(200).json({ success: true, data: user, message:"Student Approved" });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "DELETE":
      try {
        const { _id } = req.query;
        const user = await Register.findOne({ _id });

        if (!user) {
          res.status(404).json({ success: false, error: "User not found" });
          return;
        }

        await Register.deleteOne({ _id });
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
