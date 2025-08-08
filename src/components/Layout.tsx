import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import {
  HomeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BookOpenIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  BanknotesIcon,
  UsersIcon,
  ShieldCheckIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Sidebar is now permanently fixed
  const sidebarOpen = true;

  if (!user) {
    navigate('/login');
    return null;
  }

  const menuItems = [
    { icon: HomeIcon, label: 'Dashboard', path: '/', roles: ['admin', 'teacher', 'student', 'parent'] },
    { icon: CogIcon, label: 'Admin Management', path: '/admin-management', roles: ['admin'] },
    { icon: UserGroupIcon, label: 'Students', path: '/students', roles: ['admin', 'teacher'] },
    { icon: AcademicCapIcon, label: 'Teachers', path: '/teachers', roles: ['admin'] },
    { icon: ClipboardDocumentListIcon, label: 'Class', path: '/class', roles: ['admin', 'teacher'] },
    { icon: BanknotesIcon, label: 'Finance', path: '/finance', roles: ['admin'] },
    { icon: UsersIcon, label: 'HR', path: '/hr', roles: ['admin'] },
    { icon: ShieldCheckIcon, label: 'Supervisor', path: '/supervisor', roles: ['admin'] },
    { icon: BuildingLibraryIcon, label: 'Librarian', path: '/librarian', roles: ['admin', 'librarian'] },
    { icon: UsersIcon, label: 'Parent Portal', path: '/parent', roles: ['parent'] },
    { icon: BookOpenIcon, label: 'Subject', path: '/subject', roles: ['admin', 'teacher'] },

    { icon: ChartBarIcon, label: 'Attendance', path: '/attendance', roles: ['admin', 'teacher'] },
    { icon: ClipboardDocumentListIcon, label: 'Exam', path: '/exam', roles: ['admin', 'teacher', 'student'] },
    { icon: BellIcon, label: 'Communication', path: '/notice', roles: ['admin', 'teacher', 'student'] },
    { icon: HomeIcon, label: 'Hostel', path: '/hostel', roles: ['admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Permanently Fixed */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">{user.school?.charAt(0) || 'S'}</span>
            </div>
            <span className="text-xl font-bold text-gray-900">{user.school || 'AI Academy'}</span>
          </div>
          {/* Close button removed - sidebar is now permanently fixed */}
        </div>
        
        <nav className="mt-6 px-3 overflow-y-auto max-h-[calc(100vh-120px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {filteredMenuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`sidebar-item w-full mb-1 ${isActive ? 'active' : ''}`}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              {/* Menu button removed - sidebar is permanently fixed */}
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="What do you want to find?"
                  className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <BellIcon className="h-6 w-6" />
              </button>
              
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <CogIcon className="h-6 w-6" />
              </button>
              
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                </div>
                <button onClick={logout} className="p-1 text-gray-400 hover:text-gray-500">
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile overlay removed - sidebar is permanently fixed */}
    </div>
  );
};

export default Layout;