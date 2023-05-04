import connectDB from "@/middleware/db";
import Register from "@/models/adminSignUp";
import { set } from "mongoose";

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const { username, department, email, password } = req.body;

        const user = new Register({
          username,
          department,
          email,
          password,
          isFaculty: false,
        });

        await user.save();

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

        user.isFaculty = true;
        await user.save();
        res.status(200).json({ success: true, data: user });
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
