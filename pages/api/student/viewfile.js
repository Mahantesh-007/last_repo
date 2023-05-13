const path = require("path");
const multer = require("multer");
import FileUpload from "@/models/File";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      console.log("HI");
      const files = await FileUpload.find({});
      const sortedByCreationDate = files.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      res.send(sortedByCreationDate);
    } catch (error) {
      res
        .status(400)
        .send("Error while getting list of files. Try again later.");
    }
  }
}