import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { 
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  BellIcon
} from '@heroicons/react/24/outline';

const TeacherDashboard: React.FC = () => {
  const studentsData = [
    { name: 'Female Students', value: 45, color: '#f97316' },
    { name: 'Male Students', value: 55, color: '#a855f7' },
    { name: 'Others', value: 5, color: '#22c55e' }
  ];

  const starStudents = [
    { name: 'Evelyn Harper', id: 'PRE43178', marks: 1185, percent: '98%', year: 2014, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150' },
    { name: 'Diana Plenty', id: 'PRE43174', marks: 1165, percent: '91%', year: 2014, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
    { name: 'John Millar', id: 'PRE43187', marks: 1175, percent: '92%', year: 2014, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' },
    { name: 'Eleanor Pena', id: 'PRE45371', marks: 1180, percent: '93%', year: 2014, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' },
    { name: 'Jenny Wilson', id: 'PRE45371', marks: 1180, percent: '93%', year: 2014, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150' },
    { name: 'Wade Warren', id: 'PRE45371', marks: 1180, percent: '93%', year: 2014, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { name: 'Devon Lane', id: 'PRE45371', marks: 1180, percent: '93%', year: 2014, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  ];

  const notifications = [
    { title: 'Emergency School Closure', time: '4:00 PM', date: '15 Aug', icon: '🚨' },
    { title: 'School Picture Day Tomorrow!', time: '4:00 PM', date: '15 Aug', icon: '📸' },
    { title: 'Opportunities for School Events', time: '4:10 PM', date: '15 Aug', icon: '🎯' },
    { title: 'School Calendar Updates', time: '4:25 PM', date: '15 Aug', icon: '📅' },
    { title: 'New Extracurricular Clubs', time: '4:40 PM', date: '15 Aug', icon: '🎭' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">All Teachers</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Income - Primary */}
        <div className="stat-card bg-gradient-to-r from-purple-600 to-purple-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Total Income</p>
              <p className="text-3xl font-bold mb-1">$68,05090</p>
              <div className="flex items-center text-sm">
                <span className="text-green-300">📈 80%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Income - Secondary */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Income</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">$68,05090</p>
              <div className="flex items-center text-sm">
                <span className="text-green-600">📈 80%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Exams */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Exams</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">250736</p>
              <div className="flex items-center text-sm">
                <span className="text-red-600">📉 80%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Exams - Secondary */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Exams</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">250736</p>
              <div className="flex items-center text-sm">
                <span className="text-red-600">📉 80%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Students Chart */}
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
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Female Students</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Male Students</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Others</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                  {notification.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {notification.title}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">{notification.time}</span>
                    <span className="text-xs text-gray-500">{notification.date}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

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
                {starStudents.slice(0, 5).map((student, index) => (
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
      </div>
    </div>
  );
};

export default TeacherDashboard;