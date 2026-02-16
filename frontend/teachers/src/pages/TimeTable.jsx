"use client";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";

function TimeTable() {
  const [userName] = useState("John");
  const [timeTables, setTimeTables] = useState([
    { id: 1, selectedGroup: "", uploadedFiles: [] },
  ]);
  const [savedTimeTables, setSavedTimeTables] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const groups = Array.from({ length: 32 }, (_, i) => i + 1);

  const handleFileUpload = (event, id) => {
    const files = Array.from(event.target.files);
    setTimeTables((prev) =>
      prev.map((table) =>
        table.id === id ? { ...table, uploadedFiles: files } : table
      )
    );
  };

  const handlePreview = (file) => {
    setPreviewFile(URL.createObjectURL(file));
    setIsPreviewOpen(true);
  };

  const handleSaveTimeTable = (id) => {
    const table = timeTables.find((t) => t.id === id);
    if (table.selectedGroup && table.uploadedFiles.length > 0) {
      setSavedTimeTables((prev) => [...prev, { ...table }]);
      setTimeTables([{ id: 1, selectedGroup: "", uploadedFiles: [] }]);
    } else {
      alert("Please select a group and upload at least one file.");
    }
  };

  const handleDeleteTimeTable = (index) => {
    setSavedTimeTables((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditTimeTable = (index) => {
    setEditingTable(index);
    setTimeTables([{ ...savedTimeTables[index] }]);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-50  mb-5">
        {/* Greeting Section */}
        <div className="mx-auto mb-6 mt-20 max-w-7xl">
          <div className="pt-10 px-16 w-100 mx-4 h-52 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600">
            <h1 className="text-white text-3xl lg:text-5xl font-bold mb-2">
              Welcome back, {userName}!
            </h1>
            <p className="text-white text-sm lg:text-base">
              Manage your classes below
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          {timeTables.map((table) => (
            <div key={table.id} className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Group</label>
                  <select
                    value={table.selectedGroup}
                    onChange={(e) =>
                      setTimeTables([{ ...table, selectedGroup: e.target.value }])
                    }
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="" disabled>
                      Select Group
                    </option>
                    {groups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload Document</label>
                  <input
                    key={table.id + table.uploadedFiles.length} // Unique key to force re-render
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(e, table.id)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button
                  onClick={() => handleSaveTimeTable(table.id)}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 mt-6"
                >
                  Add Time Table
                </button>
              </div>

              {table.uploadedFiles.length > 0 && (
                <ul className="mt-4">
                  {table.uploadedFiles.map((file, index) => (
                    <li key={index} className="flex justify-between bg-gray-100 p-2 rounded-md mb-2">
                      <span className="text-gray-800">{file.name}</span>
                      <button className="text-indigo-600 hover:underline" onClick={() => handlePreview(file)}>
                        Preview
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {savedTimeTables.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
              <h2 className="text-lg font-semibold mb-4">Saved Time Tables</h2>
              <ul>
                {savedTimeTables.map((table, index) => (
                  <li
                    key={index}
                    className="p-2 bg-gray-100 rounded-md mb-2 flex justify-between cursor-pointer hover:bg-gray-200"
                    onClick={() => handleEditTimeTable(index)}
                  >
                    <strong>Group {table.selectedGroup}:</strong>
                    <span>{table.uploadedFiles.length} document(s) uploaded</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTimeTable(index);
                      }}
                      className="ml-4 bg-red-600 text-white py-1 px-3 rounded-md shadow hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {isPreviewOpen && previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
            <h3 className="text-lg font-semibold mb-4">Document Preview</h3>
            <iframe src={previewFile} className="w-full h-[600px] border rounded-md"></iframe>
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="mt-4 w-full bg-red-600 text-white py-2 rounded-md shadow hover:bg-red-700"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeTable;
