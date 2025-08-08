import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, TrendingUp, Download, Search, Filter, Plus, Check, X, AlertTriangle, BarChart3, PieChart, UserCheck, GraduationCap, Briefcase } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  personId: string;
  personName: string;
  personType: 'student' | 'teacher' | 'staff';
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  timeIn?: string;
  timeOut?: string;
  reason?: string;
  markedBy: string;
  class?: string;
  level?: string;
}

interface Person {
  id: string;
  name: string;
  type: 'student' | 'teacher' | 'staff';
  class?: string;
  level?: string;
  department?: string;
  position?: string;
  studentId?: string;
  staffId?: string;
  teacherId?: string;
}

interface AttendanceStats {
  totalPresent: number;
  totalAbsent: number;
  totalLate: number;
  totalExcused: number;
  attendanceRate: number;
}

const AttendanceManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'mark' | 'reports' | 'analytics'>('overview');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedPersonType, setSelectedPersonType] = useState<'all' | 'student' | 'teacher' | 'staff'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [showMarkModal, setShowMarkModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [attendanceStatus, setAttendanceStatus] = useState<'present' | 'absent' | 'late' | 'excused'>('present');
  const [reason, setReason] = useState('');
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');

  // Sample data
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: '1',
      personId: 'STU001',
      personName: 'Kwame Asante',
      personType: 'student',
      date: '2024-01-15',
      status: 'present',
      timeIn: '07:30',
      markedBy: 'Mrs. Akosua Mensah',
      class: 'Primary 4A',
      level: 'Primary 4'
    },
    {
      id: '2',
      personId: 'TEA001',
      personName: 'Mrs. Akosua Mensah',
      personType: 'teacher',
      date: '2024-01-15',
      status: 'present',
      timeIn: '07:00',
      timeOut: '15:30',
      markedBy: 'System',
      department: 'Mathematics'
    },
    {
      id: '3',
      personId: 'STU002',
      personName: 'Ama Osei',
      personType: 'student',
      date: '2024-01-15',
      status: 'late',
      timeIn: '08:15',
      reason: 'Transportation delay',
      markedBy: 'Mrs. Akosua Mensah',
      class: 'Primary 4A',
      level: 'Primary 4'
    },
    {
      id: '4',
      personId: 'STA001',
      personName: 'Mr. Kofi Adjei',
      personType: 'staff',
      date: '2024-01-15',
      status: 'present',
      timeIn: '07:15',
      timeOut: '16:00',
      markedBy: 'System',
      position: 'Security Guard'
    }
  ]);

  const [people, setPeople] = useState<Person[]>([
    { id: 'STU001', name: 'Kwame Asante', type: 'student', class: 'Primary 4A', level: 'Primary 4', studentId: 'STU001' },
    { id: 'STU002', name: 'Ama Osei', type: 'student', class: 'Primary 4A', level: 'Primary 4', studentId: 'STU002' },
    { id: 'STU003', name: 'Yaw Boateng', type: 'student', class: 'Primary 5B', level: 'Primary 5', studentId: 'STU003' },
    { id: 'TEA001', name: 'Mrs. Akosua Mensah', type: 'teacher', department: 'Mathematics', teacherId: 'TEA001' },
    { id: 'TEA002', name: 'Mr. Kwaku Owusu', type: 'teacher', department: 'English', teacherId: 'TEA002' },
    { id: 'STA001', name: 'Mr. Kofi Adjei', type: 'staff', position: 'Security Guard', staffId: 'STA001' },
    { id: 'STA002', name: 'Mrs. Efua Darko', type: 'staff', position: 'Cleaner', staffId: 'STA002' }
  ]);

  const classes = ['Primary 1A', 'Primary 1B', 'Primary 2A', 'Primary 2B', 'Primary 3A', 'Primary 3B', 'Primary 4A', 'Primary 4B', 'Primary 5A', 'Primary 5B', 'Primary 6A', 'Primary 6B', 'KG 1A', 'KG 1B', 'KG 2A', 'KG 2B', 'Nursery 1', 'Nursery 2'];
  const levels = ['Nursery 1', 'Nursery 2', 'KG 1', 'KG 2', 'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'];

  // Calculate attendance statistics
  const calculateStats = (records: AttendanceRecord[], date: string): AttendanceStats => {
    const dayRecords = records.filter(record => record.date === date);
    const totalPresent = dayRecords.filter(record => record.status === 'present').length;
    const totalAbsent = dayRecords.filter(record => record.status === 'absent').length;
    const totalLate = dayRecords.filter(record => record.status === 'late').length;
    const totalExcused = dayRecords.filter(record => record.status === 'excused').length;
    const total = dayRecords.length;
    const attendanceRate = total > 0 ? ((totalPresent + totalLate + totalExcused) / total) * 100 : 0;

    return { totalPresent, totalAbsent, totalLate, totalExcused, attendanceRate };
  };

  const todayStats = calculateStats(attendanceRecords, selectedDate);

  // Filter people based on search and filters
  const filteredPeople = people.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedPersonType === 'all' || person.type === selectedPersonType;
    const matchesClass = selectedClass === 'all' || person.class === selectedClass;
    const matchesLevel = selectedLevel === 'all' || person.level === selectedLevel;
    
    return matchesSearch && matchesType && matchesClass && matchesLevel;
  });

  // Filter attendance records
  const filteredRecords = attendanceRecords.filter(record => {
    const matchesDate = record.date === selectedDate;
    const matchesType = selectedPersonType === 'all' || record.personType === selectedPersonType;
    const matchesClass = selectedClass === 'all' || record.class === selectedClass;
    const matchesLevel = selectedLevel === 'all' || record.level === selectedLevel;
    const matchesSearch = record.personName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDate && matchesType && matchesClass && matchesLevel && matchesSearch;
  });

  const handleMarkAttendance = () => {
    if (!selectedPerson) return;

    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      personId: selectedPerson.id,
      personName: selectedPerson.name,
      personType: selectedPerson.type,
      date: selectedDate,
      status: attendanceStatus,
      timeIn: timeIn || undefined,
      timeOut: timeOut || undefined,
      reason: reason || undefined,
      markedBy: 'Current User',
      class: selectedPerson.class,
      level: selectedPerson.level
    };

    setAttendanceRecords(prev => [...prev, newRecord]);
    setShowMarkModal(false);
    setSelectedPerson(null);
    setReason('');
    setTimeIn('');
    setTimeOut('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-100';
      case 'absent': return 'text-red-600 bg-red-100';
      case 'late': return 'text-yellow-600 bg-yellow-100';
      case 'excused': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPersonIcon = (type: string) => {
    switch (type) {
      case 'student': return <GraduationCap className="w-4 h-4" />;
      case 'teacher': return <UserCheck className="w-4 h-4" />;
      case 'staff': return <Briefcase className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Management</h1>
        <p className="text-gray-600">Track and manage attendance for students, teachers, and staff</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Present Today</p>
              <p className="text-2xl font-bold text-green-600">{todayStats.totalPresent}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Absent Today</p>
              <p className="text-2xl font-bold text-red-600">{todayStats.totalAbsent}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <X className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Late Today</p>
              <p className="text-2xl font-bold text-yellow-600">{todayStats.totalLate}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Excused Today</p>
              <p className="text-2xl font-bold text-blue-600">{todayStats.totalExcused}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
              <p className="text-2xl font-bold text-indigo-600">{todayStats.attendanceRate.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: Users },
              { id: 'mark', label: 'Mark Attendance', icon: UserCheck },
              { id: 'reports', label: 'Reports', icon: BarChart3 },
              { id: 'analytics', label: 'Analytics', icon: PieChart }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Person Type</label>
            <select
              value={selectedPersonType}
              onChange={(e) => setSelectedPersonType(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Types</option>
              <option value="student">Students</option>
              <option value="teacher">Teachers</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Classes</option>
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Levels</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setShowMarkModal(true)}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Mark Attendance</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Today's Attendance - {selectedDate}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Person</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class/Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time In</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Out</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marked By</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map(record => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            {getPersonIcon(record.personType)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{record.personName}</div>
                          <div className="text-sm text-gray-500">{record.personId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                        {record.personType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.class || record.level || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.timeIn || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.timeOut || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.reason || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.markedBy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'mark' && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Mark Attendance - {selectedDate}</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPeople.map(person => {
                const hasAttendance = attendanceRecords.some(
                  record => record.personId === person.id && record.date === selectedDate
                );
                
                return (
                  <div key={person.id} className={`border rounded-lg p-4 ${hasAttendance ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          {getPersonIcon(person.type)}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{person.name}</h3>
                          <p className="text-xs text-gray-500">{person.id}</p>
                        </div>
                      </div>
                      {hasAttendance && (
                        <div className="text-green-600">
                          <Check className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-600 mb-3">
                      <p><span className="font-medium">Type:</span> {person.type}</p>
                      {person.class && <p><span className="font-medium">Class:</span> {person.class}</p>}
                      {person.level && <p><span className="font-medium">Level:</span> {person.level}</p>}
                      {person.department && <p><span className="font-medium">Department:</span> {person.department}</p>}
                      {person.position && <p><span className="font-medium">Position:</span> {person.position}</p>}
                    </div>
                    
                    {!hasAttendance && (
                      <button
                        onClick={() => {
                          setSelectedPerson(person);
                          setShowMarkModal(true);
                        }}
                        className="w-full bg-indigo-600 text-white px-3 py-2 rounded-md text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        Mark Attendance
                      </button>
                    )}
                    
                    {hasAttendance && (
                      <div className="text-xs text-green-600 font-medium">
                        Attendance already marked
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Attendance Reports</h2>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Daily Report</h3>
                <p className="text-sm text-gray-600 mb-4">Generate attendance report for a specific day</p>
                <button className="w-full bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700">
                  Generate Daily Report
                </button>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Weekly Report</h3>
                <p className="text-sm text-gray-600 mb-4">Generate attendance report for a week</p>
                <button className="w-full bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700">
                  Generate Weekly Report
                </button>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Monthly Report</h3>
                <p className="text-sm text-gray-600 mb-4">Generate attendance report for a month</p>
                <button className="w-full bg-purple-600 text-white px-3 py-2 rounded-md text-sm hover:bg-purple-700">
                  Generate Monthly Report
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Summary by Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">85%</div>
                <div className="text-sm text-gray-600">Student Attendance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">95%</div>
                <div className="text-sm text-gray-600">Teacher Attendance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">92%</div>
                <div className="text-sm text-gray-600">Staff Attendance</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-4">Attendance Trends</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                    <p>Attendance trend chart would be displayed here</p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-4">Attendance Distribution</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <PieChart className="w-12 h-12 mx-auto mb-2" />
                    <p>Attendance distribution chart would be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Best Performing Class</h4>
                <p className="text-sm text-blue-700">Primary 4A with 95% attendance</p>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-2">Needs Attention</h4>
                <p className="text-sm text-yellow-700">Primary 2B with 78% attendance</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Most Punctual</h4>
                <p className="text-sm text-green-700">Teachers with 98% on-time rate</p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-2">Weekly Average</h4>
                <p className="text-sm text-purple-700">87% overall attendance rate</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mark Attendance Modal */}
      {showMarkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Mark Attendance</h3>
              <button
                onClick={() => setShowMarkModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {selectedPerson && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      {getPersonIcon(selectedPerson.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{selectedPerson.name}</h4>
                      <p className="text-sm text-gray-500">{selectedPerson.id} • {selectedPerson.type}</p>
                      {selectedPerson.class && <p className="text-sm text-gray-500">{selectedPerson.class}</p>}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attendance Status</label>
                  <select
                    value={attendanceStatus}
                    onChange={(e) => setAttendanceStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                    <option value="excused">Excused</option>
                  </select>
                </div>
                
                {(attendanceStatus === 'present' || attendanceStatus === 'late') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time In</label>
                    <input
                      type="time"
                      value={timeIn}
                      onChange={(e) => setTimeIn(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                )}
                
                {selectedPerson.type === 'teacher' || selectedPerson.type === 'staff' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Out</label>
                    <input
                      type="time"
                      value={timeOut}
                      onChange={(e) => setTimeOut(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                ) : null}
                
                {(attendanceStatus === 'absent' || attendanceStatus === 'late' || attendanceStatus === 'excused') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Enter reason for absence/lateness..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      rows={3}
                    />
                  </div>
                )}
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowMarkModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleMarkAttendance}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Mark Attendance
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceManagement;