import React, { useState } from 'react';
import {
  UserGroupIcon,
  CogIcon,
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  ShieldCheckIcon,
  BellIcon,
  ServerIcon,
  ChartBarIcon,
  KeyIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  DevicePhoneMobileIcon,
  UsersIcon,
  AcademicCapIcon,
  UserIcon
} from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

interface SystemSetting {
  id: string;
  category: string;
  name: string;
  value: string;
  description: string;
}

interface NotificationSchedule {
  id: string;
  title: string;
  message: string;
  recipients: string[];
  scheduledDate: string;
  status: 'pending' | 'sent' | 'failed';
}

interface UsageLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  ipAddress: string;
  device: string;
}

const AdminManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Sample data
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@school.edu',
      role: 'teacher',
      status: 'active',
      lastLogin: '2024-01-15 09:30',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@school.edu',
      role: 'student',
      status: 'active',
      lastLogin: '2024-01-15 08:45',
      createdAt: '2024-01-02'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@parent.com',
      role: 'parent',
      status: 'inactive',
      lastLogin: '2024-01-10 16:20',
      createdAt: '2024-01-03'
    }
  ]);

  const [systemSettings] = useState<SystemSetting[]>([
    {
      id: '1',
      category: 'Academic',
      name: 'Grading Scale',
      value: 'A-F',
      description: 'Letter grading system'
    },
    {
      id: '2',
      category: 'Security',
      name: 'Password Policy',
      value: 'Strong',
      description: 'Minimum 8 characters with special chars'
    },
    {
      id: '3',
      category: 'General',
      name: 'School Year',
      value: '2024-2025',
      description: 'Current academic year'
    }
  ]);

  const [notifications] = useState<NotificationSchedule[]>([
    {
      id: '1',
      title: 'Parent-Teacher Conference',
      message: 'Reminder: Parent-teacher conferences scheduled for next week',
      recipients: ['parents', 'teachers'],
      scheduledDate: '2024-01-20 09:00',
      status: 'pending'
    },
    {
      id: '2',
      title: 'System Maintenance',
      message: 'Scheduled system maintenance on Sunday',
      recipients: ['all'],
      scheduledDate: '2024-01-21 02:00',
      status: 'sent'
    }
  ]);

  const [usageLogs] = useState<UsageLog[]>([
    {
      id: '1',
      user: 'John Smith',
      action: 'Login',
      timestamp: '2024-01-15 09:30:15',
      ipAddress: '192.168.1.100',
      device: 'Chrome/Windows'
    },
    {
      id: '2',
      user: 'Sarah Johnson',
      action: 'View Grades',
      timestamp: '2024-01-15 08:45:22',
      ipAddress: '192.168.1.101',
      device: 'Safari/iOS'
    }
  ]);

  const tabs = [
    { id: 'users', name: 'User Management', icon: UserGroupIcon },
    { id: 'settings', name: 'System Settings', icon: CogIcon },
    { id: 'data', name: 'Data Operations', icon: DocumentArrowDownIcon },
    { id: 'roles', name: 'Role Assignment', icon: ShieldCheckIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'monitoring', name: 'Monitoring', icon: ChartBarIcon }
  ];

  const openModal = (type: string, user?: User) => {
    setModalType(type);
    setSelectedUser(user || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedUser(null);
  };

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
        <button
          onClick={() => openModal('create-user')}
          className="btn btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Create User</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center space-x-3">
            <AcademicCapIcon className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600">Teachers</p>
              <p className="text-2xl font-bold text-blue-900">45</p>
            </div>
          </div>
        </div>
        <div className="card p-4 bg-green-50 border-green-200">
          <div className="flex items-center space-x-3">
            <UserGroupIcon className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-green-600">Students</p>
              <p className="text-2xl font-bold text-green-900">1,250</p>
            </div>
          </div>
        </div>
        <div className="card p-4 bg-purple-50 border-purple-200">
          <div className="flex items-center space-x-3">
            <UsersIcon className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-sm text-purple-600">Parents</p>
              <p className="text-2xl font-bold text-purple-900">890</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">All Users</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'teacher' ? 'bg-blue-100 text-blue-800' :
                      user.role === 'student' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => openModal('view-user', user)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => openModal('edit-user', user)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => openModal('delete-user', user)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">System Settings</h2>
        <button
          onClick={() => openModal('add-setting')}
          className="btn btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add Setting</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AcademicCapIcon className="h-8 w-8 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">Academic Settings</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Grading Scale</span>
              <span className="text-sm font-medium">A-F</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Term System</span>
              <span className="text-sm font-medium">Semester</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Max Class Size</span>
              <span className="text-sm font-medium">30</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <ShieldCheckIcon className="h-8 w-8 text-green-600" />
            <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Password Policy</span>
              <span className="text-sm font-medium">Strong</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Session Timeout</span>
              <span className="text-sm font-medium">30 min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">2FA Required</span>
              <span className="text-sm font-medium">Yes</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CogIcon className="h-8 w-8 text-purple-600" />
            <h3 className="text-lg font-medium text-gray-900">General Settings</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">School Year</span>
              <span className="text-sm font-medium">2024-2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Time Zone</span>
              <span className="text-sm font-medium">EST</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Language</span>
              <span className="text-sm font-medium">English</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">All Settings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Setting</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {systemSettings.map((setting) => (
                <tr key={setting.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {setting.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {setting.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {setting.value}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {setting.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDataOperations = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Data Import/Export Operations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <ArrowUpTrayIcon className="h-8 w-8 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">Data Import</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Import data from Excel or CSV files</p>
          <div className="space-y-3">
            <button className="w-full btn btn-outline flex items-center justify-center space-x-2">
              <DocumentArrowUpIcon className="h-4 w-4" />
              <span>Import Students</span>
            </button>
            <button className="w-full btn btn-outline flex items-center justify-center space-x-2">
              <DocumentArrowUpIcon className="h-4 w-4" />
              <span>Import Teachers</span>
            </button>
            <button className="w-full btn btn-outline flex items-center justify-center space-x-2">
              <DocumentArrowUpIcon className="h-4 w-4" />
              <span>Import Grades</span>
            </button>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <ArrowDownTrayIcon className="h-8 w-8 text-green-600" />
            <h3 className="text-lg font-medium text-gray-900">Data Export</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Export data to Excel or PDF formats</p>
          <div className="space-y-3">
            <button className="w-full btn btn-outline flex items-center justify-center space-x-2">
              <DocumentArrowDownIcon className="h-4 w-4" />
              <span>Export Students</span>
            </button>
            <button className="w-full btn btn-outline flex items-center justify-center space-x-2">
              <DocumentArrowDownIcon className="h-4 w-4" />
              <span>Export Teachers</span>
            </button>
            <button className="w-full btn btn-outline flex items-center justify-center space-x-2">
              <DocumentArrowDownIcon className="h-4 w-4" />
              <span>Export Reports</span>
            </button>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <ServerIcon className="h-8 w-8 text-purple-600" />
          <h3 className="text-lg font-medium text-gray-900">Data Backup & Restore</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Backup Options</h4>
            <div className="space-y-2">
              <button className="w-full btn btn-primary">Create Full Backup</button>
              <button className="w-full btn btn-outline">Create Incremental Backup</button>
              <p className="text-xs text-gray-500">Last backup: 2024-01-14 02:00 AM</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Restore Options</h4>
            <div className="space-y-2">
              <button className="w-full btn btn-outline">Restore from Backup</button>
              <button className="w-full btn btn-outline">View Backup History</button>
              <p className="text-xs text-gray-500">Available backups: 15</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <DevicePhoneMobileIcon className="h-8 w-8 text-orange-600" />
          <h3 className="text-lg font-medium text-gray-900">Biometric Device Integration</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-sm font-medium">Device 1</p>
            <p className="text-xs text-green-600">Connected</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <XMarkIcon className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-sm font-medium">Device 2</p>
            <p className="text-xs text-red-600">Disconnected</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <p className="text-sm font-medium">Device 3</p>
            <p className="text-xs text-yellow-600">Warning</p>
          </div>
        </div>
        <div className="mt-4">
          <button className="btn btn-primary">Configure Devices</button>
        </div>
      </div>
    </div>
  );

  const renderRoleAssignment = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Role Assignment & Permissions</h2>
        <button
          onClick={() => openModal('create-role')}
          className="btn btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Create Role</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['Admin', 'Teacher', 'Student', 'Parent'].map((role) => (
          <div key={role} className="card p-4">
            <div className="flex items-center space-x-3 mb-3">
              <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900">{role}</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
                <span>Read Access</span>
              </div>
              <div className="flex items-center space-x-2">
                {role === 'Admin' || role === 'Teacher' ? (
                  <CheckCircleIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <XMarkIcon className="h-4 w-4 text-red-500" />
                )}
                <span>Write Access</span>
              </div>
              <div className="flex items-center space-x-2">
                {role === 'Admin' ? (
                  <CheckCircleIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <XMarkIcon className="h-4 w-4 text-red-500" />
                )}
                <span>Admin Access</span>
              </div>
            </div>
            <button className="mt-3 w-full btn btn-outline btn-sm">Edit Permissions</button>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Permission Matrix</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Parent</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                'View Dashboard',
                'Manage Users',
                'View Grades',
                'Edit Grades',
                'Manage Classes',
                'System Settings',
                'Data Export',
                'Send Notifications'
              ].map((permission) => (
                <tr key={permission} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {permission}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {['View Dashboard', 'View Grades', 'Edit Grades', 'Manage Classes'].includes(permission) ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <XMarkIcon className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {['View Dashboard', 'View Grades'].includes(permission) ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <XMarkIcon className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {['View Dashboard', 'View Grades'].includes(permission) ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <XMarkIcon className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Notification Scheduler</h2>
        <button
          onClick={() => openModal('create-notification')}
          className="btn btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Schedule Notification</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center space-x-3">
            <ClockIcon className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600">Pending</p>
              <p className="text-2xl font-bold text-blue-900">5</p>
            </div>
          </div>
        </div>
        <div className="card p-4 bg-green-50 border-green-200">
          <div className="flex items-center space-x-3">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-green-600">Sent</p>
              <p className="text-2xl font-bold text-green-900">23</p>
            </div>
          </div>
        </div>
        <div className="card p-4 bg-red-50 border-red-200">
          <div className="flex items-center space-x-3">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            <div>
              <p className="text-sm text-red-600">Failed</p>
              <p className="text-2xl font-bold text-red-900">2</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Scheduled Notifications</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notifications.map((notification) => (
                <tr key={notification.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{notification.title}</div>
                      <div className="text-sm text-gray-500">{notification.message}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {notification.recipients.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {notification.scheduledDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      notification.status === 'sent' ? 'bg-green-100 text-green-800' :
                      notification.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {notification.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMonitoring = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">System Monitoring & Usage Logs</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center space-x-3">
            <UserIcon className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600">Active Users</p>
              <p className="text-2xl font-bold text-blue-900">156</p>
            </div>
          </div>
        </div>
        <div className="card p-4 bg-green-50 border-green-200">
          <div className="flex items-center space-x-3">
            <ChartBarIcon className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-green-600">Daily Logins</p>
              <p className="text-2xl font-bold text-green-900">342</p>
            </div>
          </div>
        </div>
        <div className="card p-4 bg-purple-50 border-purple-200">
          <div className="flex items-center space-x-3">
            <ServerIcon className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-sm text-purple-600">System Load</p>
              <p className="text-2xl font-bold text-purple-900">67%</p>
            </div>
          </div>
        </div>
        <div className="card p-4 bg-orange-50 border-orange-200">
          <div className="flex items-center space-x-3">
            <ExclamationTriangleIcon className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-sm text-orange-600">Alerts</p>
              <p className="text-2xl font-bold text-orange-900">3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity Logs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usageLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.ipAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.device}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">System Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Server Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Database</span>
                <span className="flex items-center text-sm text-green-600">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  Online
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Web Server</span>
                <span className="flex items-center text-sm text-green-600">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  Online
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Email Service</span>
                <span className="flex items-center text-sm text-yellow-600">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                  Warning
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Performance Metrics</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">CPU Usage</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Memory Usage</span>
                <span className="text-sm font-medium">67%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Disk Usage</span>
                <span className="text-sm font-medium">23%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return renderUserManagement();
      case 'settings':
        return renderSystemSettings();
      case 'data':
        return renderDataOperations();
      case 'roles':
        return renderRoleAssignment();
      case 'notifications':
        return renderNotifications();
      case 'monitoring':
        return renderMonitoring();
      default:
        return renderUserManagement();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
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

      {/* Tab Content */}
      <div className="mt-6">
        {renderTabContent()}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {modalType === 'create-user' && 'Create New User'}
                  {modalType === 'edit-user' && 'Edit User'}
                  {modalType === 'view-user' && 'User Details'}
                  {modalType === 'delete-user' && 'Delete User'}
                  {modalType === 'create-role' && 'Create New Role'}
                  {modalType === 'create-notification' && 'Schedule Notification'}
                  {modalType === 'add-setting' && 'Add System Setting'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                {modalType === 'delete-user' ? (
                  <div>
                    <p className="text-sm text-gray-600">
                      Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
                    </p>
                    <div className="flex justify-end space-x-3 mt-4">
                      <button onClick={closeModal} className="btn btn-outline">
                        Cancel
                      </button>
                      <button onClick={closeModal} className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-600 mb-4">
                      Modal content for {modalType} would be implemented here.
                    </p>
                    <div className="flex justify-end space-x-3">
                      <button onClick={closeModal} className="btn btn-outline">
                        Cancel
                      </button>
                      <button onClick={closeModal} className="btn btn-primary">
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;