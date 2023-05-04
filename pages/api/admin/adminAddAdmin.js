
import connectDB from "@/middleware/db";
import Register from "@/models/adminSignUp";

connectDB()

export default async function handler(req, res) {

  switch (req.method) {
    case 'POST':
      try {
        const { email, password, username } = req.body;
        const user = new Register({ email, password, username, isAdmin : true});
        await user.save();
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
