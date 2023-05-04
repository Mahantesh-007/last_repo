import { useEffect, useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

function AddAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    // if (token) {
    //   const decodedToken = jwt_decode(token);
      if (!token) {
        router.push("/admin/Login");
      }

  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let ciphertext = CryptoJS.AES.encrypt(
        password,
        process.env.NEXT_PUBLIC_KEY
      ).toString();

      
    try {
      const res = await axios.post("/api/admin/adminAddAdmin", {
        email,
        password:ciphertext,
        username,
        
      });
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        setEmail("");
        setPassword("");
        router.push("/admin/displayStudents");
        window.location.reload();
      }
      setMessage("Admin added successfully");
    } catch (error) {
        console.error(error);
        setMessage("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Add Admin</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Add Admin</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddAdmin;
