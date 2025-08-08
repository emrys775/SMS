import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { 
  CalendarIcon, 
  ClipboardDocumentListIcon, 
  ChartBarIcon,
  BellIcon,
  EyeIcon,
  PencilIcon,
  BookOpenIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  DocumentArrowDownIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  ClockIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  // Sample data
  const attendanceData = [
    { name: 'Present', value: 85, color: '#10b981' },
    { name: 'Absent', value: 15, color: '#ef4444' }
  ];

  const gradeData = [
    { subject: 'Math', grade: 92 },
    { subject: 'Science', grade: 88 },
    { subject: 'English', grade: 95 },
    { subject: 'History', grade: 87 },
    { subject: 'Art', grade: 91 }
  ];

  const timetable = [
    { time: '08:00-09:00', monday: 'Mathematics', tuesday: 'English', wednesday: 'Science', thursday: 'History', friday: 'Art' },
    { time: '09:00-10:00', monday: 'Science', tuesday: 'Mathematics', wednesday: 'English', thursday: 'Art', friday: 'History' },
    { time: '10:00-11:00', monday: 'English', tuesday: 'Science', wednesday: 'Mathematics', thursday: 'PE', friday: 'Music' },
    { time: '11:00-12:00', monday: 'History', tuesday: 'Art', wednesday: 'PE', thursday: 'Mathematics', friday: 'Science' }
  ];

  const assignments = [
    { id: 1, title: 'Math Assignment - Algebra', subject: 'Mathematics', dueDate: '2024-01-15', status: 'pending', priority: 'high' },
    { id: 2, title: 'Science Project - Solar System', subject: 'Science', dueDate: '2024-01-20', status: 'submitted', priority: 'medium' },
    { id: 3, title: 'English Essay - Shakespeare', subject: 'English', dueDate: '2024-01-18', status: 'pending', priority: 'medium' },
    { id: 4, title: 'History Report - World War II', subject: 'History', dueDate: '2024-01-25', status: 'draft', priority: 'low' }
  ];

  const notifications = [
    { id: 1, type: 'assignment', title: 'Math Assignment Due Tomorrow', time: '2 hours ago', priority: 'high' },
    { id: 2, type: 'grade', title: 'Science Test Results Available', time: '1 day ago', priority: 'medium' },
    { id: 3, type: 'event', title: 'Parent-Teacher Meeting Next Week', time: '2 days ago', priority: 'medium' },
    { id: 4, type: 'library', title: 'Book Return Reminder', time: '3 days ago', priority: 'low' }
  ];

  const aiTips = [
    "📚 Review your math notes for 15 minutes daily to improve retention",
    "🧪 Practice science experiments at home for better understanding",
    "📖 Read English literature for 30 minutes to enhance vocabulary",
    "🎨 Explore creative writing to boost your English skills"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">🧑‍🎓 Student Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setAiChatOpen(!aiChatOpen)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            <SparklesIcon className="h-5 w-5" />
            <span>AI Assistant</span>
          </button>
        </div>
      </div>

      {/* Student Profile Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
              alt="Jessica Rose"
              className="w-16 h-16 rounded-full border-4 border-white/20"
            />
            <div>
              <h2 className="text-2xl font-bold">Jessica Rose</h2>
              <p className="text-blue-100 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Grade 10-A • Student ID: STU2024001
              </p>
              <p className="text-blue-100 mt-1">
                "Striving for excellence in every subject. Learning is my passion!"
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg p-3 mb-2">
              <div className="text-sm text-blue-100">Overall GPA</div>
              <div className="text-2xl font-bold">3.8</div>
            </div>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              View Profile
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: ChartBarIcon },
            { id: 'timetable', label: 'Timetable', icon: ClockIcon },
            { id: 'assignments', label: 'Assignments', icon: ClipboardDocumentListIcon },
            { id: 'grades', label: 'Grades', icon: AcademicCapIcon },
            { id: 'materials', label: 'Materials', icon: BookOpenIcon },
            { id: 'communication', label: 'Messages', icon: ChatBubbleLeftRightIcon }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <ChartBarIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Attendance</h3>
                  <p className="text-2xl font-bold text-gray-900">85%</p>
                  <p className="text-sm text-gray-500">This Month</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ClipboardDocumentListIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Assignments</h3>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-sm text-gray-500">Pending</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BellIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                  <p className="text-sm text-gray-500">Unread</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <CurrencyDollarIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Fee Balance</h3>
                  <p className="text-2xl font-bold text-gray-900">$1,250</p>
                  <p className="text-sm text-gray-500">Due Soon</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Attendance Chart */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Overview</h3>
              <div className="relative">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">85%</div>
                    <div className="text-sm text-gray-500">Present</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Present</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">85%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Absent</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">15%</span>
                </div>
              </div>
            </div>

            {/* Recent Notifications */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
              <div className="space-y-3">
                {notifications.slice(0, 4).map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification.priority === 'high' ? 'bg-red-500' :
                      notification.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Learning Tips */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <SparklesIcon className="h-5 w-5 text-purple-600" />
                <span>AI Study Tips</span>
              </h3>
              <div className="space-y-3">
                {aiTips.map((tip, index) => (
                  <div key={index} className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'timetable' && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">📅 Weekly Timetable</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Monday</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Tuesday</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Wednesday</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Thursday</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Friday</th>
                </tr>
              </thead>
              <tbody>
                {timetable.map((slot, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">{slot.time}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {slot.monday}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {slot.tuesday}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {slot.wednesday}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                        {slot.thursday}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                        {slot.friday}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'assignments' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">📝 Assignments & Homework</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Submit Assignment
            </button>
          </div>
          
          <div className="grid gap-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold text-gray-900">{assignment.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        assignment.priority === 'high' ? 'bg-red-100 text-red-800' :
                        assignment.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {assignment.priority} priority
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        assignment.status === 'submitted' ? 'bg-green-100 text-green-800' :
                        assignment.status === 'pending' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {assignment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{assignment.subject}</p>
                    <p className="text-sm text-gray-500 mt-1">Due: {assignment.dueDate}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600">
                      <DocumentArrowDownIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600">
                      <PaperAirplaneIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'grades' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">📊 Academic Performance</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Subject Grades</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gradeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="grade" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="card p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Grade Summary</h4>
              <div className="space-y-4">
                {gradeData.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{subject.subject}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${subject.grade}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold text-gray-900 w-12">{subject.grade}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'materials' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">📚 Study Materials & E-Library</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Mathematics', 'Science', 'English', 'History', 'Art', 'Physics'].map((subject) => (
              <div key={subject} className="card p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <BookOpenIcon className="h-8 w-8 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">{subject}</h4>
                </div>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 hover:bg-gray-50 rounded flex items-center space-x-2">
                    <DocumentArrowDownIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">Lesson Notes</span>
                  </button>
                  <button className="w-full text-left p-2 hover:bg-gray-50 rounded flex items-center space-x-2">
                    <DocumentArrowDownIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">Practice Worksheets</span>
                  </button>
                  <button className="w-full text-left p-2 hover:bg-gray-50 rounded flex items-center space-x-2">
                    <DocumentArrowDownIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">Reference Materials</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'communication' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">💬 Messages & Communication</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 card p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Contacts</h4>
              <div className="space-y-3">
                {['Ms. Johnson (Math Teacher)', 'Mr. Smith (Science Teacher)', 'Mrs. Davis (Counselor)', 'Dr. Wilson (Principal)'].map((contact, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{contact.charAt(0)}</span>
                    </div>
                    <span className="text-sm text-gray-700">{contact}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-2 card p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Recent Messages</h4>
              <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">MJ</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-700">Don't forget about tomorrow's math quiz on algebra!</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Ms. Johnson • 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex space-x-3 justify-end">
                  <div className="flex-1 max-w-xs">
                    <div className="bg-blue-600 text-white rounded-lg p-3">
                      <p className="text-sm">Thank you for the reminder! I've been studying hard.</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-right">You • 1 hour ago</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Chat Modal */}
      {aiChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <SparklesIcon className="h-5 w-5 text-purple-600" />
                <span>AI Learning Assistant</span>
              </h3>
              <button 
                onClick={() => setAiChatOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-sm text-gray-700">👋 Hi Jessica! I'm your AI learning assistant. How can I help you study today?</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask me anything about your studies..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;