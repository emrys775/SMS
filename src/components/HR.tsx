import React, { useState } from 'react';
import {
  UserGroupIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  DocumentTextIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  AcademicCapIcon,
  ArrowDownTrayIcon,
  BellIcon,
  UserPlusIcon,
  DocumentArrowDownIcon,
  StarIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

interface Staff {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  hireDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'on-leave';
  employeeId: string;
  address: string;
  emergencyContact: string;
  qualifications: string[];
  performanceRating: number;
}

interface LeaveRequest {
  id: string;
  staffId: string;
  staffName: string;
  type: 'annual' | 'sick' | 'maternity' | 'emergency';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

interface Attendance {
  id: string;
  staffId: string;
  staffName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  hoursWorked: number;
  status: 'present' | 'late' | 'absent' | 'half-day';
}

interface JobPosting {
  id: string;
  title: string;
  department: string;
  type: 'full-time' | 'part-time' | 'contract';
  description: string;
  requirements: string[];
  salary: string;
  postedDate: string;
  deadline: string;
  status: 'active' | 'closed' | 'draft';
  applicants: number;
}

interface Training {
  id: string;
  title: string;
  description: string;
  trainer: string;
  date: string;
  duration: string;
  participants: string[];
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  location: string;
}

const HR: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Sample data
  const staff: Staff[] = [
    {
      id: 'STF001',
      name: 'Dr. Sarah Wilson',
      position: 'Principal',
      department: 'Administration',
      email: 'sarah.wilson@school.edu',
      phone: '+1-555-0101',
      hireDate: '2020-01-15',
      salary: 95000,
      status: 'active',
      employeeId: 'EMP001',
      address: '123 Main St, City, State 12345',
      emergencyContact: 'John Wilson - +1-555-0102',
      qualifications: ['PhD Education', 'MBA', 'Teaching License'],
      performanceRating: 4.8
    },
    {
      id: 'STF002',
      name: 'Mark Thompson',
      position: 'Math Teacher',
      department: 'Mathematics',
      email: 'mark.thompson@school.edu',
      phone: '+1-555-0201',
      hireDate: '2021-08-20',
      salary: 65000,
      status: 'active',
      employeeId: 'EMP002',
      address: '456 Oak Ave, City, State 12345',
      emergencyContact: 'Lisa Thompson - +1-555-0202',
      qualifications: ['MSc Mathematics', 'Teaching Certificate'],
      performanceRating: 4.5
    },
    {
      id: 'STF003',
      name: 'Lisa Brown',
      position: 'Science Teacher',
      department: 'Science',
      email: 'lisa.brown@school.edu',
      phone: '+1-555-0301',
      hireDate: '2022-01-10',
      salary: 62000,
      status: 'on-leave',
      employeeId: 'EMP003',
      address: '789 Pine St, City, State 12345',
      emergencyContact: 'David Brown - +1-555-0302',
      qualifications: ['MSc Biology', 'Teaching License'],
      performanceRating: 4.3
    }
  ];

  const leaveRequests: LeaveRequest[] = [
    {
      id: 'LR001',
      staffId: 'STF003',
      staffName: 'Lisa Brown',
      type: 'maternity',
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      days: 90,
      reason: 'Maternity leave',
      status: 'approved',
      appliedDate: '2024-01-15'
    },
    {
      id: 'LR002',
      staffId: 'STF002',
      staffName: 'Mark Thompson',
      type: 'annual',
      startDate: '2024-03-15',
      endDate: '2024-03-22',
      days: 7,
      reason: 'Family vacation',
      status: 'pending',
      appliedDate: '2024-02-01'
    }
  ];

  const attendance: Attendance[] = [
    {
      id: 'ATT001',
      staffId: 'STF001',
      staffName: 'Dr. Sarah Wilson',
      date: '2024-02-01',
      checkIn: '08:00',
      checkOut: '17:00',
      hoursWorked: 9,
      status: 'present'
    },
    {
      id: 'ATT002',
      staffId: 'STF002',
      staffName: 'Mark Thompson',
      date: '2024-02-01',
      checkIn: '08:15',
      checkOut: '16:45',
      hoursWorked: 8.5,
      status: 'late'
    }
  ];

  const jobPostings: JobPosting[] = [
    {
      id: 'JP001',
      title: 'English Teacher',
      department: 'English',
      type: 'full-time',
      description: 'Seeking experienced English teacher for high school level',
      requirements: ['Bachelor\'s in English', 'Teaching License', '3+ years experience'],
      salary: '$55,000 - $65,000',
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      status: 'active',
      applicants: 12
    },
    {
      id: 'JP002',
      title: 'IT Support Specialist',
      department: 'IT',
      type: 'full-time',
      description: 'Manage school IT infrastructure and support',
      requirements: ['Bachelor\'s in IT', 'Network Certification', '2+ years experience'],
      salary: '$45,000 - $55,000',
      postedDate: '2024-01-20',
      deadline: '2024-02-20',
      status: 'active',
      applicants: 8
    }
  ];

  const trainings: Training[] = [
    {
      id: 'TR001',
      title: 'Digital Teaching Methods',
      description: 'Workshop on modern digital teaching techniques',
      trainer: 'Dr. Emily Davis',
      date: '2024-02-15',
      duration: '4 hours',
      participants: ['STF002', 'STF003'],
      status: 'scheduled',
      location: 'Conference Room A'
    },
    {
      id: 'TR002',
      title: 'Safety Protocols',
      description: 'Annual safety and emergency procedures training',
      trainer: 'Safety Officer',
      date: '2024-02-20',
      duration: '2 hours',
      participants: ['STF001', 'STF002', 'STF003'],
      status: 'scheduled',
      location: 'Main Auditorium'
    }
  ];

  const hrStats = {
    totalStaff: staff.length,
    activeStaff: staff.filter(s => s.status === 'active').length,
    onLeave: staff.filter(s => s.status === 'on-leave').length,
    pendingLeaves: leaveRequests.filter(lr => lr.status === 'pending').length,
    openPositions: jobPostings.filter(jp => jp.status === 'active').length,
    upcomingTrainings: trainings.filter(t => t.status === 'scheduled').length
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: ChartBarIcon },
    { id: 'staff', name: 'Staff Database', icon: UserGroupIcon },
    { id: 'recruitment', name: 'Recruitment', icon: BriefcaseIcon },
    { id: 'attendance', name: 'Attendance', icon: CalendarDaysIcon },
    { id: 'leave', name: 'Leave Management', icon: ClockIcon },
    { id: 'appraisal', name: 'Appraisal', icon: StarIcon },
    { id: 'training', name: 'Training', icon: AcademicCapIcon }
  ];

  const openModal = (type: string, item?: any) => {
    setModalType(type);
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedItem(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'present': case 'approved': case 'scheduled': return 'text-green-600 bg-green-100';
      case 'inactive': case 'absent': case 'rejected': case 'cancelled': return 'text-red-600 bg-red-100';
      case 'on-leave': case 'pending': case 'ongoing': return 'text-yellow-600 bg-yellow-100';
      case 'late': case 'half-day': return 'text-orange-600 bg-orange-100';
      case 'completed': case 'closed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* HR Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Staff</p>
              <p className="text-2xl font-bold text-blue-600">{hrStats.totalStaff}</p>
            </div>
            <UserGroupIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Staff</p>
              <p className="text-2xl font-bold text-green-600">{hrStats.activeStaff}</p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">On Leave</p>
              <p className="text-2xl font-bold text-orange-600">{hrStats.onLeave}</p>
            </div>
            <ClockIcon className="h-8 w-8 text-orange-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Leaves</p>
              <p className="text-2xl font-bold text-yellow-600">{hrStats.pendingLeaves}</p>
            </div>
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open Positions</p>
              <p className="text-2xl font-bold text-purple-600">{hrStats.openPositions}</p>
            </div>
            <BriefcaseIcon className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Trainings</p>
              <p className="text-2xl font-bold text-indigo-600">{hrStats.upcomingTrainings}</p>
            </div>
            <AcademicCapIcon className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Leave Requests</h3>
          <div className="space-y-3">
            {leaveRequests.slice(0, 3).map((leave) => (
              <div key={leave.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{leave.staffName}</p>
                  <p className="text-sm text-gray-600">{leave.type} • {leave.days} days</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(leave.status)}`}>
                  {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Attendance</h3>
          <div className="space-y-3">
            {attendance.slice(0, 3).map((att) => (
              <div key={att.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{att.staffName}</p>
                  <p className="text-sm text-gray-600">{att.checkIn} - {att.checkOut}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(att.status)}`}>
                  {att.status.charAt(0).toUpperCase() + att.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStaffDatabase = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Staff Database</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => openModal('export-staff')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            <span>Export to Excel</span>
          </button>
          <button
            onClick={() => openModal('add-staff')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Add Staff</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
          <option value="">All Departments</option>
          <option value="administration">Administration</option>
          <option value="mathematics">Mathematics</option>
          <option value="science">Science</option>
          <option value="english">English</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="on-leave">On Leave</option>
        </select>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hire Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium">{member.name.charAt(0)}</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {member.position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {member.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {member.hireDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-900">{member.performanceRating}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => openModal('view-staff', member)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openModal('edit-staff', member)}
                    className="text-green-600 hover:text-green-900"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openModal('generate-payslip', member)}
                    className="text-purple-600 hover:text-purple-900"
                  >
                    <CurrencyDollarIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRecruitment = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Recruitment Portal</h2>
        <button
          onClick={() => openModal('create-job-posting')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Create Job Posting</span>
        </button>
      </div>

      {/* Job Postings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobPostings.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.department} • {job.type}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </span>
            </div>
            
            <p className="text-sm text-gray-700 mb-4">{job.description}</p>
            
            <div className="space-y-2 mb-4">
              <p className="text-sm font-medium text-gray-900">Requirements:</p>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-green-600">{job.salary}</p>
                <p className="text-xs text-gray-500">Deadline: {job.deadline}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{job.applicants} applicants</span>
                <button
                  onClick={() => openModal('view-applicants', job)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <EyeIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Attendance Management</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => openModal('mark-attendance')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <CheckCircleIcon className="h-4 w-4" />
            <span>Mark Attendance</span>
          </button>
          <button
            onClick={() => openModal('attendance-report')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <DocumentTextIcon className="h-4 w-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-600">Present Today</h3>
          <p className="text-2xl font-bold text-green-600">
            {attendance.filter(a => a.status === 'present').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-600">Late Arrivals</h3>
          <p className="text-2xl font-bold text-orange-600">
            {attendance.filter(a => a.status === 'late').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-600">Absent</h3>
          <p className="text-2xl font-bold text-red-600">
            {attendance.filter(a => a.status === 'absent').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-600">Average Hours</h3>
          <p className="text-2xl font-bold text-blue-600">
            {(attendance.reduce((sum, a) => sum + a.hoursWorked, 0) / attendance.length).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours Worked</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendance.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {record.staffName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.checkIn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.checkOut}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.hoursWorked}h
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => openModal('edit-attendance', record)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderLeaveManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Leave Management</h2>
        <button
          onClick={() => openModal('leave-calendar')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <CalendarDaysIcon className="h-4 w-4" />
          <span>Leave Calendar</span>
        </button>
      </div>

      {/* Leave Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['pending', 'approved', 'rejected', 'annual'].map((type) => (
          <div key={type} className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-medium text-gray-600">
              {type === 'annual' ? 'Annual Leaves' : `${type.charAt(0).toUpperCase() + type.slice(1)} Requests`}
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {type === 'annual' 
                ? leaveRequests.filter(lr => lr.type === 'annual').length
                : leaveRequests.filter(lr => lr.status === type).length
              }
            </p>
          </div>
        ))}
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaveRequests.map((leave) => (
              <tr key={leave.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {leave.staffName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {leave.type.charAt(0).toUpperCase() + leave.type.slice(1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {leave.startDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {leave.endDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {leave.days}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(leave.status)}`}>
                    {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => openModal('view-leave', leave)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  {leave.status === 'pending' && (
                    <>
                      <button
                        onClick={() => openModal('approve-leave', leave)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <CheckCircleIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openModal('reject-leave', leave)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <XCircleIcon className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAppraisal = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Performance Appraisal</h2>
        <button
          onClick={() => openModal('create-appraisal')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Create Appraisal</span>
        </button>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-600 mb-2">Average Performance</h3>
          <p className="text-3xl font-bold text-blue-600">
            {(staff.reduce((sum, s) => sum + s.performanceRating, 0) / staff.length).toFixed(1)}
          </p>
          <div className="flex items-center mt-2">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="text-sm text-gray-600 ml-1">out of 5.0</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-600 mb-2">Top Performers</h3>
          <p className="text-3xl font-bold text-green-600">
            {staff.filter(s => s.performanceRating >= 4.5).length}
          </p>
          <p className="text-sm text-gray-600">Rating {'>'}= 4.5</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-600 mb-2">Needs Improvement</h3>
          <p className="text-3xl font-bold text-orange-600">
            {staff.filter(s => s.performanceRating < 4.0).length}
          </p>
          <p className="text-sm text-gray-600">Rating {'<'} 4.0</p>
        </div>
      </div>

      {/* Staff Performance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {staff.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-lg">{member.name.charAt(0)}</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.position}</p>
                </div>
              </div>
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="text-lg font-semibold text-gray-900">{member.performanceRating}</span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Performance Rating</span>
                <span className="font-medium">{member.performanceRating}/5.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(member.performanceRating / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Last Review: Jan 2024</span>
              <button
                onClick={() => openModal('conduct-review', member)}
                className="text-blue-600 hover:text-blue-900 text-sm font-medium"
              >
                Conduct Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTraining = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Training & Development</h2>
        <button
          onClick={() => openModal('schedule-training')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Schedule Training</span>
        </button>
      </div>

      {/* Training Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['scheduled', 'ongoing', 'completed', 'cancelled'].map((status) => (
          <div key={status} className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-medium text-gray-600">
              {status.charAt(0).toUpperCase() + status.slice(1)} Trainings
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {trainings.filter(t => t.status === status).length}
            </p>
          </div>
        ))}
      </div>

      {/* Training Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {trainings.map((training) => (
          <div key={training.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{training.title}</h3>
                <p className="text-sm text-gray-600">Trainer: {training.trainer}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(training.status)}`}>
                {training.status.charAt(0).toUpperCase() + training.status.slice(1)}
              </span>
            </div>
            
            <p className="text-sm text-gray-700 mb-4">{training.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{training.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{training.duration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{training.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Participants:</span>
                <span className="font-medium">{training.participants.length} staff</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <button
                onClick={() => openModal('view-participants', training)}
                className="text-blue-600 hover:text-blue-900 text-sm font-medium"
              >
                View Participants
              </button>
              <button
                onClick={() => openModal('edit-training', training)}
                className="text-green-600 hover:text-green-900"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'staff': return renderStaffDatabase();
      case 'recruitment': return renderRecruitment();
      case 'attendance': return renderAttendance();
      case 'leave': return renderLeaveManagement();
      case 'appraisal': return renderAppraisal();
      case 'training': return renderTraining();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HR Management</h1>
              <p className="text-sm text-gray-600">Comprehensive human resources management system</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Staff</p>
                <p className="text-lg font-semibold text-blue-600">{hrStats.totalStaff}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
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
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {modalType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  {modalType === 'add-staff' && 'Add a new staff member to the database.'}
                  {modalType === 'edit-staff' && 'Update staff member information.'}
                  {modalType === 'view-staff' && 'View detailed staff member profile.'}
                  {modalType === 'generate-payslip' && 'Generate payslip data for the selected staff member.'}
                  {modalType === 'export-staff' && 'Export staff database to Excel format.'}
                  {modalType === 'create-job-posting' && 'Create a new job posting for recruitment.'}
                  {modalType === 'view-applicants' && 'View all applicants for this position.'}
                  {modalType === 'mark-attendance' && 'Mark attendance for staff members.'}
                  {modalType === 'attendance-report' && 'Generate attendance report for selected period.'}
                  {modalType === 'approve-leave' && 'Approve the selected leave request.'}
                  {modalType === 'reject-leave' && 'Reject the selected leave request.'}
                  {modalType === 'conduct-review' && 'Conduct performance review for the staff member.'}
                  {modalType === 'schedule-training' && 'Schedule a new training session.'}
                  {modalType === 'view-participants' && 'View training participants and their status.'}
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    Confirm
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

export default HR;