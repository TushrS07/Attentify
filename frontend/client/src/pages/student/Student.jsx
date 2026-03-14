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
      <div className="flex-1 min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-8 py-10">
          {/* Welcome Section */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Welcome back, <StudentName />
            </h1>
            <p className="text-slate-500 mt-2">
              Here's your academic snapshot and attendance summary.
            </p>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Overall Score</h3>
              <p className="mt-2 text-3xl font-bold text-slate-900">89%</p>
              <p className="mt-2 text-sm text-emerald-600 font-medium">+2.4% from last term</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Attendance Rate</h3>
              <p className="mt-2 text-3xl font-bold text-slate-900">93%</p>
              <p className="mt-2 text-sm text-emerald-600 font-medium">On track</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Active Credits</h3>
              <p className="mt-2 text-3xl font-bold text-slate-900">24</p>
              <p className="mt-2 text-sm text-blue-600 font-medium">3 Upcoming Assignments</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subject Performance */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-6">Subject Performance</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="subject" tick={{ fill: "#64748b" }} axisLine={{ stroke: "#cbd5e1" }} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: "#f1f5f9" }} contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" }} />
                    <Bar dataKey="score" fill="#1e40af" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Attendance Trend */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-6">Attendance This Week</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{ fill: "#64748b" }} axisLine={{ stroke: "#cbd5e1" }} tickLine={false} />
                    <YAxis domain={[0, 1]} tickFormatter={(tick) => (tick === 1 ? "Present" : "Absent")} tick={{ fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" }} />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#2563eb", strokeWidth: 2, stroke: "#ffffff" }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
