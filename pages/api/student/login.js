import jwt from "jsonwebtoken";
import connectDB from "@/middleware/db";
import Register from "@/models/adminSignUp";
import CryptoJS from "crypto-js";

connectDB();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Check if student exists in the database
      const student = await Register.findOne({ email });
      if (!student) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      // Check if user is student
      if (!student.isStudent ) {
        return res.status(401).json({ success: false, message: "Unauthorized access" });
      }

      let myPassForNow = student.password;
      console.log(student.password);
      let checkPassword = CryptoJS.AES.decrypt(myPassForNow, process.env.NEXT_PUBLIC_KEY).toString(CryptoJS.enc.Utf8);

      if (password !== checkPassword) {
        return res.status(402).json({ success: false, message: "Invalid credentials" });
      }

      const payload = {
        id: student.id,
        isStudent : student.isStudent ,
        email: student.email,
        username: student.username
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
    }  catch (error) {
      console.error(error.message);
      if (error.message === "Unauthorized access") {
        return res.status(401).json({ success: false, message: "Unauthorized access" });
      } else if (error.message === "Invalid credentials") {
        return res.status(402).json({ success: false, message: "Invalid credentials" });
      }
      res.status(500).json({ success: false, message: "Server Error" });
    }
}
}

