import { useState } from "react";
import { Sidebar } from "../../components/SidebarTeacher"; // Ensure this exists
import TeacherName from "../../components/ProfileNameTeacher";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const dummyMedicalData = [
  {
    id: 1,
    name: "John Doe",
    group: "3",
    from: "2024-02-01",
    to: "2024-02-05",
    mentor: "Dr. Smith",
    proof: "medical_proof_1.pdf",
    status: "pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    group: "5",
    from: "2024-01-15",
    to: "2024-01-20",
    mentor: "Dr. Brown",
    proof: "medical_proof_2.pdf",
    status: "approved",
  },
  {
    id: 3,
    name: "Michael Lee",
    group: "2",
    from: "2024-01-10",
    to: "2024-01-14",
    mentor: "Dr. Adams",
    proof: "medical_proof_3.pdf",
    status: "pending",
  },
];

export default function MedicalLeavePage() {
  const [userName] = useState("John Doe");  
  const [activeTab, setActiveTab] = useState("pending");

  const filteredData = dummyMedicalData.filter((item) => item.status === activeTab);

  const handleApprove = (id) => {
    // Update the status to "approved" for the selected leave request
    toast.success(`Medical leave approved for ID: ${id}`);
  };

  const handleReject = (id) => {
    // Update the status to "rejected" for the selected leave request
    toast.error(`Medical leave rejected for ID: ${id}`);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-50 mb-5 ml-0 custom:ml-64">
        {/* ToastContainer */}
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

        {/* Greeting Section */}
        <div className="mx-auto mb-6 mt-20 max-w-7xl">
          <div className="pt-10 px-16 w-100 mx-4 h-52 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600">
            <h1 className="text-white text-3xl lg:text-5xl font-bold mb-2">
              Welcome back, <TeacherName/>!
            </h1>
            <p className="text-white text-sm lg:text-base">
              Smart health monitoring powered by Attendify — keeping students and teachers informed. 
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
            {/* Tabs */}
          <div className="mt-6 flex justify-evenly border-b">
            {["pending", "approved", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-lg font-semibold ${
                  activeTab === tab ? "border-b-4 border-indigo-500 text-indigo-600" : "text-gray-500"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

            {/* Cards Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div key={item.id} className="p-4 bg-white rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold">Name : {item.name}</h2>
                  <p className="text-md text-gray-600">Group: {item.group}</p>
                  <p className="text-md text-gray-600">Date: {item.from} - {item.to}</p>
                  <p className="text-md text-gray-600">Mentor: {item.mentor}</p>
                  <p className="text-md text-gray-600">
                    Proof: <a href="#" className="text-blue-500 underline">{item.proof}</a>
                  </p>
                  {activeTab === "pending" && (
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() => handleReject(item.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                      >
                        Approve
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 font-semibold">No records found...</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
