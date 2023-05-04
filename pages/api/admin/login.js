import jwt from "jsonwebtoken";
import connectDB from "@/middleware/db";
import Register from "@/models/adminSignUp";
import CryptoJS from "crypto-js";

connectDB();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Check if admin exists in the database
      const admin = await Register.findOne({ email });
      if (!admin) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      // Check if user is admin
      if (!admin.isAdmin) {
        return res.status(401).json({ success: false, message: "Unauthorized access" });
      }

      let myPassForNow = admin.password;
      console.log(admin.password);
      let checkPassword = CryptoJS.AES.decrypt(myPassForNow, process.env.NEXT_PUBLIC_KEY).toString(CryptoJS.enc.Utf8);

      if (password !== checkPassword) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      // Create and send JWT token
      const payload = {
        id: admin.id,
        isAdmin: admin.isAdmin,
        email: admin.email,
        username: admin.username
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
