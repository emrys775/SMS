import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import StudentDashboard from './pages/StudentDashboard.tsx';
import TeacherDashboard from './pages/TeacherDashboard.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import Login from './pages/Login.tsx';
import StudentManagement from './components/StudentManagement.tsx';
import TeacherManagement from './components/TeacherManagement.tsx';
import AdminManagement from './components/AdminManagement.tsx';
import Finance from './components/Finance.tsx';
import HR from './components/HR.tsx';
import Supervisor from './components/Supervisor.tsx';
import Librarian from './components/Librarian.tsx';
import Parent from './components/Parent.tsx';
import ClassManagement from './components/ClassManagement.tsx';
import SubjectManagement from './components/SubjectManagement.tsx';
import AttendanceManagement from './components/AttendanceManagement.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<AdminDashboard />} />
              
              {/* Dashboard Routes */}
              <Route path="admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="student" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              <Route path="teacher" element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              } />
              
              {/* Management Routes */}
              <Route path="/students" element={
                <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                  <StudentManagement />
                </ProtectedRoute>
              } />
              <Route path="/teachers" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <TeacherManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin-management" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminManagement />
                </ProtectedRoute>
              } />
              <Route path="/finance" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Finance />
              </ProtectedRoute>
            } />
            <Route path="/hr" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <HR />
              </ProtectedRoute>
            } />
            <Route path="/supervisor" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Supervisor />
              </ProtectedRoute>
            } />
            <Route path="/librarian" element={
              <ProtectedRoute allowedRoles={['admin', 'librarian']}>
                <Librarian />
              </ProtectedRoute>
            } />
            <Route path="/parent" element={
              <ProtectedRoute allowedRoles={['parent']}>
                <Parent />
              </ProtectedRoute>
            } />
              <Route path="teachers" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <div className="p-6"><h1 className="text-2xl font-bold">Teachers Management</h1><p>Manage teacher records and assignments.</p></div>
                </ProtectedRoute>
              } />
              <Route path="class" element={
                <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                  <ClassManagement />
                </ProtectedRoute>
              } />
              <Route path="subject" element={
                <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                  <SubjectManagement />
                </ProtectedRoute>
              } />
              
              {/* Academic Routes */}
              <Route path="attendance" element={
                <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                  <AttendanceManagement />
                </ProtectedRoute>
              } />
              <Route path="exam" element={
                <ProtectedRoute allowedRoles={['admin', 'teacher', 'student']}>
                  <div className="p-6"><h1 className="text-2xl font-bold">Exam Management</h1><p>Manage exams and results.</p></div>
                </ProtectedRoute>
              } />
              
              {/* Common Routes */}
              <Route path="library" element={
                <ProtectedRoute allowedRoles={['admin', 'teacher', 'student']}>
                  <div className="p-6"><h1 className="text-2xl font-bold">Library</h1><p>Access digital library resources.</p></div>
                </ProtectedRoute>
              } />
              <Route path="notice" element={
                <ProtectedRoute allowedRoles={['admin', 'teacher', 'student']}>
                  <div className="p-6"><h1 className="text-2xl font-bold">Notice Board</h1><p>View announcements and notices.</p></div>
                </ProtectedRoute>
              } />
              <Route path="account" element={
                <ProtectedRoute allowedRoles={['admin', 'teacher', 'student']}>
                  <div className="p-6"><h1 className="text-2xl font-bold">Account Settings</h1><p>Manage your account and profile.</p></div>
                </ProtectedRoute>
              } />
              
              {/* Admin-only Routes */}
              <Route path="transport" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <div className="p-6"><h1 className="text-2xl font-bold">Transport Management</h1><p>Manage school transportation.</p></div>
                </ProtectedRoute>
              } />
              <Route path="hostel" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <div className="p-6"><h1 className="text-2xl font-bold">Hostel Management</h1><p>Manage hostel facilities and residents.</p></div>
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;