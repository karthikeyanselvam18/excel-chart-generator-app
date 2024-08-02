import { useState, useRef } from "react";
import axios from "axios";

const FileUpload = ({ setIsFileUploaded }) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setBtnDisabled(!e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("No file selected");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      setMessage("File Uploaded");
      setIsFileUploaded(true);
      setFile(null); 
      setBtnDisabled(true); 
      inputRef.current.value = ""; 
    } catch (err) {
      console.error(err);
      setMessage("File not uploaded");
    }
  };

  return (
    <div>
      <form onSubmit={handleFileUpload}>
        <input
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
        />
        <button type="submit" disabled={btnDisabled}>
          Upload
        </button>
        <div>{message}</div>
      </form>
    </div>
  );
};

export default FileUpload;
