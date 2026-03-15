"use client";

import { useState } from "react";
import { SidebarStudent } from "../../components/SidebarStudent";
import { Upload } from "lucide-react"; // Icon for upload
import StudentName from "../../components/ProfileNameStudent";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const initialLeaves = [
  {
    id: 1,
    name: "John Doe",
    group: "3",
    from: "2024-02-01",
    to: "2024-02-05",
    mentor: "Dr. Smith",
    proof: { name: "medical_proof_1.pdf" },
    status: "approved",
  },
  {
    id: 2,
    name: "John Doe",
    group: "3",
    from: "2024-01-10",
    to: "2024-01-14",
    mentor: "Dr. Adams",
    proof: { name: "medical_proof_2.pdf" },
    status: "rejected",
  },
];

export default function StudentMedicalPage() {
  const [userName] = useState("John Doe");
  const [activeTab, setActiveTab] = useState("apply");
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    mentor: "",
    proof: null,
  });
  const [leaveApplications, setLeaveApplications] = useState(initialLeaves);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if all fields are filled
    if (!formData.from || !formData.to || !formData.mentor || !formData.proof) {
      toast.error("Please fill in all fields before submitting!");
      return;
    }

    // Validation: Check if From Date is greater than To Date
    if (new Date(formData.from) > new Date(formData.to)) {
      toast.error("From Date cannot be greater than To Date!");
      return;
    }

    const newLeave = {
      id: leaveApplications.length + 1,
      name: userName,
      group: "3",
      from: formData.from,
      to: formData.to,
      mentor: formData.mentor,
      proof: formData.proof,
      status: "pending",
    };
    setLeaveApplications([...leaveApplications, newLeave]);
    setFormData({ from: "", to: "", mentor: "", proof: null });
    toast.success("Medical leave applied successfully.");
  };

  const filteredLeaves = leaveApplications.filter(
    (leave) => leave.status === activeTab || activeTab === "applied"
  );

  return (
    <div className="flex">
      <SidebarStudent />
      <div className="flex-1 min-h-screen bg-gray-50 mb-5">
        {/* ToastContainer for displaying notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <div className="mx-auto mb-6 mt-20 max-w-7xl">
          <div className="pt-10 px-6 md:px-16 mx-4 h-52 rounded-lg bg-gradient-to-r from-green-400 via-blue-500 to-indigo-500">
            <h1 className="text-white text-3xl lg:text-5xl font-bold mb-2">
              Welcome, <StudentName/>!
            </h1>
            <p className="text-white text-sm lg:text-base">
              Apply for medical leave and track your application status here.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="mt-6 flex justify-evenly border-b">
            {["apply", "applied", "approved", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-lg font-semibold transition duration-200 ease-in-out ${
                  activeTab === tab
                    ? "border-b-4 border-indigo-500 text-indigo-600"
                    : "text-gray-500"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "apply" && (
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow-md mt-6 mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">From Date</label>
                  <input
                    type="date"
                    required
                    value={formData.from}
                    onChange={(e) =>
                      setFormData({ ...formData, from: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">To Date</label>
                  <input
                    type="date"
                    required
                    value={formData.to}
                    onChange={(e) =>
                      setFormData({ ...formData, to: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Mentor Name</label>
                  <input
                    type="text"
                    required
                    value={formData.mentor}
                    onChange={(e) =>
                      setFormData({ ...formData, mentor: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Upload Medical Proof</label>
                  <label className="flex items-center gap-3 px-3 py-2 border rounded cursor-pointer hover:bg-gray-100 transition">
                    <Upload className="w-5 h-5 text-indigo-500" />
                    <span className="text-gray-700 text-sm">
                      {formData.proof ? formData.proof.name : "Upload File"}
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                      className="hidden"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          proof: e.target.files[0],
                        })
                      }
                    />
                  </label>

                </div>
              </div>
              <div className="mt-4 text-right">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                >
                  Submit Leave
                </button>
              </div>
            </form>
          )}

          {(activeTab === "applied" || activeTab === "approved" || activeTab === "rejected") && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLeaves.length > 0 ? (
                filteredLeaves.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white rounded-lg shadow-md"
                  >
                    <h2 className="text-lg font-semibold">Name: {item.name}</h2>
                    <p className="text-sm text-gray-600">Group: {item.group}</p>
                    <p className="text-sm text-gray-600">
                      Date: {item.from} - {item.to}
                    </p>
                    <p className="text-sm text-gray-600">Mentor: {item.mentor}</p>
                    <p className="text-sm text-gray-600">
                      Proof: {item.proof?.name || "Uploaded"}
                    </p>
                    <p className={`text-sm ${item.status === "approved" ? "text-green-500" : "text-red-500"}`}>
                      Status: {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 font-semibold">
                  No records found...
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
