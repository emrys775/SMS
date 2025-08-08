import React, { useState } from 'react';
import {
  AcademicCapIcon,
  UserGroupIcon,
  ClockIcon,
  BookOpenIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PrinterIcon,
  ArrowDownTrayIcon,
  ClipboardDocumentListIcon,
  StarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

interface Class {
  id: string;
  name: string;
  level: string;
  section: string;
  capacity: number;
  currentEnrollment: number;
  classTeacher: string;
  teacherId: string;
  room: string;
  academicYear: string;
  subjects: string[];
  schedule: ClassSchedule[];
  students: Student[];
  performance: ClassPerformance;
  status: 'active' | 'inactive';
}

interface ClassSchedule {
  day: string;
  periods: Period[];
}

interface Period {
  time: string;
  subject: string;
  teacher: string;
  duration: number;
}

interface Student {
  id: string;
  name: string;
  indexNumber: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  parentContact: string;
  address: string;
  enrollmentDate: string;
  status: 'active' | 'transferred' | 'graduated';
  performance: StudentPerformance;
}

interface StudentPerformance {
  overallGrade: string;
  attendance: number;
  conduct: 'excellent' | 'good' | 'fair' | 'poor';
  subjects: SubjectGrade[];
}

interface SubjectGrade {
  subject: string;
  grade: string;
  score: number;
  remarks: string;
}

interface ClassPerformance {
  averageScore: number;
  passRate: number;
  attendanceRate: number;
  topPerformers: string[];
  subjectPerformance: SubjectPerformance[];
}

interface SubjectPerformance {
  subject: string;
  averageScore: number;
  passRate: number;
  teacher: string;
}

interface Teacher {
  id: string;
  name: string;
  subjects: string[];
  qualification: string;
}

const ClassManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showTimetableModal, setShowTimetableModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');

  // Ghana Primary School Levels
  const ghanaLevels = [
    'Nursery 1', 'Nursery 2', 'KG 1', 'KG 2',
    'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'
  ];

  // Ghana Primary School Subjects
  const ghanaSubjects = [
    'English Language', 'Mathematics', 'Science', 'Social Studies',
    'Ghanaian Language (Twi)', 'Ghanaian Language (Ga)', 'Ghanaian Language (Ewe)',
    'Religious & Moral Education', 'Creative Arts', 'Physical Education',
    'Information Communication Technology (ICT)', 'French'
  ];

  // Sample data
  const classes: Class[] = [
    {
      id: '1',
      name: 'Primary 1A',
      level: 'Primary 1',
      section: 'A',
      capacity: 35,
      currentEnrollment: 32,
      classTeacher: 'Mrs. Akosua Mensah',
      teacherId: 'T001',
      room: 'Room 101',
      academicYear: '2024/2025',
      subjects: ['English Language', 'Mathematics', 'Science', 'Creative Arts'],
      schedule: [],
      students: [],
      performance: {
        averageScore: 78.5,
        passRate: 87.5,
        attendanceRate: 92.3,
        topPerformers: ['Kwame Asante', 'Ama Serwaa', 'Kofi Mensah'],
        subjectPerformance: [
          { subject: 'English Language', averageScore: 75, passRate: 85, teacher: 'Mrs. Akosua Mensah' },
          { subject: 'Mathematics', averageScore: 82, passRate: 90, teacher: 'Mr. Kwaku Boateng' }
        ]
      },
      status: 'active'
    },
    {
      id: '2',
      name: 'Primary 2B',
      level: 'Primary 2',
      section: 'B',
      capacity: 35,
      currentEnrollment: 30,
      classTeacher: 'Mr. Kwaku Boateng',
      teacherId: 'T002',
      room: 'Room 102',
      academicYear: '2024/2025',
      subjects: ['English Language', 'Mathematics', 'Science', 'Social Studies'],
      schedule: [],
      students: [],
      performance: {
        averageScore: 81.2,
        passRate: 93.3,
        attendanceRate: 89.7,
        topPerformers: ['Akosua Frimpong', 'Yaw Osei', 'Efua Asante'],
        subjectPerformance: [
          { subject: 'English Language', averageScore: 79, passRate: 90, teacher: 'Mr. Kwaku Boateng' },
          { subject: 'Mathematics', averageScore: 85, passRate: 96, teacher: 'Mrs. Abena Osei' }
        ]
      },
      status: 'active'
    },
    {
      id: '3',
      name: 'KG 2A',
      level: 'KG 2',
      section: 'A',
      capacity: 25,
      currentEnrollment: 23,
      classTeacher: 'Miss Adwoa Amponsah',
      teacherId: 'T003',
      room: 'Room 201',
      academicYear: '2024/2025',
      subjects: ['English Language', 'Mathematics', 'Creative Arts', 'Physical Education'],
      schedule: [],
      students: [],
      performance: {
        averageScore: 85.7,
        passRate: 95.7,
        attendanceRate: 94.1,
        topPerformers: ['Nana Yaa', 'Kwabena Osei', 'Akua Serwaa'],
        subjectPerformance: [
          { subject: 'English Language', averageScore: 83, passRate: 95, teacher: 'Miss Adwoa Amponsah' },
          { subject: 'Mathematics', averageScore: 88, passRate: 96, teacher: 'Miss Adwoa Amponsah' }
        ]
      },
      status: 'active'
    }
  ];

  const teachers: Teacher[] = [
    { id: 'T001', name: 'Mrs. Akosua Mensah', subjects: ['English Language', 'Creative Arts'], qualification: 'B.Ed Primary Education' },
    { id: 'T002', name: 'Mr. Kwaku Boateng', subjects: ['Mathematics', 'Science'], qualification: 'B.Sc Mathematics Education' },
    { id: 'T003', name: 'Miss Adwoa Amponsah', subjects: ['English Language', 'Mathematics'], qualification: 'Diploma in Early Childhood Education' },
    { id: 'T004', name: 'Mrs. Abena Osei', subjects: ['Mathematics', 'ICT'], qualification: 'B.Ed Mathematics' },
    { id: 'T005', name: 'Mr. Yaw Asante', subjects: ['Social Studies', 'RME'], qualification: 'B.A Social Studies Education' }
  ];

  const sampleStudents: Student[] = [
    {
      id: 'S001',
      name: 'Kwame Asante',
      indexNumber: 'GH2024001',
      gender: 'male',
      dateOfBirth: '2018-03-15',
      parentContact: '+233 24 123 4567',
      address: 'Adabraka, Accra',
      enrollmentDate: '2024-09-01',
      status: 'active',
      performance: {
        overallGrade: 'A',
        attendance: 95,
        conduct: 'excellent',
        subjects: [
          { subject: 'English Language', grade: 'A', score: 85, remarks: 'Excellent reading skills' },
          { subject: 'Mathematics', grade: 'A', score: 88, remarks: 'Strong problem-solving abilities' }
        ]
      }
    },
    {
      id: 'S002',
      name: 'Ama Serwaa',
      indexNumber: 'GH2024002',
      gender: 'female',
      dateOfBirth: '2018-07-22',
      parentContact: '+233 20 987 6543',
      address: 'Tema, Greater Accra',
      enrollmentDate: '2024-09-01',
      status: 'active',
      performance: {
        overallGrade: 'A',
        attendance: 92,
        conduct: 'excellent',
        subjects: [
          { subject: 'English Language', grade: 'A', score: 82, remarks: 'Creative writing skills' },
          { subject: 'Mathematics', grade: 'B+', score: 78, remarks: 'Good understanding of concepts' }
        ]
      }
    }
  ];

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.classTeacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || cls.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      case 'transferred': return 'text-yellow-600 bg-yellow-100';
      case 'graduated': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConductColor = (conduct: string) => {
    switch (conduct) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-100';
    if (grade.startsWith('D')) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AcademicCapIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Classes</p>
              <p className="text-2xl font-semibold text-gray-900">{classes.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserGroupIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Students</p>
              <p className="text-2xl font-semibold text-gray-900">
                {classes.reduce((sum, cls) => sum + cls.currentEnrollment, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Average Performance</p>
              <p className="text-2xl font-semibold text-gray-900">
                {(classes.reduce((sum, cls) => sum + cls.performance.averageScore, 0) / classes.length).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarDaysIcon className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Attendance Rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {(classes.reduce((sum, cls) => sum + cls.performance.attendanceRate, 0) / classes.length).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search classes or teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Levels</option>
              {ghanaLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Add Class</span>
          </button>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((cls) => (
            <div key={cls.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{cls.name}</h3>
                  <p className="text-sm text-gray-500">{cls.level} • {cls.room}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(cls.status)}`}>
                  {cls.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{cls.classTeacher}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Enrollment:</span>
                  <span className="text-sm font-medium">{cls.currentEnrollment}/{cls.capacity}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Performance:</span>
                  <span className="text-sm font-medium text-green-600">{cls.performance.averageScore}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Attendance:</span>
                  <span className="text-sm font-medium text-blue-600">{cls.performance.attendanceRate}%</span>
                </div>
              </div>

              <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedClass(cls.id)}
                  className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                >
                  <EyeIcon className="h-4 w-4 inline mr-1" />
                  View
                </button>
                <button className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded hover:bg-gray-100">
                  <PencilIcon className="h-4 w-4 inline mr-1" />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderClassDetails = () => {
    const currentClass = classes.find(cls => cls.id === selectedClass);
    if (!currentClass) return null;

    return (
      <div className="space-y-6">
        {/* Class Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{currentClass.name}</h2>
              <p className="text-gray-500">{currentClass.level} • {currentClass.room} • Academic Year {currentClass.academicYear}</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <PrinterIcon className="h-4 w-4 inline mr-2" />
                Print Report
              </button>
              <button
                onClick={() => setSelectedClass(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Back to Overview
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800">Students</p>
                  <p className="text-lg font-semibold text-blue-900">{currentClass.currentEnrollment}/{currentClass.capacity}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center">
                <ChartBarIcon className="h-6 w-6 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">Performance</p>
                  <p className="text-lg font-semibold text-green-900">{currentClass.performance.averageScore}%</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center">
                <CalendarDaysIcon className="h-6 w-6 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-purple-800">Attendance</p>
                  <p className="text-lg font-semibold text-purple-900">{currentClass.performance.attendanceRate}%</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center">
                <TrophyIcon className="h-6 w-6 text-orange-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-orange-800">Pass Rate</p>
                  <p className="text-lg font-semibold text-orange-900">{currentClass.performance.passRate}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Class Information Tabs */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'students', label: 'Students', icon: UserGroupIcon },
                { id: 'subjects', label: 'Subjects', icon: BookOpenIcon },
                { id: 'timetable', label: 'Timetable', icon: ClockIcon },
                { id: 'performance', label: 'Performance', icon: ChartBarIcon }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'students' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Class Students</h3>
                  <button
                    onClick={() => setShowStudentModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span>Add Student</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Index Number</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conduct</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sampleStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-600">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                <div className="text-sm text-gray-500">{student.gender}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {student.indexNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(student.performance.overallGrade)}`}>
                              {student.performance.overallGrade}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {student.performance.attendance}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConductColor(student.performance.conduct)}`}>
                              {student.performance.conduct}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <EyeIcon className="h-4 w-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                <PencilIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'subjects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Class Subjects</h3>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <PlusIcon className="h-4 w-4" />
                    <span>Add Subject</span>
                  </button>
                </div>

                {/* Subject Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <BookOpenIcon className="h-6 w-6 text-blue-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-blue-800">Total Subjects</p>
                        <p className="text-lg font-semibold text-blue-900">{currentClass.subjects.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <UserIcon className="h-6 w-6 text-green-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">Assigned Teachers</p>
                        <p className="text-lg font-semibold text-green-900">{currentClass.performance.subjectPerformance.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <ChartBarIcon className="h-6 w-6 text-yellow-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-yellow-800">Avg Performance</p>
                        <p className="text-lg font-semibold text-yellow-900">{currentClass.performance.averageScore}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <TrophyIcon className="h-6 w-6 text-purple-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-purple-800">Pass Rate</p>
                        <p className="text-lg font-semibold text-purple-900">{currentClass.performance.passRate}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subjects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentClass.subjects.map((subject, index) => {
                    const subjectPerf = currentClass.performance.subjectPerformance.find(sp => sp.subject === subject);
                    return (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <BookOpenIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{subject}</h4>
                              <p className="text-sm text-gray-500">Core Subject</p>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <button className="p-1 text-gray-400 hover:text-blue-600">
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600">
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Teacher:</span>
                            <span className="text-sm font-medium text-gray-900">
                              {subjectPerf?.teacher || 'Not assigned'}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Average Score:</span>
                            <span className={`text-sm font-medium ${
                              (subjectPerf?.averageScore || 0) >= 80 ? 'text-green-600' :
                              (subjectPerf?.averageScore || 0) >= 60 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {subjectPerf?.averageScore || 'N/A'}%
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Pass Rate:</span>
                            <span className={`text-sm font-medium ${
                              (subjectPerf?.passRate || 0) >= 80 ? 'text-green-600' :
                              (subjectPerf?.passRate || 0) >= 60 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {subjectPerf?.passRate || 'N/A'}%
                            </span>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-600">Performance</span>
                              <span className="text-xs text-gray-600">{subjectPerf?.averageScore || 0}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  (subjectPerf?.averageScore || 0) >= 80 ? 'bg-green-500' :
                                  (subjectPerf?.averageScore || 0) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${subjectPerf?.averageScore || 0}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2 mt-4">
                            <button className="flex-1 px-3 py-2 text-xs bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100">
                              View Details
                            </button>
                            <button className="flex-1 px-3 py-2 text-xs bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100">
                              Assign Teacher
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Add Subject Card */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                    <PlusIcon className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-600">Add New Subject</span>
                    <span className="text-xs text-gray-500 mt-1">Click to add a subject</span>
                  </div>
                </div>

                {/* Subject Assignment Section */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Subject Teacher Assignments</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Subject</th>
                          <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Assigned Teacher</th>
                          <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Qualification</th>
                          <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Performance</th>
                          <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {currentClass.subjects.map((subject, index) => {
                          const subjectPerf = currentClass.performance.subjectPerformance.find(sp => sp.subject === subject);
                          const teacher = teachers.find(t => t.name === subjectPerf?.teacher);
                          return (
                            <tr key={index} className="hover:bg-white">
                              <td className="py-3 px-3 text-sm font-medium text-gray-900">{subject}</td>
                              <td className="py-3 px-3 text-sm text-gray-700">
                                {subjectPerf?.teacher || (
                                  <span className="text-red-500 italic">Not assigned</span>
                                )}
                              </td>
                              <td className="py-3 px-3 text-sm text-gray-700">
                                {teacher?.qualification || 'N/A'}
                              </td>
                              <td className="py-3 px-3 text-sm">
                                {subjectPerf ? (
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    subjectPerf.averageScore >= 80 ? 'bg-green-100 text-green-800' :
                                    subjectPerf.averageScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {subjectPerf.averageScore}% avg
                                  </span>
                                ) : (
                                  <span className="text-gray-400">No data</span>
                                )}
                              </td>
                              <td className="py-3 px-3 text-sm">
                                <button className="text-blue-600 hover:text-blue-800 text-xs">
                                  {subjectPerf?.teacher ? 'Change' : 'Assign'}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'timetable' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Class Timetable</h3>
                  <div className="flex space-x-2">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      <ArrowDownTrayIcon className="h-4 w-4" />
                      <span>Export</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                      <PrinterIcon className="h-4 w-4" />
                      <span>Print</span>
                    </button>
                    <button
                      onClick={() => setShowTimetableModal(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <PlusIcon className="h-4 w-4" />
                      <span>Edit Timetable</span>
                    </button>
                  </div>
                </div>

                {/* Timetable Header Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <span className="text-sm font-medium text-blue-800">Class:</span>
                      <p className="text-lg font-semibold text-blue-900">{currentClass.name}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-blue-800">Class Teacher:</span>
                      <p className="text-sm text-blue-700">{currentClass.classTeacher}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-blue-800">Room:</span>
                      <p className="text-sm text-blue-700">{currentClass.room}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-blue-800">Academic Year:</span>
                      <p className="text-sm text-blue-700">{currentClass.academicYear}</p>
                    </div>
                  </div>
                </div>

                {/* Weekly Timetable */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Time</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monday</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tuesday</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wednesday</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thursday</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Friday</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {/* Sample timetable data */}
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 bg-gray-50">7:30-8:30</td>
                          <td className="px-4 py-4">
                            <div className="bg-blue-100 border border-blue-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-blue-900">Mathematics</div>
                              <div className="text-xs text-blue-700">Mr. Kwaku Boateng</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-green-100 border border-green-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-green-900">English Language</div>
                              <div className="text-xs text-green-700">Mrs. Akosua Mensah</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-purple-100 border border-purple-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-purple-900">Science</div>
                              <div className="text-xs text-purple-700">Mr. Yaw Asante</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-yellow-900">Social Studies</div>
                              <div className="text-xs text-yellow-700">Mrs. Abena Osei</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-red-100 border border-red-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-red-900">Creative Arts</div>
                              <div className="text-xs text-red-700">Miss Adwoa Amponsah</div>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 bg-gray-50">8:30-9:30</td>
                          <td className="px-4 py-4">
                            <div className="bg-green-100 border border-green-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-green-900">English Language</div>
                              <div className="text-xs text-green-700">Mrs. Akosua Mensah</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-blue-100 border border-blue-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-blue-900">Mathematics</div>
                              <div className="text-xs text-blue-700">Mr. Kwaku Boateng</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-green-100 border border-green-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-green-900">English Language</div>
                              <div className="text-xs text-green-700">Mrs. Akosua Mensah</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-blue-100 border border-blue-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-blue-900">Mathematics</div>
                              <div className="text-xs text-blue-700">Mr. Kwaku Boateng</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-orange-100 border border-orange-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-orange-900">Physical Education</div>
                              <div className="text-xs text-orange-700">Mr. Kofi Adjei</div>
                            </div>
                          </td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 bg-gray-100">9:30-10:00</td>
                          <td className="px-4 py-4 text-center text-sm font-medium text-yellow-800" colspan="5">
                            BREAK TIME
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 bg-gray-50">10:00-11:00</td>
                          <td className="px-4 py-4">
                            <div className="bg-purple-100 border border-purple-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-purple-900">Science</div>
                              <div className="text-xs text-purple-700">Mr. Yaw Asante</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-yellow-900">Social Studies</div>
                              <div className="text-xs text-yellow-700">Mrs. Abena Osei</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-blue-100 border border-blue-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-blue-900">Mathematics</div>
                              <div className="text-xs text-blue-700">Mr. Kwaku Boateng</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-green-100 border border-green-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-green-900">English Language</div>
                              <div className="text-xs text-green-700">Mrs. Akosua Mensah</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-indigo-100 border border-indigo-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-indigo-900">Ghanaian Language</div>
                              <div className="text-xs text-indigo-700">Mrs. Ama Serwaa</div>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 bg-gray-50">11:00-12:00</td>
                          <td className="px-4 py-4">
                            <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-yellow-900">Social Studies</div>
                              <div className="text-xs text-yellow-700">Mrs. Abena Osei</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-red-100 border border-red-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-red-900">Creative Arts</div>
                              <div className="text-xs text-red-700">Miss Adwoa Amponsah</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-pink-100 border border-pink-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-pink-900">RME</div>
                              <div className="text-xs text-pink-700">Rev. Kwame Osei</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-purple-100 border border-purple-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-purple-900">Science</div>
                              <div className="text-xs text-purple-700">Mr. Yaw Asante</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-teal-100 border border-teal-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-teal-900">ICT</div>
                              <div className="text-xs text-teal-700">Mr. Kwabena Osei</div>
                            </div>
                          </td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 bg-gray-100">12:00-13:00</td>
                          <td className="px-4 py-4 text-center text-sm font-medium text-blue-800" colspan="5">
                            LUNCH BREAK
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 bg-gray-50">13:00-14:00</td>
                          <td className="px-4 py-4">
                            <div className="bg-red-100 border border-red-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-red-900">Creative Arts</div>
                              <div className="text-xs text-red-700">Miss Adwoa Amponsah</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-orange-100 border border-orange-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-orange-900">Physical Education</div>
                              <div className="text-xs text-orange-700">Mr. Kofi Adjei</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-yellow-900">Social Studies</div>
                              <div className="text-xs text-yellow-700">Mrs. Abena Osei</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-red-100 border border-red-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-red-900">Creative Arts</div>
                              <div className="text-xs text-red-700">Miss Adwoa Amponsah</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-gray-100 border border-gray-300 rounded-lg p-2">
                              <div className="text-sm font-medium text-gray-700">Study Period</div>
                              <div className="text-xs text-gray-600">Class Teacher</div>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 bg-gray-50">14:00-15:00</td>
                          <td className="px-4 py-4">
                            <div className="bg-indigo-100 border border-indigo-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-indigo-900">Ghanaian Language</div>
                              <div className="text-xs text-indigo-700">Mrs. Ama Serwaa</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-teal-100 border border-teal-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-teal-900">ICT</div>
                              <div className="text-xs text-teal-700">Mr. Kwabena Osei</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-red-100 border border-red-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-red-900">Creative Arts</div>
                              <div className="text-xs text-red-700">Miss Adwoa Amponsah</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-indigo-100 border border-indigo-200 rounded-lg p-2">
                              <div className="text-sm font-medium text-indigo-900">Ghanaian Language</div>
                              <div className="text-xs text-indigo-700">Mrs. Ama Serwaa</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="bg-gray-100 border border-gray-300 rounded-lg p-2">
                              <div className="text-sm font-medium text-gray-700">Assembly</div>
                              <div className="text-xs text-gray-600">All Teachers</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Timetable Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Daily Schedule</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">School Start:</span>
                        <span className="font-medium">7:30 AM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Break Time:</span>
                        <span className="font-medium">9:30 - 10:00 AM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lunch Break:</span>
                        <span className="font-medium">12:00 - 1:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">School End:</span>
                        <span className="font-medium">3:00 PM</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Subject Distribution</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mathematics:</span>
                        <span className="font-medium">5 periods/week</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">English:</span>
                        <span className="font-medium">5 periods/week</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Science:</span>
                        <span className="font-medium">3 periods/week</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Others:</span>
                        <span className="font-medium">12 periods/week</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Teacher Workload</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mrs. Akosua Mensah:</span>
                        <span className="font-medium">8 periods</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mr. Kwaku Boateng:</span>
                        <span className="font-medium">7 periods</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mr. Yaw Asante:</span>
                        <span className="font-medium">5 periods</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Others:</span>
                        <span className="font-medium">5 periods</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Class Performance Analytics</h3>
                
                {/* Top Performers */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <StarIcon className="h-6 w-6 text-yellow-600" />
                    <h4 className="font-semibold text-yellow-800">Top Performers</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentClass.performance.topPerformers.map((student, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            index === 0 ? 'bg-yellow-500 text-white' :
                            index === 1 ? 'bg-gray-400 text-white' :
                            'bg-orange-500 text-white'
                          }`}>
                            {index + 1}
                          </div>
                        </div>
                        <span className="font-medium text-gray-900">{student}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subject Performance */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Subject Performance</h4>
                  <div className="space-y-4">
                    {currentClass.performance.subjectPerformance.map((subject, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{subject.subject}</h5>
                          <span className="text-sm text-gray-500">Teacher: {subject.teacher}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm text-gray-500">Average Score:</span>
                            <p className="text-lg font-semibold text-blue-600">{subject.averageScore}%</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Pass Rate:</span>
                            <p className="text-lg font-semibold text-green-600">{subject.passRate}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    if (selectedClass) {
      return renderClassDetails();
    }
    return renderOverview();
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <AcademicCapIcon className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Class Management</h1>
                <p className="text-sm text-gray-500">Ghana Primary School System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto max-h-[calc(100vh-200px)]">
        {renderTabContent()}
      </div>

      {/* Create Class Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Create New Class</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Class Level</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Select Level</option>
                    {ghanaLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Section</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Select Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Class Teacher</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Select Teacher</option>
                    {teachers.map(teacher => (
                      <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Room Number</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g., Room 101"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Capacity</label>
                  <input
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="35"
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Create Class
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-[500px] shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add Student to Class</h3>
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Kwame"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Asante"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Index Number</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="GH2024001"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Parent/Guardian Contact</label>
                  <input
                    type="tel"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="+233 24 123 4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Student's home address"
                  ></textarea>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowStudentModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Add Student
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timetable Modal */}
      {showTimetableModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-5 mx-auto p-5 border w-[95%] max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Timetable Builder</h3>
                  <p className="text-sm text-gray-500 mt-1">Create and manage weekly schedule for {selectedClass?.name}</p>
                </div>
                <button
                  onClick={() => setShowTimetableModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Timetable Configuration */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-3">Timetable Configuration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-800 mb-1">Academic Year</label>
                      <select className="w-full border border-blue-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="2024/2025">2024/2025</option>
                        <option value="2023/2024">2023/2024</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-800 mb-1">Term</label>
                      <select className="w-full border border-blue-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="1">First Term</option>
                        <option value="2">Second Term</option>
                        <option value="3">Third Term</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-800 mb-1">Effective Date</label>
                      <input 
                        type="date" 
                        className="w-full border border-blue-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Time Slots Configuration */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Time Slots</h4>
                    <button className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
                      <PlusIcon className="h-4 w-4" />
                      <span>Add Time Slot</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { period: '1st Period', time: '7:30 - 8:30 AM', type: 'regular' },
                      { period: '2nd Period', time: '8:30 - 9:30 AM', type: 'regular' },
                      { period: 'Break', time: '9:30 - 10:00 AM', type: 'break' },
                      { period: '3rd Period', time: '10:00 - 11:00 AM', type: 'regular' },
                      { period: '4th Period', time: '11:00 - 12:00 PM', type: 'regular' },
                      { period: 'Lunch', time: '12:00 - 1:00 PM', type: 'break' },
                      { period: '5th Period', time: '1:00 - 2:00 PM', type: 'regular' },
                      { period: '6th Period', time: '2:00 - 3:00 PM', type: 'regular' }
                    ].map((slot, index) => (
                      <div key={index} className={`border rounded-lg p-3 ${
                        slot.type === 'break' ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-200'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">{slot.period}</span>
                          {slot.type === 'regular' && (
                            <button className="text-gray-400 hover:text-red-600">
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">{slot.time}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subject Assignment */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Subject & Teacher Assignment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Available Subjects</label>
                      <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto">
                        {currentClass?.subjects.map((subject, index) => {
                          const subjectPerf = currentClass.performance.subjectPerformance.find(sp => sp.subject === subject);
                          return (
                            <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                              <div className="flex items-center space-x-3">
                                <BookOpenIcon className="h-4 w-4 text-blue-600" />
                                <div>
                                  <span className="text-sm font-medium text-gray-900">{subject}</span>
                                  <p className="text-xs text-gray-500">{subjectPerf?.teacher || 'No teacher assigned'}</p>
                                </div>
                              </div>
                              <button className="text-blue-600 hover:text-blue-800 text-xs">
                                Assign
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Available Teachers</label>
                      <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto">
                        {teachers.map((teacher, index) => (
                          <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                            <div className="flex items-center space-x-3">
                              <UserIcon className="h-4 w-4 text-green-600" />
                              <div>
                                <span className="text-sm font-medium text-gray-900">{teacher.name}</span>
                                <p className="text-xs text-gray-500">{teacher.qualification}</p>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">{teacher.subjects.length} subjects</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weekly Timetable Builder */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-900">Weekly Schedule Builder</h4>
                    <p className="text-sm text-gray-600 mt-1">Click on time slots to assign subjects and teachers</p>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Time</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monday</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tuesday</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wednesday</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thursday</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Friday</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {/* Regular Periods */}
                        {[
                          { time: '7:30-8:30', period: '1st Period' },
                          { time: '8:30-9:30', period: '2nd Period' }
                        ].map((slot, rowIndex) => (
                          <tr key={rowIndex} className="hover:bg-gray-50">
                            <td className="px-3 py-3 text-sm font-medium text-gray-900 bg-gray-50">{slot.time}</td>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, dayIndex) => (
                              <td key={dayIndex} className="px-3 py-3">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 min-h-[60px] hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-colors">
                                  <div className="text-center">
                                    <PlusIcon className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                                    <span className="text-xs text-gray-500">Add Subject</span>
                                  </div>
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                        
                        {/* Break Time */}
                        <tr className="bg-yellow-50">
                          <td className="px-3 py-3 text-sm font-medium text-gray-900 bg-yellow-100">9:30-10:00</td>
                          <td className="px-3 py-3 text-center text-sm font-medium text-yellow-800" colSpan={5}>
                            BREAK TIME
                          </td>
                        </tr>
                        
                        {/* More Regular Periods */}
                        {[
                          { time: '10:00-11:00', period: '3rd Period' },
                          { time: '11:00-12:00', period: '4th Period' }
                        ].map((slot, rowIndex) => (
                          <tr key={rowIndex + 2} className="hover:bg-gray-50">
                            <td className="px-3 py-3 text-sm font-medium text-gray-900 bg-gray-50">{slot.time}</td>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, dayIndex) => (
                              <td key={dayIndex} className="px-3 py-3">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 min-h-[60px] hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-colors">
                                  <div className="text-center">
                                    <PlusIcon className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                                    <span className="text-xs text-gray-500">Add Subject</span>
                                  </div>
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                        
                        {/* Lunch Break */}
                        <tr className="bg-blue-50">
                          <td className="px-3 py-3 text-sm font-medium text-gray-900 bg-blue-100">12:00-13:00</td>
                          <td className="px-3 py-3 text-center text-sm font-medium text-blue-800" colSpan={5}>
                            LUNCH BREAK
                          </td>
                        </tr>
                        
                        {/* Afternoon Periods */}
                        {[
                          { time: '13:00-14:00', period: '5th Period' },
                          { time: '14:00-15:00', period: '6th Period' }
                        ].map((slot, rowIndex) => (
                          <tr key={rowIndex + 4} className="hover:bg-gray-50">
                            <td className="px-3 py-3 text-sm font-medium text-gray-900 bg-gray-50">{slot.time}</td>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, dayIndex) => (
                              <td key={dayIndex} className="px-3 py-3">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 min-h-[60px] hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-colors">
                                  <div className="text-center">
                                    <PlusIcon className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                                    <span className="text-xs text-gray-500">Add Subject</span>
                                  </div>
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Timetable Actions */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Timetable Actions</h4>
                    <div className="flex space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 text-sm">
                        <DocumentTextIcon className="h-4 w-4" />
                        <span>Auto-Generate</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm">
                        <ClipboardDocumentListIcon className="h-4 w-4" />
                        <span>Load Template</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <h5 className="font-medium text-gray-900 mb-2">Validation Status</h5>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <CheckCircleIcon className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-700">No conflicts detected</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ExclamationTriangleIcon className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm text-gray-700">2 unassigned periods</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <h5 className="font-medium text-gray-900 mb-2">Subject Distribution</h5>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Mathematics:</span>
                          <span>0/5 periods</span>
                        </div>
                        <div className="flex justify-between">
                          <span>English:</span>
                          <span>0/5 periods</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Science:</span>
                          <span>0/3 periods</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <h5 className="font-medium text-gray-900 mb-2">Teacher Workload</h5>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Total periods:</span>
                          <span>0/25</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Assigned:</span>
                          <span>0 teachers</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Conflicts:</span>
                          <span className="text-green-600">None</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowTimetableModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                    Save as Draft
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Publish Timetable
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassManagement;