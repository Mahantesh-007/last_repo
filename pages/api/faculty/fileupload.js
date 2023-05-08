const path = require("path");
import FileUpload from "@/models/File";
const multer = require("multer");
import connectDB from "@/middleware/db";

const upload = multer({
  dest: "public/uploads/",
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./public/uploads");
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1000000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          "only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."
        )
      );
    }
    cb(undefined, true); // continue with upload
  },
});

export const config = {
  api: {
    bodyParser: false, // Disable automatic body parsing
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("debug1");
      connectDB();
      console.log("debug2");
      await new Promise((resolve, reject) => {
        upload.single("file")(req, res, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
      const { title, description, subject, code, department, author } =
        req.body;
      const { path, mimetype } = req.file;
      const file = new FileUpload({
        title,
        description,
        file_path: path,
        file_mimetype: mimetype,
        subject,
        code,
        department,
        author,
      });
      console.log(file);
      await file.save();
      res.send("file uploaded successfully.");
    } catch (error) {
      res.status(400).send("Error while uploading file. Try again later.");
      console.log(error);
    }
  } else {
    res.status(405).send("Method not allowed.");
  }
}
