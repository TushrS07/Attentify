"use client";

import { useState } from "react";
import { SidebarStudent } from "../../components/SidebarStudent";
import StudentName from "../../components/ProfileNameStudent";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Dummy subject-wise attendance data
const subjects = [
  { name: "Math", total: 40, attended: 34 },
  { name: "Science", total: 38, attended: 36 },
  { name: "English", total: 42, attended: 30 },
  { name: "History", total: 35, attended: 33 },
  { name: "Computer", total: 40, attended: 39 },
  { name: "Physics", total: 41, attended: 31 },
  { name: "Chemistry", total: 37, attended: 34 },
  { name: "Biology", total: 36, attended: 30 },
];

const COLORS = ["#22c55e", "#ef4444"];

export default function StudentAttendance() {
  const [userName] = useState("John");
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? subjects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === subjects.length - 1 ? 0 : prev + 1));
  };

  const currentSubject = subjects[currentIndex];
  const pieData = [
    { name: "Present", value: currentSubject.attended },
    { name: "Absent", value: currentSubject.total - currentSubject.attended },
  ];
  const barData = [
    {
      name: currentSubject.name,
      Total: currentSubject.total,
      Attended: currentSubject.attended,
    },
  ];

  return (
    <div className="flex">
      <SidebarStudent />
      <div className="flex-1 min-h-screen bg-gray-50 mb-5 ml-0 custom:ml-64">
        {/* Header */}
        <div className="mx-auto mb-6 mt-20 max-w-7xl">
          <div className="pt-10 px-6 md:px-16 mx-4 h-52 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600">
            <h1 className="text-white text-3xl lg:text-5xl font-bold mb-2">
              Welcome, <StudentName/>!
            </h1>
            <p className="text-white text-sm lg:text-base">
              Here's your attendance summary for this semester.
            </p>
          </div>
        </div>

        {/* Attendance Carousel */}
        <div className="max-w-7xl mx-auto px-4 pb-10 mt-10">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm phone:text-md"
            >
              Previous
            </button>
            <h2 className="text-sm phone:text-xl text-bold font-bold">
              {currentSubject.name} Attendance
            </h2>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm phone:text-md"
            >
              Next
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {currentSubject.name} - Class Stats
              </h3>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="Total" fill="#6366f1" />
                    <Bar dataKey="Attended" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {currentSubject.name} - Attendance %
              </h3>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {pieData.map((entry, i) => (
                        <Cell
                          key={`cell-${i}`}
                          fill={COLORS[i % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
