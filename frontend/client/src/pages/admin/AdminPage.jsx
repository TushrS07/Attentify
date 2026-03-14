import { useState } from "react";
import axios from "axios";
import { ADMIN_API as API } from "../../config/api";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <div className="flex">
            {/* Simple Inline Sidebar for Admin */}
            <nav className="bg-slate-900 text-slate-200 w-64 min-h-screen p-4 static top-0 left-0 hidden custom:block shadow-lg z-10">
                <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} theme="colored" />
                <div className="mt-8 mb-10 px-4">
                    <h2 className="text-xl font-bold tracking-tight text-white">Attentify</h2>
                    <p className="text-xs text-slate-400 mt-1">Admin Control Center</p>
                </div>
                <ul className="text-sm font-medium">
                    <li className="mb-1">
                        <Link to="/admin">
                            <span className="block px-4 py-2.5 rounded-md transition-colors bg-blue-600 text-white">
                                Credential Generator
                            </span>
                        </Link>
                    </li>
                    <li className="mb-1">
                        <Link to="/admin/login" className="block mt-8">
                            <span className="block px-4 py-2.5 rounded-md transition-colors text-slate-300 hover:bg-slate-800 hover:text-white">
                                Logout
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="flex-1 min-h-screen bg-slate-50">
                <div className="max-w-4xl mx-auto px-8 py-12">
                    <div className="mb-10 border-b border-slate-200 pb-6">
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Control Center</h1>
                        <p className="text-slate-500 mt-2 text-lg">Bulk credential generation via Excel upload.</p>
                    </div>

                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8">
                        <h2 className="text-xl font-semibold text-slate-800 mb-6">Credential Generator</h2>
                        
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors mb-6">
                            <svg className="w-12 h-12 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            <p className="text-slate-600 font-medium mb-2">Select Excel (.xlsx) File</p>
                            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="block w-full max-w-xs text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                        </div>

                        <div className="flex flex-col items-start">
                            <button
                                onClick={handleUpload}
                                disabled={uploading || !file}
                                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {uploading ? "Uploading..." : "Upload and Generate"}
                            </button>
                            
                            {message && (
                                <div className="mt-6 w-full p-4 border border-slate-200 rounded-md bg-slate-50">
                                    <p className="text-sm font-medium text-slate-700">Process Status:</p>
                                    <p className="text-slate-600 mt-1">{message}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;