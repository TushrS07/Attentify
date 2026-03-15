import { useState } from "react";
import axios from "axios";
import { ADMIN_API as API } from "../../config/api";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FileSpreadsheet, UploadCloud, LogOut, CheckCircle } from "lucide-react";

const AdminPage = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [dragOver, setDragOver] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setMessage("");
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped?.name?.match(/\.xlsx?$/)) {
            setFile(dropped);
            setMessage("");
        }
    };

    const handleUpload = async () => {
        if (!file) { setMessage("Please select a file first."); return; }
        setUploading(true);
        setMessage("");
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await axios.post(API.GENERATE_CREDENTIALS, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage(response.data.message);
        } catch { setMessage("Error uploading file."); }
        finally { setUploading(false); }
    };

    return (
        <div className="flex">
            {/* Admin Sidebar */}
            <nav className="bg-slate-900 text-slate-200 w-64 min-h-screen flex flex-col static top-0 left-0 hidden custom:flex shadow-xl z-10 border-r border-slate-800">
                <ToastContainer position="top-right" autoClose={2000} theme="colored" />
                <div className="px-6 py-6 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-white font-bold text-sm border border-slate-600">A</div>
                        <div>
                            <h2 className="text-base font-bold tracking-tight text-white">Attentify</h2>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Admin Panel</p>
                        </div>
                    </div>
                </div>
                <ul className="flex-1 px-3 py-4 space-y-0.5 text-sm font-medium">
                    <li>
                        <Link to="/admin">
                            <span className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-600 text-white font-semibold">
                                <FileSpreadsheet size={16} /> Credential Generator
                            </span>
                        </Link>
                    </li>
                </ul>
                <div className="px-3 pb-6 border-t border-slate-800 pt-4">
                    <Link to="/admin/login">
                        <span className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-red-900/30 hover:text-red-400 transition-all text-sm font-medium group">
                            <LogOut size={16} className="text-slate-500 group-hover:text-red-400" />Logout
                        </span>
                    </Link>
                </div>
            </nav>

            <div className="flex-1 min-h-screen bg-slate-50">
                <div className="max-w-3xl mx-auto px-6 md:px-10 py-10">
                    <div className="mb-8 border-b border-slate-200 pb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight font-serif">Credential Generator</h1>
                        <p className="text-slate-500 mt-1.5 text-sm">Upload an Excel sheet to bulk-generate login credentials for users.</p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                        <h2 className="text-base font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <FileSpreadsheet size={18} className="text-blue-600" /> Upload Excel File
                        </h2>

                        {/* Drop Zone */}
                        <div
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer mb-6 ${
                                dragOver ? "border-blue-400 bg-blue-50" : file ? "border-emerald-400 bg-emerald-50/50" : "border-slate-300 hover:border-blue-300 bg-slate-50 hover:bg-blue-50/30"
                            }`}>
                            {file ? (
                                <>
                                    <CheckCircle className="text-emerald-500 mb-3" size={36} />
                                    <p className="text-sm font-semibold text-emerald-700 mb-1">{file.name}</p>
                                    <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB · Ready to upload</p>
                                </>
                            ) : (
                                <>
                                    <UploadCloud className="text-slate-400 mb-3" size={36} />
                                    <p className="text-sm font-semibold text-slate-700 mb-1">Drag & drop or click to browse</p>
                                    <p className="text-xs text-slate-400">Supports .xlsx and .xls files</p>
                                </>
                            )}
                            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange}
                                className="absolute opacity-0 w-full h-full cursor-pointer" style={{ inset: 0 }} />
                        </div>

                        <label className="block mb-4">
                            <span className="text-sm font-semibold text-slate-700 mb-1.5 block">Or select file</span>
                            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange}
                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                        </label>

                        <button onClick={handleUpload} disabled={uploading || !file}
                            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                            {uploading ? "Uploading..." : "Upload & Generate Credentials"}
                        </button>

                        {message && (
                            <div className={`mt-5 p-4 rounded-lg border text-sm ${message.toLowerCase().includes("error") ? "bg-red-50 border-red-200 text-red-700" : "bg-emerald-50 border-emerald-200 text-emerald-700"}`}>
                                <p className="font-semibold mb-0.5">Status</p>
                                <p>{message}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;