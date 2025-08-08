import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  UserGroupIcon,
  AcademicCapIcon,
  UsersIcon,
  CurrencyDollarIcon,
  BellIcon
} from '@heroicons/react/24/outline';

const AdminDashboard: React.FC = () => {
  const examResultsData = [
    { month: 'Jan', teacher: 60, student: 45 },
    { month: 'Feb', teacher: 45, student: 55 },
    { month: 'Mar', teacher: 35, student: 60 },
    { month: 'Apr', teacher: 80, student: 65 },
    { month: 'May', teacher: 110, student: 85 },
    { month: 'Jun', teacher: 85, student: 70 },
    { month: 'Jul', teacher: 75, student: 80 },
    { month: 'Aug', teacher: 35, student: 45 },
    { month: 'Sep', teacher: 85, student: 75 },
    { month: 'Oct', teacher: 110, student: 95 },
    { month: 'Nov', teacher: 65, student: 55 },
    { month: 'Dec', teacher: 85, student: 75 },
  ];

  const studentsData = [
    { name: 'Male', value: 60, color: '#a855f7' },
    { name: 'Female', value: 40, color: '#f97316' }
  ];

  const starStudents = [
    { name: 'Evelyn Harper', id: 'PRE43178', marks: 1185, percent: '98%', year: 2014, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150' },
    { name: 'Diana Plenty', id: 'PRE43174', marks: 1165, percent: '91%', year: 2014, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
    { name: 'John Millar', id: 'PRE43187', marks: 1175, percent: '92%', year: 2014, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' },
  ];

  const examResults = [
    { title: 'New Teacher', description: 'It is a long established readable...', time: 'Just now', icon: '👨‍🏫', color: 'bg-blue-100' },
    { title: 'Fees Structure', description: 'It is a long established readable...', time: 'today', icon: '💰', color: 'bg-pink-100' },
    { title: 'New Course', description: 'It is a long established readable...', time: '24 Sep 2023', icon: '📚', color: 'bg-green-100' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Students */}
        <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium mb-1">Students</p>
              <p className="text-3xl font-bold text-purple-900">15.00K</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <UserGroupIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Teachers */}
        <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium mb-1">Teachers</p>
              <p className="text-3xl font-bold text-blue-900">2.00K</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <AcademicCapIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Parents */}
        <div className="card p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium mb-1">Parents</p>
              <p className="text-3xl font-bold text-orange-900">5.6K</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <UsersIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Earnings */}
        <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium mb-1">Earnings</p>
              <p className="text-3xl font-bold text-green-900">$19.3K</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CurrencyDollarIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exam Results Chart */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">All Exam Result</h3>
              <p className="text-sm text-gray-500">Students & Teacher</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Teacher</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Student</span>
              </div>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={examResultsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <Bar dataKey="teacher" fill="#a855f7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="student" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Students Pie Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Students</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
          
          <div className="relative">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={studentsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {studentsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">15000</div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Male</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Female</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Star Students */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Star Students</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                  <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Percent</th>
                  <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {starStudents.map((student, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-gray-900">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-gray-900">{student.id}</td>
                    <td className="py-3 text-sm text-gray-900">{student.marks}</td>
                    <td className="py-3 text-sm text-gray-900">{student.percent}</td>
                    <td className="py-3 text-sm text-gray-900">{student.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* All Exam Results */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">All Exam Results</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            {examResults.map((result, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-10 h-10 ${result.color} rounded-lg flex items-center justify-center text-lg`}>
                  {result.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {result.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {result.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{result.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;