import { cloneElement, useState } from "react";
import axios from "axios";
import { API } from "../config/api";

const AdminPage = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file first.");
            return;
        }

        setUploading(true);
        setMessage(""); 

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(API.GENERATE_CREDENTIALS, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Error uploading file.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{marginLeft: "650px", marginTop: "250px", marginBottom: "200px", alignContent:"center", justifyContent:"center"}}>
            <h2>Upload Excel File</h2>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
            <div style = {{alignContent:"center", justifyContent:"center", textAlign: "center",color: "white", backgroundColor: "black", width:150, marginTop:10}}> 
                <button onClick={handleUpload} disabled={uploading}>
                    {uploading ? "Uploading..." : "Upload"}
                </button>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminPage;