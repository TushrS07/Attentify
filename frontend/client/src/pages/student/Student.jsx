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
    value: "A+",
    sub: "+2.4% from last term",
    icon: TrendingUp,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    subColor: "text-emerald-600",
  },
  {
    label: "Attendance Rate",
    value: "91.3%",
    sub: "On track this semester",
    icon: ClipboardList,
    iconBg: "bg-[#f3f0ff]",
    iconColor: "text-[#3b1e8a]",
    subColor: "text-[#3b1e8a]",
  },
  {
    label: "Assignments",
    value: "24",
    sub: "3 Upcoming Assignments",
    icon: BookOpen,
    iconBg: "bg-[#f3f0ff]",
    iconColor: "text-[#6d4ed7]",
    subColor: "text-[#6d4ed7]",
  },
];

export default function Student() {
  return (
    <div className="flex">
      <SidebarStudent />
      <div className="flex-1 min-h-screen bg-[#f7f8fc] pt-14">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1a1535] tracking-tight">
              Welcome back, <span className="text-[#3b1e8a]"><StudentName /></span>!
            </h1>
            <p className="text-[#9b93be] mt-1.5 text-sm">
              Here's your academic snapshot and attendance summary.
            </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.label} className="bg-white p-5 rounded-xl border border-[#e8e6f0] shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-semibold text-[#9b93be] uppercase tracking-wider">{card.label}</p>
                      <p className="mt-1.5 text-3xl font-bold text-[#1a1535]">{card.value}</p>
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
            <div className="bg-white p-6 rounded-xl border border-[#e8e6f0] shadow-sm">
              <h2 className="text-base font-bold text-[#1a1535] mb-5">Subject Performance</h2>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformance} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8e6f0" />
                    <XAxis dataKey="subject" tick={{ fill: "#9b93be", fontSize: 12 }} axisLine={{ stroke: "#e8e6f0" }} tickLine={false} />
                    <YAxis tick={{ fill: "#9b93be", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: "#f7f5ff" }} contentStyle={{ borderRadius: "8px", border: "1px solid #e8e6f0", fontSize: "12px", fontFamily: "Inter, sans-serif" }} />
                    <Bar dataKey="score" fill="#3b1e8a" radius={[4, 4, 0, 0]} barSize={36} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e8e6f0] shadow-sm">
              <h2 className="text-base font-bold text-[#1a1535] mb-5">Weekly Attendance</h2>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8e6f0" />
                    <XAxis dataKey="date" tick={{ fill: "#9b93be", fontSize: 12 }} axisLine={{ stroke: "#e8e6f0" }} tickLine={false} />
                    <YAxis domain={[0, 1]} tickFormatter={(t) => t === 1 ? "P" : "A"} tick={{ fill: "#9b93be", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e8e6f0", fontSize: "12px", fontFamily: "Inter, sans-serif" }} />
                    <Line type="monotone" dataKey="attendance" stroke="#3b1e8a" strokeWidth={2.5}
                      dot={{ r: 4, fill: "#3b1e8a", strokeWidth: 2, stroke: "#ffffff" }}
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
