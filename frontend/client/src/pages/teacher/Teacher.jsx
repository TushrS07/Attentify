import { Sidebar } from "../../components/SidebarTeacher";
import TeacherName from "../../components/ProfileNameTeacher";
import {
  PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell,
} from "recharts";
import { Users, BarChart2, BookOpen } from "lucide-react";

const attendanceData = [
  { name: "Present", value: 56 },
  { name: "Absent", value: 19 },
  { name: "Leave", value: 25 },
];

const classPerformanceData = [
  { name: "Class A", students: 40, attendance: 38, performance: 85 },
  { name: "Class B", students: 35, attendance: 30, performance: 76 },
  { name: "Class C", students: 45, attendance: 40, performance: 90 },
  { name: "Class D", students: 30, attendance: 25, performance: 70 },
];

const COLORS = ["#3b1e8a", "#9b93be", "#d5cbfe"];

const statCards = [
  { label: "Total Students", value: "1,234", sub: "+12% from last month", icon: Users,
    iconBg: "bg-[#f3f0ff]", iconColor: "text-[#3b1e8a]", subColor: "text-emerald-600" },
  { label: "Average Attendance", value: "87.5%", sub: "+3% from last week", icon: BarChart2,
    iconBg: "bg-emerald-50", iconColor: "text-emerald-600", subColor: "text-emerald-600" },
  { label: "Active Classes", value: "24", sub: "All systems operational", icon: BookOpen,
    iconBg: "bg-[#f3f0ff]", iconColor: "text-[#6d4ed7]", subColor: "text-[#3b1e8a]" },
];

export default function Teacher() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-[#f7f8fc]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1a1535] tracking-tight mb-1.5">
              Manage Attendance Seamlessly
            </h1>
            <p className="text-[#9b93be] text-sm">
              Welcome back, <span className="text-[#3b1e8a] font-semibold"><TeacherName /></span>
            </p>
          </div>

          {/* Stats */}
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
              <h2 className="text-base font-bold text-[#1a1535] mb-5">Attendance Distribution</h2>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={attendanceData} cx="50%" cy="50%" innerRadius={70} outerRadius={100}
                      paddingAngle={2} dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={{ stroke: "#9b93be", strokeWidth: 1 }}>
                      {attendanceData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e8e6f0", fontSize: "12px", fontFamily: "Inter, sans-serif" }} />
                    <Legend verticalAlign="bottom" height={32} wrapperStyle={{ fontSize: "12px", fontFamily: "Inter, sans-serif" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e8e6f0] shadow-sm">
              <h2 className="text-base font-bold text-[#1a1535] mb-5">Class Performance Overview</h2>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={classPerformanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8e6f0" />
                    <XAxis dataKey="name" tick={{ fill: "#9b93be", fontSize: 12 }} axisLine={{ stroke: "#e8e6f0" }} tickLine={false} />
                    <YAxis tick={{ fill: "#9b93be", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: "#f7f5ff" }} contentStyle={{ borderRadius: "8px", border: "1px solid #e8e6f0", fontSize: "12px", fontFamily: "Inter, sans-serif" }} />
                    <Legend verticalAlign="bottom" height={32} wrapperStyle={{ fontSize: "12px", fontFamily: "Inter, sans-serif" }} />
                    <Bar dataKey="performance" fill="#3b1e8a" name="Grade (%)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="attendance" fill="#9b93be" name="Attendance (%)" radius={[4, 4, 0, 0]} />
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
