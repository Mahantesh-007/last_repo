import { useState, useEffect } from "react";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

function uploadFile() {
  const [notesUpload, setNotesUpload] = useState(null);
  const [notesUrls, setNotesUrls] = useState([]);

  const notesListRef = ref(storage, "notes/");

  const uploadFile = () => {
    if (notesUpload == null) return;
    const fileName = notesUpload.name + v4();
    const fileRef = ref(storage, `notes/${fileName}`);
    uploadBytes(fileRef, notesUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setNotesUrls((prev) => [...prev, { name: fileName, url }]);
        axios
        .post("/api/Faculty/uploads", {
          fileName: fileName,
          fileUrl: url,
        })
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
      });
    });
  };



  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setNotesUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Notes</button>
      <ul>
        {notesUrls.map((file) => (
          <li key={file.name}>
            <a href={file.url} download={file.name}>
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default uploadFile;
