"use client";
import { Sidebar } from "../components/Sidebar";
import TeacherName from "../components/ProfileName";
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
      <div className="flex-1 min-h-screen bg-gray-50 mb-5">
        {/* Greeting Section */}
        <div className="mx-auto mb-6 mt-20 max-w-7xl">
          <div className="pt-10 px-16 w-100 mx-4 h-52 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600">
            <h1 className="text-white text-3xl lg:text-5xl font-bold mb-2">
              Welcome back, <TeacherName/>!
            </h1>
            <p className="text-white text-sm lg:text-base">
            Manage Attendance Seamlessly — Smart Tools for Smarter Classrooms.
            </p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance Distribution */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">
                Attendance Distribution
              </h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Class Performance */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Class Performance</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={classPerformanceData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="performance"
                      fill="#3b82f6"
                      name="Performance %"
                    />
                    <Bar
                      dataKey="attendance"
                      fill="#f97316"
                      name="Attendance"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Additional Stats or Information can be added here */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">
                Total Students
              </h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">1,234</p>
              <p className="mt-2 text-sm text-green-600">
                ↑ 12% from last month
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">
                Average Attendance
              </h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">87%</p>
              <p className="mt-2 text-sm text-green-600">↑ 3% from last week</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">
                Active Classes
              </h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">24</p>
              <p className="mt-2 text-sm text-blue-600">→ No change</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
