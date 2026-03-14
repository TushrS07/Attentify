import { Sidebar } from "../../components/SidebarTeacher";
import TeacherName from "../../components/ProfileNameTeacher";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Dummy data for the charts
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

const COLORS = ["#3b82f6", "#f97316", "#64748b"];

export default function Teacher() {
  // const [userName] = useState(teacherName); // Assuming teacherName is a string

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-8 py-10">
          {/* Greeting Section */}
          <div className="mb-10 flex justify-between items-end border-b border-slate-200 pb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-serif mb-2">
                Manage Attendance Seamlessly
              </h1>
              <p className="text-slate-500 text-lg">
                Smart Tools for Smarter Classrooms. Welcome back, <TeacherName/>.
              </p>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Students</h3>
              <p className="mt-2 text-3xl font-bold text-slate-900">1,234</p>
              <p className="mt-2 text-sm text-emerald-600 font-medium">+12% from last month</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Average Attendance</h3>
              <p className="mt-2 text-3xl font-bold text-slate-900">87.5%</p>
              <p className="mt-2 text-sm text-emerald-600 font-medium">+3% from last week</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Active Classes</h3>
              <p className="mt-2 text-3xl font-bold text-slate-900">24</p>
              <p className="mt-2 text-sm text-blue-600 font-medium">All systems operational</p>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance Distribution */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-6">Attendance Distribution</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={["#1e3a8a", "#64748b", "#94a3b8"][index % 3]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" }} />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Class Performance */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-6">Class Performance Overview</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={classPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fill: "#64748b" }} axisLine={{ stroke: "#cbd5e1" }} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: "#f1f5f9" }} contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" }} />
                    <Legend verticalAlign="bottom" height={36} />
                    <Bar dataKey="performance" fill="#1e40af" name="Grade (%)" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="attendance" fill="#3b82f6" name="Attendance (%)" radius={[2, 2, 0, 0]} />
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
