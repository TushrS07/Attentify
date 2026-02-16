"use client";
import { useState } from "react";
import { SidebarStudent } from "../components/SidebarStudent";
import StudentName from "../components/ProfileName";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

// Sample Data
const subjectPerformance = [
  { subject: "Math", score: 88 },
  { subject: "Science", score: 92 },
  { subject: "English", score: 85 },
  { subject: "History", score: 78 },
  { subject: "Art", score: 95 },
];

const attendanceTrend = [
  { date: "Mon", attendance: 1 },
  { date: "Tue", attendance: 1 },
  { date: "Wed", attendance: 0 },
  { date: "Thu", attendance: 1 },
  { date: "Fri", attendance: 1 },
];

export default function Student() {
  const [userName] = useState("Emily");

  return (
    <div className="flex">
      <SidebarStudent />
      <div className="flex-1 min-h-screen bg-gray-50 mb-5">
        {/* Welcome Section */}
        <div className="mx-auto mb-6 mt-20 max-w-7xl">
          <div className="pt-10 px-6 md:px-16 mx-4 h-52 rounded-lg bg-gradient-to-r from-green-400 via-blue-500 to-indigo-500">
            <h1 className="text-white text-3xl lg:text-5xl font-bold mb-2">
              Welcome, <StudentName/>!
            </h1>
            <p className="text-white text-sm lg:text-base">
              Here's your academic snapshot and attendance summary.
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subject Performance */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Subject Performance</h2>
              <div className="h-[300px] p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" fill="#4f46e5" name="Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Attendance Trend */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Attendance This Week</h2>
              <div className="h-[300px] p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 1]} tickFormatter={(tick) => (tick === 1 ? "Present" : "Absent")} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ r: 6 }}
                      name="Attendance"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Overall Score</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">89%</p>
              <p className="mt-2 text-sm text-green-600">↑ Great progress!</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Attendance Rate</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">93%</p>
              <p className="mt-2 text-sm text-blue-600">↑ Keep it up</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Upcoming Assignments</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">3</p>
              <p className="mt-2 text-sm text-yellow-600">→ Due this week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
