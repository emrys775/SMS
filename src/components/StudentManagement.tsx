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
  InformationCircleIcon,
  UserGroupIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  class: string;
  avatar: string;
  gpa: number;
  attendance: number;
  feeBalance: number;
  status: 'active' | 'inactive' | 'suspended';
  parentContact: string;
  enrollmentDate: string;
}

const StudentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const [studentFormData, setStudentFormData] = useState({
    // Student Information
    profileImage: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dob: '',
    bloodGroup: '',
    grade: '',
    // Parent/Guardian Information
    parentProfileImage: '',
    parentFirstName: '',
    parentMiddleName: '',
    parentLastName: '',
    parentGender: '',
    parentBloodGroup: '',
    parentEmail: '',
    parentPhone: '',
    parentProfession: '',
    // Address Information
    address: {
      label: 'home',
      street: '',
      city: '',
      region: '',
      zipCode: '',
      country: ''
    },
    // Emergency Contact
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      alternatePhone: '',
      address: ''
    },
    // Account Details
    accountDetails: {
      email: '',
      username: '',
      referenceId: '',
      password: ''
    }
  });

  // Helper functions for auto-generation
  const generateUsername = (firstName: string, lastName: string) => {
    if (!firstName || !lastName) return '';
    const cleanFirst = firstName.toLowerCase().replace(/[^a-z]/g, '');
    const cleanLast = lastName.toLowerCase().replace(/[^a-z]/g, '');
    return (cleanFirst.substring(0, 3) + cleanLast.substring(0, 3)).padEnd(6, '0');
  };

  const generateReferenceId = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${year}${randomNum}`;
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const updateFormData = (field: string, value: any) => {
    setStudentFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate account details when name changes
      if (field === 'firstName' || field === 'lastName') {
        updated.accountDetails = {
          ...updated.accountDetails,
          username: generateUsername(updated.firstName, updated.lastName),
          referenceId: updated.accountDetails.referenceId || generateReferenceId(),
          password: updated.accountDetails.password || generatePassword()
        };
      }
      
      return updated;
    });
  };

  // Sample student data
  const students: Student[] = [
    {
      id: 'STU001',
      name: 'Jessica Rose',
      email: 'jessica.rose@school.com',
      grade: '10',
      class: '10-A',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      gpa: 3.8,
      attendance: 85,
      feeBalance: 1250,
      status: 'active',
      parentContact: '+1234567890',
      enrollmentDate: '2023-09-01'
    },
    {
      id: 'STU002',
      name: 'Michael Johnson',
      email: 'michael.johnson@school.com',
      grade: '11',
      class: '11-B',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      gpa: 3.6,
      attendance: 92,
      feeBalance: 0,
      status: 'active',
      parentContact: '+1234567891',
      enrollmentDate: '2022-09-01'
    },
    {
      id: 'STU003',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@school.com',
      grade: '9',
      class: '9-C',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      gpa: 3.9,
      attendance: 88,
      feeBalance: 500,
      status: 'active',
      parentContact: '+1234567892',
      enrollmentDate: '2024-09-01'
    },
    {
      id: 'STU004',
      name: 'David Brown',
      email: 'david.brown@school.com',
      grade: '12',
      class: '12-A',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      gpa: 3.4,
      attendance: 78,
      feeBalance: 2000,
      status: 'active',
      parentContact: '+1234567893',
      enrollmentDate: '2021-09-01'
    }
  ];

  // Sample analytics data
  const gradeDistribution = [
    { grade: 'Grade 9', count: 45, color: '#3b82f6' },
    { grade: 'Grade 10', count: 52, color: '#10b981' },
    { grade: 'Grade 11', count: 38, color: '#f59e0b' },
    { grade: 'Grade 12', count: 41, color: '#ef4444' }
  ];

  const attendanceStats = [
    { range: '90-100%', count: 89, color: '#10b981' },
    { range: '80-89%', count: 45, color: '#f59e0b' },
    { range: '70-79%', count: 23, color: '#ef4444' },
    { range: 'Below 70%', count: 19, color: '#6b7280' }
  ];

  const performanceData = [
    { subject: 'Math', average: 78 },
    { subject: 'Science', average: 82 },
    { subject: 'English', average: 85 },
    { subject: 'History', average: 79 },
    { subject: 'Art', average: 88 }
  ];

  // Filter students based on search and grade
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === 'all' || student.grade === filterGrade;
    return matchesSearch && matchesGrade;
  });

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">👥 Student Management</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: ChartBarIcon },
            { id: 'students', label: 'All Students', icon: UserGroupIcon },
            { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
            { id: 'attendance', label: 'Attendance', icon: ClockIcon },
            { id: 'performance', label: 'Performance', icon: AcademicCapIcon },
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
                  <h3 className="font-semibold text-gray-900">Total Students</h3>
                  <p className="text-2xl font-bold text-gray-900">{students.length}</p>
                  <p className="text-sm text-gray-500">Active</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <ChartBarIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Avg Attendance</h3>
                  <p className="text-2xl font-bold text-gray-900">86%</p>
                  <p className="text-sm text-gray-500">This Month</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <AcademicCapIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Avg GPA</h3>
                  <p className="text-2xl font-bold text-gray-900">3.7</p>
                  <p className="text-sm text-gray-500">Overall</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <CurrencyDollarIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Pending Fees</h3>
                  <p className="text-2xl font-bold text-gray-900">$3,750</p>
                  <p className="text-sm text-gray-500">Total</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ grade, count }) => `${grade}: ${count}`}
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="average" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'students' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Grades</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>
          </div>

          {/* Students Table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-500">Student</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-500">Grade/Class</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-500">GPA</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-500">Attendance</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-500">Fee Balance</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.email}</p>
                            <p className="text-xs text-gray-400">{student.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-900">{student.class}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-medium text-gray-900">{student.gpa}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                student.attendance >= 90 ? 'bg-green-500' :
                                student.attendance >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${student.attendance}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{student.attendance}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`font-medium ${
                          student.feeBalance > 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          ${student.feeBalance}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          student.status === 'active' ? 'bg-green-100 text-green-800' :
                          student.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewStudent(student)}
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

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">📊 Student Analytics</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Attendance Distribution</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Performance Trends</h4>
              <div className="space-y-4">
                {performanceData.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{subject.subject}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${subject.average}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold text-gray-900 w-12">{subject.average}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">📅 Attendance Management</h3>
          
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Daily Attendance</h4>
              <input
                type="date"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Student</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Class</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Time In</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="font-medium text-gray-900">{student.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-900">{student.class}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Present
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-900">08:15 AM</td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          Mark Absent
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">🎯 Academic Performance</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Top Performers</h4>
              <div className="space-y-3">
                {students
                  .sort((a, b) => b.gpa - a.gpa)
                  .slice(0, 5)
                  .map((student, index) => (
                    <div key={student.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.class}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{student.gpa}</p>
                        <p className="text-sm text-gray-500">GPA</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="card p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Students Needing Support</h4>
              <div className="space-y-3">
                {students
                  .filter(student => student.gpa < 3.5 || student.attendance < 85)
                  .map((student) => (
                    <div key={student.id} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.class}</p>
                        <div className="flex space-x-4 text-xs text-gray-600 mt-1">
                          <span>GPA: {student.gpa}</span>
                          <span>Attendance: {student.attendance}%</span>
                        </div>
                      </div>
                      <button className="text-red-600 hover:text-red-800">
                        <ExclamationTriangleIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'communication' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">💬 Student Communication</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  📧 Send Announcement
                </button>
                <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  📱 SMS to Parents
                </button>
                <button className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  📋 Generate Reports
                </button>
                <button className="w-full text-left p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                  🔔 Send Reminders
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
                    <p className="text-xs text-gray-500">To Grade 10-A students • 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <ChatBubbleLeftRightIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Parent Meeting Scheduled</p>
                    <p className="text-xs text-gray-500">With Mrs. Johnson for Jessica Rose • 1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <DocumentArrowDownIcon className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Progress Report Generated</p>
                    <p className="text-xs text-gray-500">For all Grade 11 students • 2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {showDetailModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Student Details</h3>
              <button 
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            {/* Student Profile */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-6 text-white mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-20 h-20 rounded-full border-4 border-white/20"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                  <p className="text-blue-100">Grade {selectedStudent.grade} • {selectedStudent.class}</p>
                  <p className="text-blue-100">Student ID: {selectedStudent.id}</p>
                  <p className="text-blue-100">Email: {selectedStudent.email}</p>
                </div>
                <div className="text-right">
                  <div className="bg-white/20 rounded-lg p-3 mb-2">
                    <div className="text-sm text-blue-100">GPA</div>
                    <div className="text-2xl font-bold">{selectedStudent.gpa}</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-sm text-blue-100">Attendance</div>
                    <div className="text-2xl font-bold">{selectedStudent.attendance}%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="card p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Enrollment Date:</span>
                      <span className="text-gray-900">{selectedStudent.enrollmentDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Parent Contact:</span>
                      <span className="text-gray-900">{selectedStudent.parentContact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className={`capitalize ${
                        selectedStudent.status === 'active' ? 'text-green-600' :
                        selectedStudent.status === 'inactive' ? 'text-gray-600' :
                        'text-red-600'
                      }`}>
                        {selectedStudent.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="card p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Financial Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Fee Balance:</span>
                      <span className={`font-medium ${
                        selectedStudent.feeBalance > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        ${selectedStudent.feeBalance}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment Status:</span>
                      <span className={selectedStudent.feeBalance > 0 ? 'text-red-600' : 'text-green-600'}>
                        {selectedStudent.feeBalance > 0 ? 'Pending' : 'Paid'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="card p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Academic Performance</h4>
                  <div className="space-y-3">
                    {['Math', 'Science', 'English', 'History', 'Art'].map((subject, index) => {
                      const grade = 85 + Math.floor(Math.random() * 15);
                      return (
                        <div key={subject} className="flex items-center justify-between">
                          <span className="text-gray-700">{subject}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${grade}%` }}
                              ></div>
                            </div>
                            <span className="font-semibold text-gray-900 w-8">{grade}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="card p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Submitted Math Assignment</span>
                      <span className="text-gray-500">2 days ago</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-700">Attended Science Lab</span>
                      <span className="text-gray-500">3 days ago</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpenIcon className="h-4 w-4 text-purple-500" />
                      <span className="text-gray-700">Downloaded Study Materials</span>
                      <span className="text-gray-500">1 week ago</span>
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
                Edit Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 w-full max-w-5xl mx-4 my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Add New Student</h3>
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  setCurrentSection(1);
                  setStudentFormData({
                    profileImage: '',
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    gender: '',
                    dob: '',
                    bloodGroup: '',
                    grade: '',
                    parentProfileImage: '',
                    parentFirstName: '',
                    parentMiddleName: '',
                    parentLastName: '',
                    parentGender: '',
                    parentBloodGroup: '',
                    parentEmail: '',
                    parentPhone: '',
                    parentProfession: '',
                    address: {
                      label: 'home',
                      street: '',
                      city: '',
                      region: '',
                      zipCode: '',
                      country: ''
                    },
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
            <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
              {[
                { id: 1, name: 'Student Info', icon: '👤' },
                { id: 2, name: 'Parent/Guardian', icon: '👨‍👩‍👧‍👦' },
                { id: 3, name: 'Address', icon: '🏠' },
                { id: 4, name: 'Emergency Contact', icon: '🚨' },
                { id: 5, name: 'Account Details', icon: '🔐' }
              ].map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setCurrentSection(section.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    currentSection === section.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span>{section.icon}</span>
                  <span className="hidden sm:inline">{section.name}</span>
                </button>
              ))}
            </div>
            
            <form className="space-y-6">
              {/* Section 1: Student Information */}
              {currentSection === 1 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Student Information</h4>
                  
                  {/* Student Profile Image */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Student Profile Image</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => updateFormData('profileImage', e.target.files?.[0] || '')}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        value={studentFormData.firstName}
                        onChange={(e) => updateFormData('firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                      <input
                        type="text"
                        value={studentFormData.middleName}
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
                        value={studentFormData.lastName}
                        onChange={(e) => updateFormData('lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                      <select 
                        required 
                        value={studentFormData.gender}
                        onChange={(e) => updateFormData('gender', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        required
                        value={studentFormData.dob}
                        onChange={(e) => updateFormData('dob', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                      <select 
                        value={studentFormData.bloodGroup}
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
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Grade/Class *</label>
                    <select 
                      required 
                      value={studentFormData.grade}
                      onChange={(e) => updateFormData('grade', e.target.value)}
                      className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Grade/Class</option>
                      <option value="nursery">Nursery</option>
                      <option value="kg1">KG1</option>
                      <option value="kg2">KG2</option>
                      <option value="1">Grade 1</option>
                      <option value="2">Grade 2</option>
                      <option value="3">Grade 3</option>
                      <option value="4">Grade 4</option>
                      <option value="5">Grade 5</option>
                      <option value="6">Grade 6</option>
                      <option value="7">Grade 7</option>
                      <option value="8">Grade 8</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Section 2: Parent/Guardian Information */}
              {currentSection === 2 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Parent/Guardian Information</h4>
                  
                  {/* Parent Profile Image */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Parent/Guardian Profile Image</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => updateFormData('parentProfileImage', e.target.files?.[0] || '')}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        value={studentFormData.parentFirstName}
                        onChange={(e) => updateFormData('parentFirstName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Parent first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                      <input
                        type="text"
                        value={studentFormData.parentMiddleName}
                        onChange={(e) => updateFormData('parentMiddleName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Parent middle name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={studentFormData.parentLastName}
                        onChange={(e) => updateFormData('parentLastName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Parent last name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                      <select 
                        required 
                        value={studentFormData.parentGender}
                        onChange={(e) => updateFormData('parentGender', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                      <select 
                        value={studentFormData.parentBloodGroup}
                        onChange={(e) => updateFormData('parentBloodGroup', e.target.value)}
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
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={studentFormData.parentEmail}
                        onChange={(e) => updateFormData('parentEmail', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="parent@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={studentFormData.parentPhone}
                        onChange={(e) => updateFormData('parentPhone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                      <input
                        type="text"
                        value={studentFormData.parentProfession}
                        onChange={(e) => updateFormData('parentProfession', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Engineer, Doctor"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Section 3: Address Information */}
              {currentSection === 3 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Address Information</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Label</label>
                    <select 
                      value={studentFormData.address.label}
                      onChange={(e) => updateFormData('address', { ...studentFormData.address, label: e.target.value })}
                      className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="home">Home</option>
                      <option value="work">Work</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                      <input
                        type="text"
                        required
                        value={studentFormData.address.street}
                        onChange={(e) => updateFormData('address', { ...studentFormData.address, street: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="123 Main Street"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                        <input
                          type="text"
                          required
                          value={studentFormData.address.city}
                          onChange={(e) => updateFormData('address', { ...studentFormData.address, city: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="City name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Region *</label>
                        <input
                          type="text"
                          required
                          value={studentFormData.address.region}
                          onChange={(e) => updateFormData('address', { ...studentFormData.address, region: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="State or Province"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code *</label>
                        <input
                          type="text"
                          required
                          value={studentFormData.address.zipCode}
                          onChange={(e) => updateFormData('address', { ...studentFormData.address, zipCode: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="12345"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                        <select 
                          required 
                          value={studentFormData.address.country}
                          onChange={(e) => updateFormData('address', { ...studentFormData.address, country: e.target.value })}
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

              {/* Section 4: Emergency Contact Details */}
              {currentSection === 4 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact Details</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Name *</label>
                      <input
                        type="text"
                        required
                        value={studentFormData.emergencyContact.fullName}
                        onChange={(e) => updateFormData('emergencyContact', { ...studentFormData.emergencyContact, fullName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Relationship *</label>
                      <select 
                        required 
                        value={studentFormData.emergencyContact.relationship}
                        onChange={(e) => updateFormData('emergencyContact', { ...studentFormData.emergencyContact, relationship: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Relationship</option>
                        <option value="parent">Parent</option>
                        <option value="guardian">Guardian</option>
                        <option value="grandparent">Grandparent</option>
                        <option value="aunt">Aunt</option>
                        <option value="uncle">Uncle</option>
                        <option value="sibling">Sibling</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Phone *</label>
                      <input
                        type="tel"
                        required
                        value={studentFormData.emergencyContact.primaryPhone}
                        onChange={(e) => updateFormData('emergencyContact', { ...studentFormData.emergencyContact, primaryPhone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 987-6543"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alternative Phone</label>
                      <input
                        type="tel"
                        value={studentFormData.emergencyContact.secondaryPhone}
                        onChange={(e) => updateFormData('emergencyContact', { ...studentFormData.emergencyContact, secondaryPhone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 123-9876"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Address</label>
                    <textarea
                      rows={3}
                      value={studentFormData.emergencyContact.address}
                      onChange={(e) => updateFormData('emergencyContact', { ...studentFormData.emergencyContact, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Complete address of emergency contact"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Section 5: Account Details */}
              {currentSection === 5 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Account Details</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Student Email *</label>
                      <input
                        type="email"
                        required
                        value={studentFormData.account.email}
                        onChange={(e) => updateFormData('account', { ...studentFormData.account, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="student@school.edu"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                      <input
                        type="text"
                        required
                        value={studentFormData.account.username}
                        onChange={(e) => updateFormData('account', { ...studentFormData.account, username: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="student.username"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reference ID</label>
                      <div className="flex">
                        <input
                          type="text"
                          readOnly
                          value={studentFormData.account.referenceId}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-50 text-gray-600"
                        />
                        <button
                          type="button"
                          className="px-3 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                          onClick={() => updateFormData('account', { ...studentFormData.account, referenceId: generateReferenceId() })}
                        >
                          🔄
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">8-digit auto-generated ID</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <div className="flex">
                        <input
                          type="text"
                          readOnly
                          value={studentFormData.account.password}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-50 text-gray-600"
                        />
                        <button
                          type="button"
                          className="px-3 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors"
                          onClick={() => updateFormData('account', { ...studentFormData.account, password: generatePassword() })}
                        >
                          🔄
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">6-character alphanumeric password</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Navigation and Submit Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <div className="flex space-x-2">
                  {currentSection > 1 && (
                    <button 
                      type="button"
                      onClick={() => setCurrentSection(currentSection - 1)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      ← Previous
                    </button>
                  )}
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setCurrentSection(1);
                      setStudentFormData({
                        student: { profileImage: '', firstName: '', middleName: '', lastName: '', gender: '', dateOfBirth: '', bloodGroup: '', grade: '' },
                        parent: { profileImage: '', firstName: '', middleName: '', lastName: '', gender: '', bloodGroup: '', email: '', phone: '', profession: '' },
                        address: { label: 'home', street: '', city: '', region: '', zipCode: '', country: '' },
                        emergencyContact: { fullName: '', relationship: '', primaryPhone: '', secondaryPhone: '', address: '' },
                        account: { email: '', username: '', referenceId: '', password: '' }
                      });
                    }}
                    className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  
                  {currentSection < 5 ? (
                    <button 
                      type="button"
                      onClick={() => setCurrentSection(currentSection + 1)}
                      className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Next →
                    </button>
                  ) : (
                    <button 
                      type="submit"
                      className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Create Student Account
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;