import React, { useState } from 'react';
import {
  UserIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
  DocumentArrowDownIcon,
  PhoneIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ChartBarIcon,
  CreditCardIcon,
  PrinterIcon,
  EyeIcon,
  PlusIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface Child {
  id: string;
  name: string;
  class: string;
  rollNumber: string;
  avatar: string;
  overallGrade: string;
  attendance: number;
  lastExamScore: number;
  nextExam: string;
  recentAlerts: number;
}

interface AcademicRecord {
  subject: string;
  currentGrade: string;
  lastExam: number;
  average: number;
  teacher: string;
  trend: 'up' | 'down' | 'stable';
}

interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late';
  reason?: string;
}

interface FeeRecord {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  method: string;
  status: 'completed' | 'pending' | 'failed';
}

interface Message {
  id: string;
  from: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
  type: 'teacher' | 'admin' | 'system';
}

interface Alert {
  id: string;
  type: 'academic' | 'attendance' | 'behavior' | 'fee';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  date: string;
  read: boolean;
  aiGenerated: boolean;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'exam' | 'meeting' | 'event' | 'holiday';
  description: string;
}

const Parent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedChild, setSelectedChild] = useState('1');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState<FeeRecord | null>(null);

  // Sample data
  const children: Child[] = [
    {
      id: '1',
      name: 'Emma Johnson',
      class: 'Grade 8A',
      rollNumber: '2024-08-015',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      overallGrade: 'A-',
      attendance: 92,
      lastExamScore: 87,
      nextExam: 'Mathematics - Dec 15',
      recentAlerts: 1
    },
    {
      id: '2',
      name: 'James Johnson',
      class: 'Grade 5B',
      rollNumber: '2024-05-023',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      overallGrade: 'B+',
      attendance: 88,
      lastExamScore: 78,
      nextExam: 'Science - Dec 18',
      recentAlerts: 2
    }
  ];

  const academicRecords: AcademicRecord[] = [
    { subject: 'Mathematics', currentGrade: 'A-', lastExam: 87, average: 85, teacher: 'Mr. Smith', trend: 'up' },
    { subject: 'English', currentGrade: 'A', lastExam: 92, average: 89, teacher: 'Ms. Davis', trend: 'stable' },
    { subject: 'Science', currentGrade: 'B+', lastExam: 82, average: 84, teacher: 'Dr. Wilson', trend: 'down' },
    { subject: 'History', currentGrade: 'A-', lastExam: 88, average: 86, teacher: 'Mr. Brown', trend: 'up' },
    { subject: 'Art', currentGrade: 'A', lastExam: 95, average: 93, teacher: 'Ms. Garcia', trend: 'stable' }
  ];

  const attendanceRecords: AttendanceRecord[] = [
    { date: '2024-12-09', status: 'present' },
    { date: '2024-12-08', status: 'present' },
    { date: '2024-12-07', status: 'late', reason: 'Traffic delay' },
    { date: '2024-12-06', status: 'present' },
    { date: '2024-12-05', status: 'absent', reason: 'Sick leave' },
    { date: '2024-12-04', status: 'present' },
    { date: '2024-12-03', status: 'present' }
  ];

  const feeRecords: FeeRecord[] = [
    { id: '1', description: 'Tuition Fee - December 2024', amount: 1200, dueDate: '2024-12-15', status: 'pending' },
    { id: '2', description: 'Library Fee', amount: 50, dueDate: '2024-12-10', status: 'overdue' },
    { id: '3', description: 'Sports Activity Fee', amount: 100, dueDate: '2024-12-20', status: 'pending' },
    { id: '4', description: 'Tuition Fee - November 2024', amount: 1200, dueDate: '2024-11-15', status: 'paid', paidDate: '2024-11-12' }
  ];

  const transactions: Transaction[] = [
    { id: '1', date: '2024-11-12', description: 'Tuition Fee - November 2024', amount: 1200, method: 'Credit Card', status: 'completed' },
    { id: '2', date: '2024-10-15', description: 'Tuition Fee - October 2024', amount: 1200, method: 'Bank Transfer', status: 'completed' },
    { id: '3', date: '2024-09-18', description: 'Annual Sports Fee', amount: 300, method: 'Credit Card', status: 'completed' }
  ];

  const messages: Message[] = [
    {
      id: '1',
      from: 'Ms. Davis (English Teacher)',
      subject: 'Excellent Progress in Literature',
      content: 'Emma has shown remarkable improvement in her literature analysis. Her recent essay on Shakespeare was outstanding.',
      date: '2024-12-08',
      read: false,
      type: 'teacher'
    },
    {
      id: '2',
      from: 'School Administration',
      subject: 'Parent-Teacher Conference Reminder',
      content: 'This is a reminder about the upcoming parent-teacher conference scheduled for December 15th at 3:00 PM.',
      date: '2024-12-07',
      read: true,
      type: 'admin'
    },
    {
      id: '3',
      from: 'Mr. Smith (Math Teacher)',
      subject: 'Math Competition Opportunity',
      content: 'Emma has been selected to participate in the inter-school mathematics competition. Please confirm her participation.',
      date: '2024-12-05',
      read: true,
      type: 'teacher'
    }
  ];

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'academic',
      severity: 'medium',
      title: 'Science Grade Declining',
      description: 'Emma\'s science grades have dropped from A- to B+ over the last month. Consider additional support.',
      date: '2024-12-08',
      read: false,
      aiGenerated: true
    },
    {
      id: '2',
      type: 'fee',
      severity: 'high',
      title: 'Overdue Library Fee',
      description: 'Library fee of $50 is overdue. Please make payment to avoid late charges.',
      date: '2024-12-07',
      read: false,
      aiGenerated: false
    },
    {
      id: '3',
      type: 'attendance',
      severity: 'low',
      title: 'Attendance Notice',
      description: 'Emma was late to school on December 7th. Please ensure timely arrival.',
      date: '2024-12-07',
      read: true,
      aiGenerated: false
    }
  ];

  const events: Event[] = [
    { id: '1', title: 'Mathematics Exam', date: '2024-12-15', time: '09:00 AM', type: 'exam', description: 'Mid-term mathematics examination' },
    { id: '2', title: 'Parent-Teacher Conference', date: '2024-12-15', time: '03:00 PM', type: 'meeting', description: 'Individual parent-teacher meetings' },
    { id: '3', title: 'Science Fair', date: '2024-12-18', time: '10:00 AM', type: 'event', description: 'Annual school science fair exhibition' },
    { id: '4', title: 'Winter Break', date: '2024-12-20', time: 'All Day', type: 'holiday', description: 'Winter vacation begins' }
  ];

  const currentChild = children.find(child => child.id === selectedChild) || children[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-100';
      case 'absent': return 'text-red-600 bg-red-100';
      case 'late': return 'text-yellow-600 bg-yellow-100';
      case 'paid': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ChartBarIcon className="h-4 w-4 text-green-500" />;
      case 'down': return <ChartBarIcon className="h-4 w-4 text-red-500 transform rotate-180" />;
      default: return <ChartBarIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Child Selector */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Child</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children.map((child) => (
            <div
              key={child.id}
              onClick={() => setSelectedChild(child.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedChild === child.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={child.avatar}
                  alt={child.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{child.name}</h4>
                  <p className="text-sm text-gray-500">{child.class} • Roll: {child.rollNumber}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm font-medium text-purple-600">Grade: {child.overallGrade}</span>
                    <span className="text-sm text-gray-600">Attendance: {child.attendance}%</span>
                  </div>
                </div>
                {child.recentAlerts > 0 && (
                  <div className="flex items-center space-x-1">
                    <BellIcon className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-600">{child.recentAlerts}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AcademicCapIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Overall Grade</p>
              <p className="text-2xl font-semibold text-gray-900">{currentChild.overallGrade}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarDaysIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Attendance</p>
              <p className="text-2xl font-semibold text-gray-900">{currentChild.attendance}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Last Exam</p>
              <p className="text-2xl font-semibold text-gray-900">{currentChild.lastExamScore}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BellIcon className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Alerts</p>
              <p className="text-2xl font-semibold text-gray-900">{currentChild.recentAlerts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Academic Performance</h3>
          <div className="space-y-3">
            {academicRecords.slice(0, 3).map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(record.trend)}
                    <span className="font-medium text-gray-900">{record.subject}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-purple-600">{record.currentGrade}</p>
                  <p className="text-sm text-gray-500">Avg: {record.average}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {events.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  event.type === 'exam' ? 'bg-red-100 text-red-600' :
                  event.type === 'meeting' ? 'bg-blue-100 text-blue-600' :
                  event.type === 'event' ? 'bg-green-100 text-green-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  <CalendarDaysIcon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAcademics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Academic Performance - {currentChild.name}</h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <DocumentArrowDownIcon className="h-4 w-4" />
            <span>Download Report</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Exam</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {academicRecords.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{record.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {record.currentGrade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.lastExam}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.average}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.teacher}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(record.trend)}
                      <span className="text-sm text-gray-500 capitalize">{record.trend}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Attendance Record - {currentChild.name}</h3>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Overall Attendance: <span className="font-semibold text-purple-600">{currentChild.attendance}%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">Present Days</p>
                <p className="text-2xl font-semibold text-green-900">
                  {attendanceRecords.filter(r => r.status === 'present').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-800">Late Days</p>
                <p className="text-2xl font-semibold text-yellow-900">
                  {attendanceRecords.filter(r => r.status === 'late').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <XCircleIcon className="h-8 w-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">Absent Days</p>
                <p className="text-2xl font-semibold text-red-900">
                  {attendanceRecords.filter(r => r.status === 'absent').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceRecords.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.reason || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFees = () => (
    <div className="space-y-6">
      {/* Fee Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BanknotesIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Paid</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClockIcon className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${feeRecords.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Overdue</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${feeRecords.filter(f => f.status === 'overdue').reduce((sum, f) => sum + f.amount, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Outstanding Fees */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Outstanding Fees</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feeRecords.filter(fee => fee.status !== 'paid').map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{fee.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${fee.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(fee.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(fee.status)}`}>
                      {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedFee(fee);
                        setShowPaymentModal(true);
                      }}
                      className="text-purple-600 hover:text-purple-900"
                    >
                      Pay Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{transaction.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCommunication = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setShowMessageModal(true)}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <EnvelopeIcon className="h-6 w-6 text-purple-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Send Message</p>
              <p className="text-sm text-gray-500">Contact teacher or admin</p>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <PhoneIcon className="h-6 w-6 text-green-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Schedule Call</p>
              <p className="text-sm text-gray-500">Book phone consultation</p>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <CalendarDaysIcon className="h-6 w-6 text-blue-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Book Meeting</p>
              <p className="text-sm text-gray-500">Schedule in-person meeting</p>
            </div>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                !message.read ? 'border-purple-200 bg-purple-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className={`font-medium ${!message.read ? 'text-purple-900' : 'text-gray-900'}`}>
                      {message.from}
                    </p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      message.type === 'teacher' ? 'bg-blue-100 text-blue-800' :
                      message.type === 'admin' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {message.type}
                    </span>
                  </div>
                  <p className={`font-medium mb-2 ${!message.read ? 'text-purple-800' : 'text-gray-800'}`}>
                    {message.subject}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">{message.content}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-sm text-gray-500">{new Date(message.date).toLocaleDateString()}</p>
                  {!message.read && (
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 ml-auto"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Alerts & Notifications</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {alerts.filter(a => !a.read).length} unread
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 border rounded-lg ${getSeverityColor(alert.severity)} ${
                !alert.read ? 'border-l-4 border-l-purple-500' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`p-1 rounded ${
                      alert.type === 'academic' ? 'bg-blue-100 text-blue-600' :
                      alert.type === 'attendance' ? 'bg-yellow-100 text-yellow-600' :
                      alert.type === 'behavior' ? 'bg-red-100 text-red-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {alert.type === 'academic' && <AcademicCapIcon className="h-4 w-4" />}
                      {alert.type === 'attendance' && <CalendarDaysIcon className="h-4 w-4" />}
                      {alert.type === 'behavior' && <ExclamationTriangleIcon className="h-4 w-4" />}
                      {alert.type === 'fee' && <BanknotesIcon className="h-4 w-4" />}
                    </div>
                    <p className="font-medium text-gray-900">{alert.title}</p>
                    {alert.aiGenerated && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                        AI Alert
                      </span>
                    )}
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                      alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.severity} priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                  <p className="text-xs text-gray-500">{new Date(alert.date).toLocaleDateString()}</p>
                </div>
                {!alert.read && (
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">School Calendar & Events</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Upcoming Events</h4>
            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${
                    event.type === 'exam' ? 'bg-red-100 text-red-600' :
                    event.type === 'meeting' ? 'bg-blue-100 text-blue-600' :
                    event.type === 'event' ? 'bg-green-100 text-green-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    <CalendarDaysIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-sm text-gray-500">{event.date}</p>
                      <p className="text-sm text-gray-500">{event.time}</p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        event.type === 'exam' ? 'bg-red-100 text-red-800' :
                        event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                        event.type === 'event' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar View */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">December 2024</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
                  const hasEvent = events.some(event => 
                    new Date(event.date).getDate() === date
                  );
                  return (
                    <div
                      key={date}
                      className={`text-center text-sm py-2 rounded ${
                        hasEvent
                          ? 'bg-purple-100 text-purple-800 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {date}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'academics': return renderAcademics();
      case 'attendance': return renderAttendance();
      case 'fees': return renderFees();
      case 'communication': return renderCommunication();
      case 'alerts': return renderAlerts();
      case 'calendar': return renderCalendar();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <UserIcon className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Parent Portal</h1>
                <p className="text-sm text-gray-500">Monitor your child's progress</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <BellIcon className="h-6 w-6 text-gray-400" />
                {alerts.filter(a => !a.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {alerts.filter(a => !a.read).length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: UserIcon },
              { id: 'academics', label: 'Academics', icon: AcademicCapIcon },
              { id: 'attendance', label: 'Attendance', icon: CalendarDaysIcon },
              { id: 'fees', label: 'Fees & Payments', icon: BanknotesIcon },
              { id: 'communication', label: 'Communication', icon: ChatBubbleLeftRightIcon },
              { id: 'alerts', label: 'Alerts', icon: BellIcon },
              { id: 'calendar', label: 'Calendar', icon: CalendarDaysIcon }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.id === 'alerts' && alerts.filter(a => !a.read).length > 0 && (
                    <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {alerts.filter(a => !a.read).length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto max-h-[calc(100vh-200px)]">
        {renderTabContent()}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedFee && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fee Description</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedFee.description}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">${selectedFee.amount}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500">
                    <option>Credit Card</option>
                    <option>Debit Card</option>
                    <option>Bank Transfer</option>
                    <option>PayPal</option>
                  </select>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Send Message</h3>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">To</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500">
                    <option>Select recipient...</option>
                    <option>Ms. Davis (English Teacher)</option>
                    <option>Mr. Smith (Math Teacher)</option>
                    <option>Dr. Wilson (Science Teacher)</option>
                    <option>School Administration</option>
                    <option>Principal</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    placeholder="Enter subject..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    placeholder="Type your message..."
                  ></textarea>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                    Send Message
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

export default Parent;