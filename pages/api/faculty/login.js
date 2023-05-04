import jwt from "jsonwebtoken";
import connectDB from "@/middleware/db";
import Register from "@/models/adminSignUp";
import CryptoJS from "crypto-js";

connectDB();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Check if faculty exists in the database
      const faculty = await Register.findOne({ email });
      if (!faculty) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      // Check if user is faculty
      if (!faculty.isFaculty) {
        return res.status(401).json({ success: false, message: "Unauthorized access" });
      }

      let myPassForNow = faculty.password;
      console.log(faculty.password);
      let checkPassword = CryptoJS.AES.decrypt(myPassForNow, process.env.NEXT_PUBLIC_KEY).toString(CryptoJS.enc.Utf8);

      if (password !== checkPassword) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      const payload = {
        id: faculty.id,
        isFaculty: faculty.isFaculty,
        email: faculty.email,
        username: faculty.username,
        department: faculty.department
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        (err, token) => {
          if (err) {
            console.error(err.message);
            return res.status(500).json({ success: false, message: "Server Error" });
          }
          res.status(200).json({ success: true, token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  } else {
    res.status(400).json({ success: false });
  }
}
