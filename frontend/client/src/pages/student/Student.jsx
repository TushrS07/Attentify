"use client";
import { SidebarStudent } from "../../components/SidebarStudent";
import StudentName from "../../components/ProfileNameStudent";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line
} from "recharts";
import { TrendingUp, BookOpen, ClipboardList } from "lucide-react";

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

const statCards = [
  {
    label: "Overall Score",
    value: "89%",
    sub: "+2.4% from last term",
    icon: TrendingUp,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    subColor: "text-emerald-600",
  },
  {
    label: "Attendance Rate",
    value: "93%",
    sub: "On track this semester",
    icon: ClipboardList,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    subColor: "text-blue-600",
  },
  {
    label: "Active Credits",
    value: "24",
    sub: "3 Upcoming Assignments",
    icon: BookOpen,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    subColor: "text-violet-600",
  },
];

export default function Student() {
  return (
    <div className="flex">
      <SidebarStudent />
      <div className="flex-1 min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
          {/* Welcome */}
          <div className="mb-8 border-b border-slate-200 pb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight font-serif">
              Welcome back, <StudentName />
            </h1>
            <p className="text-slate-500 mt-1.5 text-sm">
              Here's your academic snapshot and attendance summary.
            </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.label} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{card.label}</p>
                      <p className="mt-1.5 text-3xl font-bold text-slate-900">{card.value}</p>
                    </div>
                    <div className={`${card.iconBg} p-2.5 rounded-lg`}>
                      <Icon size={18} className={card.iconColor} />
                    </div>
                  </div>
                  <p className={`text-xs font-medium ${card.subColor}`}>{card.sub}</p>
                </div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-base font-bold text-slate-800 mb-5">Subject Performance</h2>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformance} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={{ stroke: "#cbd5e1" }} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: "#f1f5f9" }} contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)", fontSize: "12px" }} />
                    <Bar dataKey="score" fill="#1e40af" radius={[4, 4, 0, 0]} barSize={36} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-base font-bold text-slate-800 mb-5">Attendance This Week</h2>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={{ stroke: "#cbd5e1" }} tickLine={false} />
                    <YAxis domain={[0, 1]} tickFormatter={(t) => t === 1 ? "P" : "A"} tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)", fontSize: "12px" }} />
                    <Line type="monotone" dataKey="attendance" stroke="#2563eb" strokeWidth={2.5}
                      dot={{ r: 4, fill: "#2563eb", strokeWidth: 2, stroke: "#ffffff" }}
                      activeDot={{ r: 5 }} />
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
