import { Sidebar } from "../../components/SidebarTeacher";
import TeacherName from "../../components/ProfileNameTeacher";
import {
  PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell,
} from "recharts";
import { Users, BarChart2, BookOpen } from "lucide-react";

const attendanceData = [
  { name: "Present", value: 45 },
  { name: "Absent", value: 15 },
  { name: "Leave", value: 20 },
];

const classPerformanceData = [
  { name: "Class A", students: 40, attendance: 38, performance: 85 },
  { name: "Class B", students: 35, attendance: 30, performance: 76 },
  { name: "Class C", students: 45, attendance: 40, performance: 90 },
  { name: "Class D", students: 30, attendance: 25, performance: 70 },
];

const statCards = [
  { label: "Total Students", value: "1,234", sub: "+12% from last month", icon: Users, bg: "bg-blue-100", ic: "text-blue-600", sc: "text-emerald-600" },
  { label: "Average Attendance", value: "87.5%", sub: "+3% from last week", icon: BarChart2, bg: "bg-emerald-100", ic: "text-emerald-600", sc: "text-emerald-600" },
  { label: "Active Classes", value: "24", sub: "All systems operational", icon: BookOpen, bg: "bg-violet-100", ic: "text-violet-600", sc: "text-blue-600" },
];

export default function Teacher() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
          {/* Greeting */}
          <div className="mb-8 border-b border-slate-200 pb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight font-serif mb-1.5">
              Manage Attendance Seamlessly
            </h1>
            <p className="text-slate-500 text-sm">
              Smart Tools for Smarter Classrooms. Welcome back, <TeacherName />.
            </p>
          </div>

          {/* Stats */}
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
                    <div className={`${card.bg} p-2.5 rounded-lg`}>
                      <Icon size={18} className={card.ic} />
                    </div>
                  </div>
                  <p className={`text-xs font-medium ${card.sc}`}>{card.sub}</p>
                </div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-base font-bold text-slate-800 mb-5">Attendance Distribution</h2>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={attendanceData} cx="50%" cy="50%" innerRadius={70} outerRadius={100}
                      paddingAngle={2} dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={{ stroke: "#94a3b8", strokeWidth: 1 }}>
                      {attendanceData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={["#1e3a8a", "#64748b", "#94a3b8"][index % 3]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)", fontSize: "12px" }} />
                    <Legend verticalAlign="bottom" height={32} wrapperStyle={{ fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-base font-bold text-slate-800 mb-5">Class Performance Overview</h2>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={classPerformanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={{ stroke: "#cbd5e1" }} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: "#f1f5f9" }} contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)", fontSize: "12px" }} />
                    <Legend verticalAlign="bottom" height={32} wrapperStyle={{ fontSize: "12px" }} />
                    <Bar dataKey="performance" fill="#1e40af" name="Grade (%)" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="attendance" fill="#60a5fa" name="Attendance (%)" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
