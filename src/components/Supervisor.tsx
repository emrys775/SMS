import React, { useState } from 'react';
import {
  CalendarDaysIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  StarIcon,
  TrophyIcon,
  BellIcon,
  ArrowDownTrayIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  ClockIcon,
  FlagIcon,
  ShieldCheckIcon,
  DocumentArrowDownIcon,
  ChartPieIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

interface School {
  id: string;
  name: string;
  address: string;
  principal: string;
  totalStudents: number;
  totalStaff: number;
  performanceScore: number;
  lastInspection: string;
  nextInspection: string;
  status: 'excellent' | 'good' | 'satisfactory' | 'needs-improvement' | 'critical';
  alerts: number;
}

interface Inspection {
  id: string;
  schoolId: string;
  schoolName: string;
  date: string;
  time: string;
  type: 'routine' | 'surprise' | 'follow-up' | 'complaint-based';
  inspector: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  areas: string[];
  notes: string;
}

interface PerformanceReport {
  id: string;
  schoolId: string;
  schoolName: string;
  term: string;
  year: string;
  academicScore: number;
  teachingQuality: number;
  infrastructure: number;
  studentSatisfaction: number;
  overallRating: number;
  recommendations: string[];
  submittedDate: string;
}

interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  school: string;
  details: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
}

interface Alert {
  id: string;
  schoolId: string;
  schoolName: string;
  type: 'attendance' | 'performance' | 'safety' | 'compliance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  date: string;
  status: 'new' | 'acknowledged' | 'resolved';
  aiGenerated: boolean;
}

const Supervisor: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Sample data
  const schools: School[] = [
    {
      id: 'SCH001',
      name: 'AI Academy High School',
      address: '123 Education St, City Center',
      principal: 'Dr. Sarah Wilson',
      totalStudents: 850,
      totalStaff: 45,
      performanceScore: 92,
      lastInspection: '2024-01-15',
      nextInspection: '2024-04-15',
      status: 'excellent',
      alerts: 0
    },
    {
      id: 'SCH002',
      name: 'Central Elementary School',
      address: '456 Learning Ave, Downtown',
      principal: 'Mr. John Davis',
      totalStudents: 620,
      totalStaff: 32,
      performanceScore: 78,
      lastInspection: '2024-01-20',
      nextInspection: '2024-04-20',
      status: 'good',
      alerts: 2
    },
    {
      id: 'SCH003',
      name: 'Riverside Middle School',
      address: '789 River Rd, Riverside',
      principal: 'Ms. Emily Brown',
      totalStudents: 480,
      totalStaff: 28,
      performanceScore: 65,
      lastInspection: '2024-01-10',
      nextInspection: '2024-03-10',
      status: 'needs-improvement',
      alerts: 5
    }
  ];

  const inspections: Inspection[] = [
    {
      id: 'INS001',
      schoolId: 'SCH001',
      schoolName: 'AI Academy High School',
      date: '2024-02-15',
      time: '09:00',
      type: 'routine',
      inspector: 'Inspector Johnson',
      status: 'scheduled',
      priority: 'medium',
      areas: ['Academic Performance', 'Infrastructure', 'Safety'],
      notes: 'Quarterly routine inspection'
    },
    {
      id: 'INS002',
      schoolId: 'SCH003',
      schoolName: 'Riverside Middle School',
      date: '2024-02-10',
      time: '10:30',
      type: 'follow-up',
      inspector: 'Inspector Smith',
      status: 'in-progress',
      priority: 'high',
      areas: ['Teaching Quality', 'Student Performance'],
      notes: 'Follow-up on previous recommendations'
    }
  ];

  const performanceReports: PerformanceReport[] = [
    {
      id: 'RPT001',
      schoolId: 'SCH001',
      schoolName: 'AI Academy High School',
      term: 'Q1',
      year: '2024',
      academicScore: 95,
      teachingQuality: 90,
      infrastructure: 88,
      studentSatisfaction: 92,
      overallRating: 91,
      recommendations: ['Expand digital learning resources', 'Improve sports facilities'],
      submittedDate: '2024-01-30'
    },
    {
      id: 'RPT002',
      schoolId: 'SCH002',
      schoolName: 'Central Elementary School',
      term: 'Q1',
      year: '2024',
      academicScore: 82,
      teachingQuality: 78,
      infrastructure: 75,
      studentSatisfaction: 80,
      overallRating: 79,
      recommendations: ['Teacher training programs', 'Classroom technology upgrade'],
      submittedDate: '2024-01-28'
    }
  ];

  const auditLogs: AuditLog[] = [
    {
      id: 'LOG001',
      timestamp: '2024-02-01 14:30:00',
      action: 'Inspection Scheduled',
      user: 'Inspector Johnson',
      school: 'AI Academy High School',
      details: 'Routine inspection scheduled for February 15, 2024',
      severity: 'info'
    },
    {
      id: 'LOG002',
      timestamp: '2024-02-01 11:15:00',
      action: 'Performance Alert',
      user: 'System',
      school: 'Riverside Middle School',
      details: 'Academic performance below threshold detected',
      severity: 'warning'
    },
    {
      id: 'LOG003',
      timestamp: '2024-01-31 16:45:00',
      action: 'Report Submitted',
      user: 'Inspector Smith',
      school: 'Central Elementary School',
      details: 'Q1 2024 performance report submitted',
      severity: 'info'
    }
  ];

  const alerts: Alert[] = [
    {
      id: 'ALT001',
      schoolId: 'SCH003',
      schoolName: 'Riverside Middle School',
      type: 'performance',
      severity: 'high',
      message: 'Math test scores dropped by 15% compared to last term',
      date: '2024-02-01',
      status: 'new',
      aiGenerated: true
    },
    {
      id: 'ALT002',
      schoolId: 'SCH002',
      schoolName: 'Central Elementary School',
      type: 'attendance',
      severity: 'medium',
      message: 'Student attendance rate below 85% for 3 consecutive days',
      date: '2024-01-30',
      status: 'acknowledged',
      aiGenerated: true
    },
    {
      id: 'ALT003',
      schoolId: 'SCH003',
      schoolName: 'Riverside Middle School',
      type: 'safety',
      severity: 'critical',
      message: 'Fire safety equipment inspection overdue by 30 days',
      date: '2024-01-28',
      status: 'new',
      aiGenerated: false
    }
  ];

  const supervisorStats = {
    totalSchools: schools.length,
    excellentSchools: schools.filter(s => s.status === 'excellent').length,
    needsImprovement: schools.filter(s => s.status === 'needs-improvement' || s.status === 'critical').length,
    pendingInspections: inspections.filter(i => i.status === 'scheduled').length,
    activeAlerts: alerts.filter(a => a.status === 'new').length,
    avgPerformance: Math.round(schools.reduce((sum, s) => sum + s.performanceScore, 0) / schools.length)
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: ChartBarIcon },
    { id: 'calendar', name: 'Inspection Calendar', icon: CalendarDaysIcon },
    { id: 'schools', name: 'School Performance', icon: BuildingOfficeIcon },
    { id: 'reports', name: 'Performance Reports', icon: DocumentTextIcon },
    { id: 'audit', name: 'Audit Logs', icon: ClipboardDocumentListIcon },
    { id: 'alerts', name: 'AI Alerts', icon: BellIcon },
    { id: 'ranking', name: 'School Rankings', icon: TrophyIcon }
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
      case 'excellent': case 'completed': case 'resolved': return 'text-green-600 bg-green-100';
      case 'good': case 'scheduled': case 'acknowledged': return 'text-blue-600 bg-blue-100';
      case 'satisfactory': case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'needs-improvement': case 'new': return 'text-orange-600 bg-orange-100';
      case 'critical': case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return 'text-blue-600 bg-blue-100';
      case 'warning': case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'error': case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Schools</p>
              <p className="text-2xl font-bold text-blue-600">{supervisorStats.totalSchools}</p>
            </div>
            <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Excellent Schools</p>
              <p className="text-2xl font-bold text-green-600">{supervisorStats.excellentSchools}</p>
            </div>
            <StarIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Needs Improvement</p>
              <p className="text-2xl font-bold text-orange-600">{supervisorStats.needsImprovement}</p>
            </div>
            <ExclamationTriangleIcon className="h-8 w-8 text-orange-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Inspections</p>
              <p className="text-2xl font-bold text-purple-600">{supervisorStats.pendingInspections}</p>
            </div>
            <CalendarDaysIcon className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold text-red-600">{supervisorStats.activeAlerts}</p>
            </div>
            <BellIcon className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Performance</p>
              <p className="text-2xl font-bold text-indigo-600">{supervisorStats.avgPerformance}%</p>
            </div>
            <ChartBarIcon className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Inspections</h3>
          <div className="space-y-3">
            {inspections.filter(i => i.status === 'scheduled').slice(0, 3).map((inspection) => (
              <div key={inspection.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{inspection.schoolName}</p>
                  <p className="text-sm text-gray-600">{inspection.date} • {inspection.type}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(inspection.priority)}`}>
                  {inspection.priority.charAt(0).toUpperCase() + inspection.priority.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Critical Alerts</h3>
          <div className="space-y-3">
            {alerts.filter(a => a.severity === 'critical' || a.severity === 'high').slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{alert.schoolName}</p>
                  <p className="text-sm text-gray-600">{alert.message.substring(0, 40)}...</p>
                </div>
                <div className="flex items-center space-x-2">
                  {alert.aiGenerated && <span className="text-xs text-purple-600 font-medium">AI</span>}
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderInspectionCalendar = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Inspection Calendar</h2>
        <button
          onClick={() => openModal('schedule-inspection')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Schedule Inspection</span>
        </button>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="grid grid-cols-7 gap-4 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-4">
          {Array.from({ length: 35 }, (_, i) => {
            const date = i + 1;
            const hasInspection = inspections.some(insp => 
              new Date(insp.date).getDate() === date && 
              new Date(insp.date).getMonth() === 1 // February
            );
            return (
              <div key={i} className={`h-20 border rounded p-2 ${
                hasInspection ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
              }`}>
                <div className="text-sm font-medium">{date <= 28 ? date : ''}</div>
                {hasInspection && (
                  <div className="text-xs text-blue-600 mt-1">
                    Inspection
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Inspection List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inspector</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inspections.map((inspection) => (
              <tr key={inspection.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {inspection.schoolName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {inspection.date} {inspection.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {inspection.type.charAt(0).toUpperCase() + inspection.type.slice(1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {inspection.inspector}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(inspection.priority)}`}>
                    {inspection.priority.charAt(0).toUpperCase() + inspection.priority.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inspection.status)}`}>
                    {inspection.status.charAt(0).toUpperCase() + inspection.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => openModal('view-inspection', inspection)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openModal('edit-inspection', inspection)}
                    className="text-green-600 hover:text-green-900"
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

  const renderSchoolPerformance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">School Performance Overview</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => openModal('generate-ranking')}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2"
          >
            <TrophyIcon className="h-4 w-4" />
            <span>Generate Rankings</span>
          </button>
          <button
            onClick={() => openModal('export-performance')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['excellent', 'good', 'satisfactory', 'needs-improvement'].map((status) => (
          <div key={status} className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-medium text-gray-600">
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {schools.filter(s => s.status === status).length}
            </p>
          </div>
        ))}
      </div>

      {/* School Performance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {schools.map((school) => (
          <div key={school.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{school.name}</h3>
                <p className="text-sm text-gray-600">{school.principal}</p>
                <p className="text-sm text-gray-500">{school.address}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(school.status)}`}>
                  {school.status.charAt(0).toUpperCase() + school.status.slice(1)}
                </span>
                {school.alerts > 0 && (
                  <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600">
                    {school.alerts} alerts
                  </span>
                )}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Performance Score</span>
                <span className="font-medium">{school.performanceScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${school.performanceScore}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Students: </span>
                  <span className="font-medium">{school.totalStudents}</span>
                </div>
                <div>
                  <span className="text-gray-600">Staff: </span>
                  <span className="font-medium">{school.totalStaff}</span>
                </div>
                <div>
                  <span className="text-gray-600">Last Inspection: </span>
                  <span className="font-medium">{school.lastInspection}</span>
                </div>
                <div>
                  <span className="text-gray-600">Next Inspection: </span>
                  <span className="font-medium">{school.nextInspection}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => openModal('view-school-details', school)}
                className="text-blue-600 hover:text-blue-900 text-sm font-medium"
              >
                View Details
              </button>
              <button
                onClick={() => openModal('schedule-inspection-for-school', school)}
                className="text-green-600 hover:text-green-900 text-sm font-medium"
              >
                Schedule Inspection
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPerformanceReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Performance Reports</h2>
        <button
          onClick={() => openModal('submit-report')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <DocumentArrowDownIcon className="h-4 w-4" />
          <span>Submit Report</span>
        </button>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Academic</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teaching</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Infrastructure</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {performanceReports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {report.schoolName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {report.term} {report.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {report.academicScore}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {report.teachingQuality}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {report.infrastructure}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-2">{report.overallRating}%</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${report.overallRating}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => openModal('view-report', report)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openModal('download-report', report)}
                    className="text-green-600 hover:text-green-900"
                  >
                    <ArrowDownTrayIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAuditLogs = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Audit Logs</h2>
        <div className="flex space-x-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">All Severity</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="critical">Critical</option>
          </select>
          <button
            onClick={() => openModal('export-logs')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            <span>Export Logs</span>
          </button>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {log.timestamp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {log.action}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {log.user}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {log.school}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(log.severity)}`}>
                    {log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {log.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAIAlerts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">AI-Generated Alerts</h2>
        <div className="flex space-x-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">All Types</option>
            <option value="attendance">Attendance</option>
            <option value="performance">Performance</option>
            <option value="safety">Safety</option>
            <option value="compliance">Compliance</option>
          </select>
          <button
            onClick={() => openModal('configure-ai-alerts')}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2"
          >
            <ShieldCheckIcon className="h-4 w-4" />
            <span>Configure AI</span>
          </button>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['critical', 'high', 'medium', 'low'].map((severity) => (
          <div key={severity} className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-medium text-gray-600">
              {severity.charAt(0).toUpperCase() + severity.slice(1)} Alerts
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {alerts.filter(a => a.severity === severity).length}
            </p>
          </div>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  alert.severity === 'critical' ? 'bg-red-500' :
                  alert.severity === 'high' ? 'bg-orange-500' :
                  alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <div>
                  <h3 className="font-semibold text-gray-900">{alert.schoolName}</h3>
                  <p className="text-sm text-gray-600">{alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Alert</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {alert.aiGenerated && (
                  <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-600">
                    AI Generated
                  </span>
                )}
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                  {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(alert.status)}`}>
                  {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                </span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-3">{alert.message}</p>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{alert.date}</span>
              <div className="space-x-2">
                {alert.status === 'new' && (
                  <>
                    <button
                      onClick={() => openModal('acknowledge-alert', alert)}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      Acknowledge
                    </button>
                    <button
                      onClick={() => openModal('resolve-alert', alert)}
                      className="text-green-600 hover:text-green-900 text-sm font-medium"
                    >
                      Resolve
                    </button>
                  </>
                )}
                <button
                  onClick={() => openModal('view-alert-details', alert)}
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSchoolRankings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">School Rankings</h2>
        <div className="flex space-x-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="overall">Overall Performance</option>
            <option value="academic">Academic Results</option>
            <option value="teaching">Teaching Quality</option>
            <option value="infrastructure">Infrastructure</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
          <button
            onClick={() => openModal('export-rankings')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            <span>Export Rankings</span>
          </button>
        </div>
      </div>

      {/* Rankings Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Inspection</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schools
              .sort((a, b) => b.performanceScore - a.performanceScore)
              .map((school, index) => (
              <tr key={school.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {index === 0 && <TrophyIcon className="h-5 w-5 text-yellow-500 mr-2" />}
                    {index === 1 && <TrophyIcon className="h-5 w-5 text-gray-400 mr-2" />}
                    {index === 2 && <TrophyIcon className="h-5 w-5 text-orange-600 mr-2" />}
                    <span className="text-sm font-medium text-gray-900">#{index + 1}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{school.name}</div>
                    <div className="text-sm text-gray-500">{school.principal}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-2">{school.performanceScore}%</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${school.performanceScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {school.totalStudents}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(school.status)}`}>
                    {school.status.charAt(0).toUpperCase() + school.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {school.lastInspection}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => openModal('view-school-ranking-details', school)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'calendar': return renderInspectionCalendar();
      case 'schools': return renderSchoolPerformance();
      case 'reports': return renderPerformanceReports();
      case 'audit': return renderAuditLogs();
      case 'alerts': return renderAIAlerts();
      case 'ranking': return renderSchoolRankings();
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
              <h1 className="text-2xl font-bold text-gray-900">Supervisor Dashboard</h1>
              <p className="text-sm text-gray-600">School inspection and performance monitoring system</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Schools Under Supervision</p>
                <p className="text-lg font-semibold text-blue-600">{supervisorStats.totalSchools}</p>
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
                  {modalType === 'schedule-inspection' && 'Schedule a new inspection for a school.'}
                  {modalType === 'view-inspection' && 'View detailed inspection information.'}
                  {modalType === 'edit-inspection' && 'Modify inspection details and schedule.'}
                  {modalType === 'generate-ranking' && 'Generate school performance rankings report.'}
                  {modalType === 'export-performance' && 'Export school performance data to Excel.'}
                  {modalType === 'view-school-details' && 'View comprehensive school information and metrics.'}
                  {modalType === 'submit-report' && 'Submit inspection report online.'}
                  {modalType === 'view-report' && 'View detailed performance report.'}
                  {modalType === 'download-report' && 'Download performance report as PDF.'}
                  {modalType === 'export-logs' && 'Export audit logs for analysis.'}
                  {modalType === 'configure-ai-alerts' && 'Configure AI alert thresholds and parameters.'}
                  {modalType === 'acknowledge-alert' && 'Acknowledge this alert and mark as reviewed.'}
                  {modalType === 'resolve-alert' && 'Mark this alert as resolved.'}
                  {modalType === 'view-alert-details' && 'View detailed alert information and recommendations.'}
                  {modalType === 'export-rankings' && 'Export school rankings to Excel format.'}
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

export default Supervisor;