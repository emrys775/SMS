import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
  CalendarIcon, 
  ClipboardDocumentListIcon, 
  ChartBarIcon,
  BellIcon,
  EyeIcon,
  PencilIcon,
  BookOpenIcon,
  ClockIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  DocumentArrowDownIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  TrashIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  DocumentTextIcon,
  StarIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  classes: string[];
  avatar: string;
  experience: number;
  qualification: string;
  phone: string;
  status: 'active' | 'inactive' | 'on-leave';
  joinDate: string;
  performance: number;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  class: string;
  dueDate: string;
  submissions: number;
  totalStudents: number;
  status: 'active' | 'completed' | 'overdue';
}

interface AttendanceRecord {
  date: string;
  class: string;
  present: number;
  absent: number;
  total: number;
}

const TeacherManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const [teacherFormData, setTeacherFormData] = useState({
    profileImage: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    email: '',
    phone: '',
    dob: '',
    bloodGroup: '',
    qualification: '',
    address: {
      label: '',
      street: '',
      city: '',
      region: '',
      zipCode: '',
      country: ''
    },
    subjects: [],
    classes: [],
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      alternatePhone: '',
      address: ''
    },
    accountDetails: {
      email: '',
      username: '',
      referenceId: '',
      password: ''
    }
  });

  // Auto-generate username from full name (6 letters)
  const generateUsername = (firstName: string, lastName: string) => {
    const combined = (firstName + lastName).toLowerCase().replace(/[^a-z]/g, '');
    return combined.substring(0, 6).padEnd(6, 'x');
  };

  // Auto-generate reference ID (8 digits with current year)
  const generateReferenceId = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${year}${randomNum}`;
  };

  // Auto-generate password (6 alphanumeric)
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 6; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  // Update form data and auto-generate account details
  const updateFormData = (field: string, value: any) => {
    const newData = { ...teacherFormData, [field]: value };
    
    // Auto-generate account details when name changes
    if (field === 'firstName' || field === 'lastName') {
      const username = generateUsername(newData.firstName, newData.lastName);
      newData.accountDetails = {
        ...newData.accountDetails,
        username,
        referenceId: newData.accountDetails.referenceId || generateReferenceId(),
        password: newData.accountDetails.password || generatePassword()
      };
    }
    
    setTeacherFormData(newData);
  };
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);

  // Sample teacher data
  const teachers: Teacher[] = [
    {
      id: 'TCH001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@school.com',
      subject: 'Mathematics',
      classes: ['10-A', '11-B', '12-C'],
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      experience: 8,
      qualification: 'PhD in Mathematics',
      phone: '+1234567890',
      status: 'active',
      joinDate: '2020-09-01',
      performance: 92
    },
    {
      id: 'TCH002',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@school.com',
      subject: 'Physics',
      classes: ['11-A', '12-A', '12-B'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      experience: 12,
      qualification: 'MSc in Physics',
      phone: '+1234567891',
      status: 'active',
      joinDate: '2018-08-15',
      performance: 95
    },
    {
      id: 'TCH003',
      name: 'Ms. Emily Rodriguez',
      email: 'emily.rodriguez@school.com',
      subject: 'English Literature',
      classes: ['9-A', '10-B', '11-C'],
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      experience: 6,
      qualification: 'MA in English Literature',
      phone: '+1234567892',
      status: 'active',
      joinDate: '2021-07-01',
      performance: 88
    },
    {
      id: 'TCH004',
      name: 'Dr. James Wilson',
      email: 'james.wilson@school.com',
      subject: 'Chemistry',
      classes: ['10-C', '11-A', '12-A'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      experience: 15,
      qualification: 'PhD in Chemistry',
      phone: '+1234567893',
      status: 'active',
      joinDate: '2015-09-01',
      performance: 94
    }
  ];

  // Sample assignments data
  const assignments: Assignment[] = [
    {
      id: 'ASG001',
      title: 'Quadratic Equations Practice',
      subject: 'Mathematics',
      class: '10-A',
      dueDate: '2024-01-15',
      submissions: 28,
      totalStudents: 30,
      status: 'active'
    },
    {
      id: 'ASG002',
      title: 'Newton\'s Laws Lab Report',
      subject: 'Physics',
      class: '11-A',
      dueDate: '2024-01-12',
      submissions: 25,
      totalStudents: 25,
      status: 'completed'
    },
    {
      id: 'ASG003',
      title: 'Shakespeare Essay',
      subject: 'English Literature',
      class: '11-C',
      dueDate: '2024-01-10',
      submissions: 20,
      totalStudents: 28,
      status: 'overdue'
    }
  ];

  // Sample attendance data
  const attendanceData: AttendanceRecord[] = [
    { date: '2024-01-08', class: '10-A', present: 28, absent: 2, total: 30 },
    { date: '2024-01-08', class: '11-B', present: 24, absent: 1, total: 25 },
    { date: '2024-01-08', class: '12-C', present: 22, absent: 3, total: 25 },
    { date: '2024-01-09', class: '10-A', present: 29, absent: 1, total: 30 },
    { date: '2024-01-09', class: '11-B', present: 25, absent: 0, total: 25 },
    { date: '2024-01-09', class: '12-C', present: 23, absent: 2, total: 25 }
  ];

  // Sample performance data
  const performanceData = [
    { month: 'Sep', avgGrade: 85, attendance: 92 },
    { month: 'Oct', avgGrade: 87, attendance: 89 },
    { month: 'Nov', avgGrade: 89, attendance: 91 },
    { month: 'Dec', avgGrade: 91, attendance: 88 },
    { month: 'Jan', avgGrade: 88, attendance: 90 }
  ];

  // Subject distribution
  const subjectDistribution = [
    { subject: 'Mathematics', teachers: 3, color: '#3b82f6' },
    { subject: 'Science', teachers: 4, color: '#10b981' },
    { subject: 'English', teachers: 2, color: '#f59e0b' },
    { subject: 'Social Studies', teachers: 2, color: '#ef4444' },
    { subject: 'Arts', teachers: 2, color: '#8b5cf6' }
  ];

  // Filter teachers
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'all' || teacher.subject.toLowerCase().includes(filterSubject.toLowerCase());
    return matchesSearch && matchesSubject;
  });

  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">👨‍🏫 Teacher Management</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Teacher</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: ChartBarIcon },
            { id: 'teachers', label: 'All Teachers', icon: UserGroupIcon },
            { id: 'schedule', label: 'Class Schedule', icon: CalendarIcon },
            { id: 'attendance', label: 'Attendance Portal', icon: ClockIcon },
            { id: 'assignments', label: 'Assignments', icon: ClipboardDocumentListIcon },
            { id: 'performance', label: 'Performance Reports', icon: AcademicCapIcon },
            { id: 'communication', label: 'Communication', icon: ChatBubbleLeftRightIcon }
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
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UserGroupIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Total Teachers</h3>
                  <p className="text-2xl font-bold text-gray-900">{teachers.length}</p>
                  <p className="text-sm text-gray-500">Active</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <ClipboardDocumentListIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Active Assignments</h3>
                  <p className="text-2xl font-bold text-gray-900">{assignments.filter(a => a.status === 'active').length}</p>
                  <p className="text-sm text-gray-500">This Week</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <AcademicCapIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Avg Performance</h3>
                  <p className="text-2xl font-bold text-gray-900">92%</p>
                  <p className="text-sm text-gray-500">Overall</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <ClockIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Avg Attendance</h3>
                  <p className="text-2xl font-bold text-gray-900">90%</p>
                  <p className="text-sm text-gray-500">This Month</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subjectDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="teachers"
                    label={({ subject, teachers }) => `${subject}: ${teachers}`}
                  >
                    {subjectDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgGrade" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'teachers' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search teachers by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Subjects</option>
                <option value="mathematics">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="english">English</option>
                <option value="history">History</option>
              </select>
            </div>
          </div>

          {/* Teachers Table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-500">Teacher</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-500">Subject</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-500">Classes</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-500">Experience</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-500">Performance</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <img
                            src={teacher.avatar}
                            alt={teacher.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{teacher.name}</p>
                            <p className="text-sm text-gray-500">{teacher.email}</p>
                            <p className="text-xs text-gray-400">{teacher.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-900">{teacher.subject}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1">
                          {teacher.classes.map((cls, index) => (
                            <span key={index} className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              {cls}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-900">{teacher.experience} years</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                teacher.performance >= 90 ? 'bg-green-500' :
                                teacher.performance >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${teacher.performance}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{teacher.performance}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          teacher.status === 'active' ? 'bg-green-100 text-green-800' :
                          teacher.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {teacher.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewTeacher(teacher)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">📅 Class Schedule Management</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Weekly Schedule</h4>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700">
                  Add Class
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-2 px-3 font-medium text-gray-500">Time</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-500">Monday</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-500">Tuesday</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-500">Wednesday</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-500">Thursday</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-500">Friday</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      '08:00-09:00',
                      '09:00-10:00',
                      '10:00-11:00',
                      '11:00-12:00',
                      '12:00-13:00',
                      '13:00-14:00',
                      '14:00-15:00'
                    ].map((time, index) => (
                      <tr key={time}>
                        <td className="py-2 px-3 font-medium text-gray-900">{time}</td>
                        <td className="py-2 px-3">
                          {index === 0 && (
                            <div className="bg-blue-100 p-2 rounded text-xs">
                              <div className="font-medium">Math 10-A</div>
                              <div className="text-gray-600">Dr. Johnson</div>
                            </div>
                          )}
                          {index === 2 && (
                            <div className="bg-green-100 p-2 rounded text-xs">
                              <div className="font-medium">Physics 11-A</div>
                              <div className="text-gray-600">Prof. Chen</div>
                            </div>
                          )}
                        </td>
                        <td className="py-2 px-3">
                          {index === 1 && (
                            <div className="bg-purple-100 p-2 rounded text-xs">
                              <div className="font-medium">English 9-A</div>
                              <div className="text-gray-600">Ms. Rodriguez</div>
                            </div>
                          )}
                        </td>
                        <td className="py-2 px-3">
                          {index === 0 && (
                            <div className="bg-yellow-100 p-2 rounded text-xs">
                              <div className="font-medium">Chemistry 12-A</div>
                              <div className="text-gray-600">Dr. Wilson</div>
                            </div>
                          )}
                        </td>
                        <td className="py-2 px-3">
                          {index === 3 && (
                            <div className="bg-red-100 p-2 rounded text-xs">
                              <div className="font-medium">Math 11-B</div>
                              <div className="text-gray-600">Dr. Johnson</div>
                            </div>
                          )}
                        </td>
                        <td className="py-2 px-3">
                          {index === 1 && (
                            <div className="bg-indigo-100 p-2 rounded text-xs">
                              <div className="font-medium">Physics 12-B</div>
                              <div className="text-gray-600">Prof. Chen</div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="card p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Today's Classes</h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">Mathematics</p>
                      <p className="text-sm text-gray-600">Grade 10-A</p>
                      <p className="text-xs text-gray-500">08:00 - 09:00</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Next</span>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">Physics Lab</p>
                      <p className="text-sm text-gray-600">Grade 11-A</p>
                      <p className="text-xs text-gray-500">10:00 - 11:00</p>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Later</span>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">Chemistry</p>
                      <p className="text-sm text-gray-600">Grade 12-A</p>
                      <p className="text-xs text-gray-500">14:00 - 15:00</p>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Later</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">📋 Attendance Portal</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Mark Attendance</h4>
                <div className="flex items-center space-x-2">
                  <input
                    type="date"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                    <option>Select Class</option>
                    <option>10-A</option>
                    <option>11-B</option>
                    <option>12-C</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                {[
                  { name: 'Alice Johnson', id: 'STU001', status: 'present' },
                  { name: 'Bob Smith', id: 'STU002', status: 'present' },
                  { name: 'Carol Davis', id: 'STU003', status: 'absent' },
                  { name: 'David Wilson', id: 'STU004', status: 'present' },
                  { name: 'Eva Brown', id: 'STU005', status: 'late' }
                ].map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className={`px-3 py-1 rounded-full text-xs font-medium ${
                        student.status === 'present' ? 'bg-green-100 text-green-800' :
                        student.status === 'absent' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {student.status === 'present' ? 'Present' :
                         student.status === 'absent' ? 'Absent' : 'Late'}
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Change
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end mt-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Save Attendance
                </button>
              </div>
            </div>
            
            <div className="card p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Attendance Summary</h4>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">89%</div>
                  <div className="text-sm text-gray-500">Overall Attendance</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Present Today:</span>
                    <span className="font-medium text-green-600">142</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Absent Today:</span>
                    <span className="font-medium text-red-600">8</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Late Today:</span>
                    <span className="font-medium text-yellow-600">5</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h5 className="font-medium text-gray-900 mb-2">Recent Trends</h5>
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={attendanceData.slice(0, 5)}>
                      <Bar dataKey="present" fill="#10b981" />
                      <Bar dataKey="absent" fill="#ef4444" />
                      <Tooltip />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'assignments' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">📝 Assignment Management</h3>
            <button 
              onClick={() => setShowAssignmentModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Create Assignment</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="card p-6">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{assignment.title}</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    assignment.status === 'active' ? 'bg-blue-100 text-blue-800' :
                    assignment.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {assignment.status}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Subject:</span>
                    <span className="font-medium">{assignment.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Class:</span>
                    <span className="font-medium">{assignment.class}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Due Date:</span>
                    <span className="font-medium">{assignment.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Submissions:</span>
                    <span className="font-medium">{assignment.submissions}/{assignment.totalStudents}</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 text-blue-600 border border-blue-600 px-3 py-2 rounded-lg text-sm hover:bg-blue-50">
                    View Details
                  </button>
                  <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700">
                    Grade
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">📊 Performance Reports</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Teacher Performance Rankings</h4>
              <div className="space-y-3">
                {teachers
                  .sort((a, b) => b.performance - a.performance)
                  .map((teacher, index) => (
                    <div key={teacher.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                      <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{teacher.name}</p>
                        <p className="text-sm text-gray-500">{teacher.subject}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{teacher.performance}%</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(teacher.performance / 20) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="card p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Class Performance Overview</h4>
              <div className="space-y-4">
                {[
                  { class: '10-A', avgGrade: 87, teacher: 'Dr. Johnson', subject: 'Mathematics' },
                  { class: '11-B', avgGrade: 92, teacher: 'Prof. Chen', subject: 'Physics' },
                  { class: '12-C', avgGrade: 85, teacher: 'Dr. Wilson', subject: 'Chemistry' },
                  { class: '9-A', avgGrade: 89, teacher: 'Ms. Rodriguez', subject: 'English' }
                ].map((classData, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-medium text-gray-900">{classData.subject} - {classData.class}</h5>
                        <p className="text-sm text-gray-500">{classData.teacher}</p>
                      </div>
                      <span className="text-lg font-bold text-blue-600">{classData.avgGrade}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          classData.avgGrade >= 90 ? 'bg-green-500' :
                          classData.avgGrade >= 80 ? 'bg-blue-500' :
                          classData.avgGrade >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${classData.avgGrade}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'communication' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">💬 Communication Hub</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center space-x-3">
                  <BellIcon className="h-5 w-5 text-blue-600" />
                  <span>Send Class Announcement</span>
                </button>
                <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors flex items-center space-x-3">
                  <PhoneIcon className="h-5 w-5 text-green-600" />
                  <span>Contact Parents</span>
                </button>
                <button className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors flex items-center space-x-3">
                  <DocumentTextIcon className="h-5 w-5 text-purple-600" />
                  <span>Generate Report Cards</span>
                </button>
                <button className="w-full text-left p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors flex items-center space-x-3">
                  <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
                  <span>Flag At-Risk Students</span>
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-2 card p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Recent Communications</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <BellIcon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Assignment Reminder Sent</p>
                    <p className="text-xs text-gray-500">To Grade 10-A students about Math homework • 2 hours ago</p>
                  </div>
                  <span className="text-xs text-gray-400">Dr. Johnson</span>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <PhoneIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Parent Meeting Scheduled</p>
                    <p className="text-xs text-gray-500">With Mrs. Smith regarding Alice's performance • 1 day ago</p>
                  </div>
                  <span className="text-xs text-gray-400">Prof. Chen</span>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <DocumentTextIcon className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Report Cards Generated</p>
                    <p className="text-xs text-gray-500">For Grade 11-C English Literature class • 2 days ago</p>
                  </div>
                  <span className="text-xs text-gray-400">Ms. Rodriguez</span>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <ExclamationTriangleIcon className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">AI Academic Flag</p>
                    <p className="text-xs text-gray-500">3 students in Grade 12-A flagged for declining performance • 3 days ago</p>
                  </div>
                  <span className="text-xs text-gray-400">Dr. Wilson</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">📅 Upcoming Events</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Parent-Teacher Conference</span>
                    <span className="text-gray-500">Jan 15, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Staff Meeting</span>
                    <span className="text-gray-500">Jan 18, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mid-term Exams Begin</span>
                    <span className="text-gray-500">Jan 22, 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Detail Modal */}
      {showDetailModal && selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Teacher Details</h3>
              <button 
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            {/* Teacher Profile */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-6 text-white mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedTeacher.avatar}
                  alt={selectedTeacher.name}
                  className="w-20 h-20 rounded-full border-4 border-white/20"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{selectedTeacher.name}</h2>
                  <p className="text-blue-100">{selectedTeacher.subject} Teacher</p>
                  <p className="text-blue-100">{selectedTeacher.qualification}</p>
                  <p className="text-blue-100">Teacher ID: {selectedTeacher.id}</p>
                </div>
                <div className="text-right">
                  <div className="bg-white/20 rounded-lg p-3 mb-2">
                    <div className="text-sm text-blue-100">Performance</div>
                    <div className="text-2xl font-bold">{selectedTeacher.performance}%</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-sm text-blue-100">Experience</div>
                    <div className="text-2xl font-bold">{selectedTeacher.experience}y</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="card p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{selectedTeacher.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <PhoneIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{selectedTeacher.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Join Date:</span>
                      <span className="text-gray-900">{selectedTeacher.joinDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className={`capitalize ${
                        selectedTeacher.status === 'active' ? 'text-green-600' :
                        selectedTeacher.status === 'inactive' ? 'text-gray-600' :
                        'text-yellow-600'
                      }`}>
                        {selectedTeacher.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="card p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Assigned Classes</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTeacher.classes.map((cls, index) => (
                      <span key={index} className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="card p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Student Satisfaction</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                        <span className="font-semibold text-gray-900 w-8">92%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Class Average</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                        <span className="font-semibold text-gray-900 w-8">88%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Attendance Rate</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                        <span className="font-semibold text-gray-900 w-8">95%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Graded Math Assignment</span>
                      <span className="text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-700">Conducted Physics Lab</span>
                      <span className="text-gray-500">1 day ago</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DocumentTextIcon className="h-4 w-4 text-purple-500" />
                      <span className="text-gray-700">Updated Lesson Plans</span>
                      <span className="text-gray-500">3 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Generate Report
              </button>
              <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Edit Teacher
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Add New Teacher</h3>
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  setCurrentSection(1);
                  setTeacherFormData({
                    profileImage: '',
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    gender: '',
                    email: '',
                    phone: '',
                    dob: '',
                    bloodGroup: '',
                    qualification: '',
                    address: {
                      label: '',
                      street: '',
                      city: '',
                      region: '',
                      zipCode: '',
                      country: ''
                    },
                    subjects: [],
                    classes: [],
                    emergencyContact: {
                      name: '',
                      relationship: '',
                      phone: '',
                      alternatePhone: '',
                      address: ''
                    },
                    accountDetails: {
                      email: '',
                      username: '',
                      referenceId: '',
                      password: ''
                    }
                  });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Section Navigation */}
            <div className="flex mb-6 border-b">
              {[
                { id: 1, title: 'Personal Info', icon: '👤' },
                { id: 2, title: 'Subject & Classes', icon: '📚' },
                { id: 3, title: 'Emergency Contact', icon: '🚨' },
                { id: 4, title: 'Account Details', icon: '🔐' }
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                    currentSection === section.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.title}
                </button>
              ))}
            </div>
            
            <form className="space-y-6">
              {/* Section 1: Personal Information */}
              {currentSection === 1 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
                  
                  {/* Profile Image */}
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      {teacherFormData.profileImage ? (
                        <img src={teacherFormData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-400 text-2xl">👤</span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              updateFormData('profileImage', e.target?.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        value={teacherFormData.firstName}
                        onChange={(e) => updateFormData('firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                      <input
                        type="text"
                        value={teacherFormData.middleName}
                        onChange={(e) => updateFormData('middleName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter middle name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={teacherFormData.lastName}
                        onChange={(e) => updateFormData('lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                      <select 
                        required
                        value={teacherFormData.gender}
                        onChange={(e) => updateFormData('gender', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={teacherFormData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={teacherFormData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        required
                        value={teacherFormData.dob}
                        onChange={(e) => updateFormData('dob', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group *</label>
                      <select 
                        required
                        value={teacherFormData.bloodGroup}
                        onChange={(e) => updateFormData('bloodGroup', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Qualification *</label>
                      <input
                        type="text"
                        required
                        value={teacherFormData.qualification}
                        onChange={(e) => updateFormData('qualification', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., PhD in Mathematics"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-4">
                    <h5 className="text-md font-medium text-gray-800">Address Information</h5>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address Label</label>
                      <input
                        type="text"
                        value={teacherFormData.address.label}
                        onChange={(e) => updateFormData('address', { ...teacherFormData.address, label: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Home, Work"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                        <input
                          type="text"
                          required
                          value={teacherFormData.address.street}
                          onChange={(e) => updateFormData('address', { ...teacherFormData.address, street: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter street address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                        <input
                          type="text"
                          required
                          value={teacherFormData.address.city}
                          onChange={(e) => updateFormData('address', { ...teacherFormData.address, city: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Region *</label>
                        <input
                          type="text"
                          required
                          value={teacherFormData.address.region}
                          onChange={(e) => updateFormData('address', { ...teacherFormData.address, region: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter region"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code *</label>
                        <input
                          type="text"
                          required
                          value={teacherFormData.address.zipCode}
                          onChange={(e) => updateFormData('address', { ...teacherFormData.address, zipCode: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter ZIP/postal code"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                        <select 
                          required
                          value={teacherFormData.address.country}
                          onChange={(e) => updateFormData('address', { ...teacherFormData.address, country: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Country</option>
                          <option value="us">United States</option>
                          <option value="ca">Canada</option>
                          <option value="uk">United Kingdom</option>
                          <option value="au">Australia</option>
                          <option value="in">India</option>
                          <option value="gh">Ghana</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 2: Subject & Classes */}
              {currentSection === 2 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Subject & Class Assignment</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Subjects *</label>
                      <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
                        {[
                          'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Literature',
                          'History', 'Geography', 'Computer Science', 'Art', 'Music',
                          'Physical Education', 'French', 'Spanish', 'Economics', 'Psychology'
                        ].map((subject) => (
                          <label key={subject} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={teacherFormData.subjects.includes(subject)}
                              onChange={(e) => {
                                const subjects = e.target.checked
                                  ? [...teacherFormData.subjects, subject]
                                  : teacherFormData.subjects.filter(s => s !== subject);
                                updateFormData('subjects', subjects);
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{subject}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Assign Classes *</label>
                      <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
                        {[
                          '9-A', '9-B', '9-C', '10-A', '10-B', '10-C',
                          '11-A', '11-B', '11-C', '12-A', '12-B', '12-C'
                        ].map((className) => (
                          <label key={className} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={teacherFormData.classes.includes(className)}
                              onChange={(e) => {
                                const classes = e.target.checked
                                  ? [...teacherFormData.classes, className]
                                  : teacherFormData.classes.filter(c => c !== className);
                                updateFormData('classes', classes);
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{className}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Selected Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Selection Summary:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Subjects ({teacherFormData.subjects.length}):</p>
                        <p className="text-sm text-blue-600">{teacherFormData.subjects.join(', ') || 'None selected'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Classes ({teacherFormData.classes.length}):</p>
                        <p className="text-sm text-blue-600">{teacherFormData.classes.join(', ') || 'None selected'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 3: Emergency Contact */}
              {currentSection === 3 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact Details</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
                      <input
                        type="text"
                        required
                        value={teacherFormData.emergencyContact.name}
                        onChange={(e) => updateFormData('emergencyContact', { ...teacherFormData.emergencyContact, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter contact name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Relationship *</label>
                      <select
                        required
                        value={teacherFormData.emergencyContact.relationship}
                        onChange={(e) => updateFormData('emergencyContact', { ...teacherFormData.emergencyContact, relationship: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Relationship</option>
                        <option value="spouse">Spouse</option>
                        <option value="parent">Parent</option>
                        <option value="sibling">Sibling</option>
                        <option value="child">Child</option>
                        <option value="friend">Friend</option>
                        <option value="colleague">Colleague</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Primary Phone *</label>
                      <input
                        type="tel"
                        required
                        value={teacherFormData.emergencyContact.phone}
                        onChange={(e) => updateFormData('emergencyContact', { ...teacherFormData.emergencyContact, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter primary phone"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phone</label>
                      <input
                        type="tel"
                        value={teacherFormData.emergencyContact.alternatePhone}
                        onChange={(e) => updateFormData('emergencyContact', { ...teacherFormData.emergencyContact, alternatePhone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter alternate phone"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      rows={3}
                      value={teacherFormData.emergencyContact.address}
                      onChange={(e) => updateFormData('emergencyContact', { ...teacherFormData.emergencyContact, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter emergency contact address"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Section 4: Account Details */}
              {currentSection === 4 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Account Details</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Email *</label>
                      <input
                        type="email"
                        required
                        value={teacherFormData.accountDetails.email}
                        onChange={(e) => updateFormData('accountDetails', { ...teacherFormData.accountDetails, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter account email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                      <input
                        type="text"
                        value={teacherFormData.accountDetails.username}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                        placeholder="Auto-generated from name"
                      />
                      <p className="text-xs text-gray-500 mt-1">Generated from first and last name (6 characters)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reference ID</label>
                      <input
                        type="text"
                        value={teacherFormData.accountDetails.referenceId}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                        placeholder="Auto-generated"
                      />
                      <p className="text-xs text-gray-500 mt-1">8-digit ID with current year (permanently assigned)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={teacherFormData.accountDetails.password}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                          placeholder="Auto-generated"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            updateFormData('accountDetails', {
                              ...teacherFormData.accountDetails,
                              password: generatePassword()
                            });
                          }}
                          className="absolute right-2 top-2 text-xs text-blue-600 hover:text-blue-800"
                        >
                          Regenerate
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">6-character alphanumeric password</p>
                    </div>
                  </div>
                  
                  {/* Account Summary */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="text-sm font-medium text-blue-800 mb-2">Account Summary</h5>
                    <div className="space-y-1 text-sm text-blue-700">
                      <p><span className="font-medium">Full Name:</span> {`${teacherFormData.firstName} ${teacherFormData.middleName} ${teacherFormData.lastName}`.trim()}</p>
                      <p><span className="font-medium">Username:</span> {teacherFormData.accountDetails.username}</p>
                      <p><span className="font-medium">Reference ID:</span> {teacherFormData.accountDetails.referenceId}</p>
                      <p><span className="font-medium">Subjects:</span> {teacherFormData.subjects.join(', ') || 'None'}</p>
                      <p><span className="font-medium">Classes:</span> {teacherFormData.classes.join(', ') || 'None'}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <button 
                  type="button"
                  onClick={() => setCurrentSection(Math.max(1, currentSection - 1))}
                  disabled={currentSection === 1}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentSection === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Previous
                </button>
                
                <div className="flex space-x-3">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setCurrentSection(1);
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  
                  {currentSection < 4 ? (
                    <button 
                      type="button"
                      onClick={() => setCurrentSection(currentSection + 1)}
                      className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <button 
                      type="submit"
                      className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Add Teacher
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assignment Modal */}
      {showAssignmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Create New Assignment</h3>
              <button 
                onClick={() => setShowAssignmentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter assignment title"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select Subject</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="physics">Physics</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="english">English Literature</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select Class</option>
                    <option value="9-A">9-A</option>
                    <option value="10-A">10-A</option>
                    <option value="11-A">11-A</option>
                    <option value="12-A">12-A</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter assignment description and instructions"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Points</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowAssignmentModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherManagement;