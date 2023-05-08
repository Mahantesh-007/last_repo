import FileUpload from "@/models/File";
import { spawn } from "child_process";
import connectDB from "@/middleware/db";
connectDB();

export default async function handler(req, res) {
  try {
    if (req.method === "DELETE") {
      const { id } = req.query;
      const findfile = await FileUpload.findById(id);
      const command = spawn("cmd.exe", ["/c", "del", "/q", findfile.file_path]);
      command.on("close", (code) => {
        if (code === 0) {
          console.log(
            `Successfully deleted ${findfile.file_path} from public folder`
          );
        } else {
          console.error(
            `Error deleting ${findfile.file_path} from public folder`
          );
        }
      });
      const filedelete = await FileUpload.findByIdAndDelete(id);
      res.status(204).end(); // 204 No Content status code indicates success with no response body
    } else {
      res.status(405).end(); // 405 Method Not Allowed status code for unsupported HTTP methods
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
