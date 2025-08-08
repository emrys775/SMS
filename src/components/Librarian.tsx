import React, { useState } from 'react';
import {
  BookOpenIcon,
  QrCodeIcon,
  ClockIcon,
  UserGroupIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  BellIcon,
  DocumentArrowDownIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  TagIcon,
  BuildingLibraryIcon,
  AcademicCapIcon,
  StarIcon,
  ExclamationCircleIcon,
  ShieldExclamationIcon,
  ClipboardDocumentListIcon,
  PrinterIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  publisher: string;
  publishYear: number;
  totalCopies: number;
  availableCopies: number;
  borrowedCopies: number;
  damagedCopies: number;
  lostCopies: number;
  location: string;
  status: 'available' | 'limited' | 'unavailable';
  addedDate: string;
  lastUpdated: string;
}

interface BorrowRecord {
  id: string;
  bookId: string;
  bookTitle: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'borrowed' | 'returned' | 'overdue' | 'lost' | 'damaged';
  fineAmount: number;
  renewalCount: number;
  notes: string;
}

interface Student {
  id: string;
  name: string;
  class: string;
  rollNumber: string;
  email: string;
  phone: string;
  totalBorrowed: number;
  currentBorrowed: number;
  overdueBooks: number;
  totalFines: number;
  membershipStatus: 'active' | 'suspended' | 'expired';
  joinDate: string;
}

interface LibraryStats {
  totalBooks: number;
  availableBooks: number;
  borrowedBooks: number;
  overdueBooks: number;
  totalStudents: number;
  activeMembers: number;
  todayBorrows: number;
  todayReturns: number;
}

const Librarian: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [scanMode, setScanMode] = useState(false);

  // Sample data
  const books: Book[] = [
    {
      id: 'BK001',
      isbn: '978-0-123456-78-9',
      title: 'Introduction to Computer Science',
      author: 'John Smith',
      category: 'Technology',
      publisher: 'Tech Publications',
      publishYear: 2023,
      totalCopies: 5,
      availableCopies: 3,
      borrowedCopies: 2,
      damagedCopies: 0,
      lostCopies: 0,
      location: 'Section A - Shelf 1',
      status: 'available',
      addedDate: '2024-01-15',
      lastUpdated: '2024-02-01'
    },
    {
      id: 'BK002',
      isbn: '978-0-987654-32-1',
      title: 'Advanced Mathematics',
      author: 'Dr. Sarah Johnson',
      category: 'Mathematics',
      publisher: 'Academic Press',
      publishYear: 2022,
      totalCopies: 3,
      availableCopies: 0,
      borrowedCopies: 2,
      damagedCopies: 1,
      lostCopies: 0,
      location: 'Section B - Shelf 3',
      status: 'unavailable',
      addedDate: '2024-01-10',
      lastUpdated: '2024-01-28'
    },
    {
      id: 'BK003',
      isbn: '978-0-456789-01-2',
      title: 'World History Encyclopedia',
      author: 'Prof. Michael Brown',
      category: 'History',
      publisher: 'Historical Books Ltd',
      publishYear: 2021,
      totalCopies: 4,
      availableCopies: 1,
      borrowedCopies: 3,
      damagedCopies: 0,
      lostCopies: 0,
      location: 'Section C - Shelf 2',
      status: 'limited',
      addedDate: '2024-01-05',
      lastUpdated: '2024-01-30'
    }
  ];

  const borrowRecords: BorrowRecord[] = [
    {
      id: 'BR001',
      bookId: 'BK001',
      bookTitle: 'Introduction to Computer Science',
      studentId: 'ST001',
      studentName: 'Alice Johnson',
      studentClass: 'Grade 10-A',
      borrowDate: '2024-01-20',
      dueDate: '2024-02-05',
      status: 'borrowed',
      fineAmount: 0,
      renewalCount: 0,
      notes: ''
    },
    {
      id: 'BR002',
      bookId: 'BK002',
      bookTitle: 'Advanced Mathematics',
      studentId: 'ST002',
      studentName: 'Bob Smith',
      studentClass: 'Grade 11-B',
      borrowDate: '2024-01-10',
      dueDate: '2024-01-25',
      status: 'overdue',
      fineAmount: 15,
      renewalCount: 1,
      notes: 'Student contacted about overdue book'
    },
    {
      id: 'BR003',
      bookId: 'BK003',
      bookTitle: 'World History Encyclopedia',
      studentId: 'ST003',
      studentName: 'Carol Davis',
      studentClass: 'Grade 9-C',
      borrowDate: '2024-01-15',
      dueDate: '2024-01-30',
      returnDate: '2024-01-28',
      status: 'returned',
      fineAmount: 0,
      renewalCount: 0,
      notes: 'Returned in good condition'
    }
  ];

  const students: Student[] = [
    {
      id: 'ST001',
      name: 'Alice Johnson',
      class: 'Grade 10-A',
      rollNumber: '10A001',
      email: 'alice.johnson@school.edu',
      phone: '+1-234-567-8901',
      totalBorrowed: 15,
      currentBorrowed: 2,
      overdueBooks: 0,
      totalFines: 0,
      membershipStatus: 'active',
      joinDate: '2023-09-01'
    },
    {
      id: 'ST002',
      name: 'Bob Smith',
      class: 'Grade 11-B',
      rollNumber: '11B002',
      email: 'bob.smith@school.edu',
      phone: '+1-234-567-8902',
      totalBorrowed: 8,
      currentBorrowed: 1,
      overdueBooks: 1,
      totalFines: 15,
      membershipStatus: 'active',
      joinDate: '2022-09-01'
    },
    {
      id: 'ST003',
      name: 'Carol Davis',
      class: 'Grade 9-C',
      rollNumber: '9C003',
      email: 'carol.davis@school.edu',
      phone: '+1-234-567-8903',
      totalBorrowed: 12,
      currentBorrowed: 0,
      overdueBooks: 0,
      totalFines: 0,
      membershipStatus: 'active',
      joinDate: '2024-09-01'
    }
  ];

  const libraryStats: LibraryStats = {
    totalBooks: books.reduce((sum, book) => sum + book.totalCopies, 0),
    availableBooks: books.reduce((sum, book) => sum + book.availableCopies, 0),
    borrowedBooks: books.reduce((sum, book) => sum + book.borrowedCopies, 0),
    overdueBooks: borrowRecords.filter(record => record.status === 'overdue').length,
    totalStudents: students.length,
    activeMembers: students.filter(student => student.membershipStatus === 'active').length,
    todayBorrows: 5,
    todayReturns: 3
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: ChartBarIcon },
    { id: 'catalog', name: 'Book Catalog', icon: BookOpenIcon },
    { id: 'borrow-return', name: 'Borrow/Return', icon: ArrowPathIcon },
    { id: 'overdue', name: 'Overdue Tracker', icon: ClockIcon },
    { id: 'students', name: 'Student Records', icon: UserGroupIcon },
    { id: 'reports', name: 'Reports', icon: DocumentArrowDownIcon },
    { id: 'scan', name: 'QR/Barcode Scan', icon: QrCodeIcon }
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
      case 'available': case 'active': case 'returned': return 'text-green-600 bg-green-100';
      case 'limited': case 'borrowed': return 'text-blue-600 bg-blue-100';
      case 'unavailable': case 'overdue': case 'suspended': return 'text-red-600 bg-red-100';
      case 'damaged': case 'expired': return 'text-orange-600 bg-orange-100';
      case 'lost': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Books</p>
              <p className="text-2xl font-bold text-blue-600">{libraryStats.totalBooks}</p>
            </div>
            <BookOpenIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Books</p>
              <p className="text-2xl font-bold text-green-600">{libraryStats.availableBooks}</p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Borrowed Books</p>
              <p className="text-2xl font-bold text-orange-600">{libraryStats.borrowedBooks}</p>
            </div>
            <ArrowPathIcon className="h-8 w-8 text-orange-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue Books</p>
              <p className="text-2xl font-bold text-red-600">{libraryStats.overdueBooks}</p>
            </div>
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Members</p>
              <p className="text-2xl font-bold text-purple-600">{libraryStats.activeMembers}</p>
            </div>
            <UserGroupIcon className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Borrows</p>
              <p className="text-2xl font-bold text-indigo-600">{libraryStats.todayBorrows}</p>
            </div>
            <CalendarDaysIcon className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Returns</p>
              <p className="text-2xl font-bold text-teal-600">{libraryStats.todayReturns}</p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-teal-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-pink-600">{libraryStats.totalStudents}</p>
            </div>
            <AcademicCapIcon className="h-8 w-8 text-pink-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => openModal('add-book')}
              className="flex items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Book
            </button>
            <button
              onClick={() => setActiveTab('scan')}
              className="flex items-center justify-center p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
            >
              <QrCodeIcon className="h-5 w-5 mr-2" />
              Scan Book
            </button>
            <button
              onClick={() => openModal('send-reminders')}
              className="flex items-center justify-center p-4 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <BellIcon className="h-5 w-5 mr-2" />
              Send Reminders
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className="flex items-center justify-center p-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              Generate Report
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Alice Johnson borrowed "Computer Science"</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
              <span className="text-green-600 text-sm">Borrowed</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Carol Davis returned "World History"</p>
                <p className="text-sm text-gray-600">4 hours ago</p>
              </div>
              <span className="text-blue-600 text-sm">Returned</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Bob Smith - Overdue reminder sent</p>
                <p className="text-sm text-gray-600">1 day ago</p>
              </div>
              <span className="text-red-600 text-sm">Overdue</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBookCatalog = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Book Catalog</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => openModal('add-book')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Add Book</span>
          </button>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-1">by {book.author}</p>
                <p className="text-xs text-gray-500">{book.publisher} • {book.publishYear}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(book.status)}`}>
                {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">ISBN:</span>
                <span className="font-medium">{book.isbn}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{book.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{book.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Available:</span>
                <span className="font-medium">{book.availableCopies}/{book.totalCopies}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 text-xs text-center mb-4">
              <div className="bg-green-50 p-2 rounded">
                <div className="font-semibold text-green-600">{book.availableCopies}</div>
                <div className="text-green-600">Available</div>
              </div>
              <div className="bg-blue-50 p-2 rounded">
                <div className="font-semibold text-blue-600">{book.borrowedCopies}</div>
                <div className="text-blue-600">Borrowed</div>
              </div>
              <div className="bg-orange-50 p-2 rounded">
                <div className="font-semibold text-orange-600">{book.damagedCopies}</div>
                <div className="text-orange-600">Damaged</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="font-semibold text-gray-600">{book.lostCopies}</div>
                <div className="text-gray-600">Lost</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal('view-book', book)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <EyeIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => openModal('edit-book', book)}
                  className="text-green-600 hover:text-green-900"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => openModal('mark-damaged', book)}
                  className="text-orange-600 hover:text-orange-900"
                >
                  <ExclamationTriangleIcon className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => openModal('print-barcode', book)}
                className="text-gray-600 hover:text-gray-900"
              >
                <PrinterIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBorrowReturn = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Borrow/Return System</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setScanMode(!scanMode)}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              scanMode ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <QrCodeIcon className="h-4 w-4" />
            <span>{scanMode ? 'Exit Scan Mode' : 'Scan Mode'}</span>
          </button>
          <button
            onClick={() => openModal('manual-borrow')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Manual Borrow</span>
          </button>
        </div>
      </div>

      {scanMode && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="text-center">
            <QrCodeIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 mb-2">QR/Barcode Scanner Active</h3>
            <p className="text-blue-700 mb-4">Scan book barcode or student ID to process borrow/return</p>
            <div className="bg-white p-4 rounded border-2 border-dashed border-blue-300">
              <p className="text-gray-600">Camera feed would appear here</p>
              <p className="text-sm text-gray-500 mt-2">Scanning for QR codes and barcodes...</p>
            </div>
          </div>
        </div>
      )}

      {/* Active Borrows Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Active Borrows</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrow Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fine</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {borrowRecords.filter(record => record.status === 'borrowed' || record.status === 'overdue').map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{record.bookTitle}</div>
                    <div className="text-sm text-gray-500">ID: {record.bookId}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{record.studentName}</div>
                    <div className="text-sm text-gray-500">{record.studentClass}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.borrowDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.dueDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${record.fineAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => openModal('return-book', record)}
                    className="text-green-600 hover:text-green-900"
                  >
                    <CheckCircleIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openModal('renew-book', record)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <ArrowPathIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openModal('send-reminder', record)}
                    className="text-orange-600 hover:text-orange-900"
                  >
                    <BellIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOverdueTracker = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Overdue Books Tracker</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => openModal('send-all-reminders')}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center space-x-2"
          >
            <BellIcon className="h-4 w-4" />
            <span>Send All Reminders</span>
          </button>
          <button
            onClick={() => openModal('generate-overdue-report')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
          >
            <DocumentArrowDownIcon className="h-4 w-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Overdue Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-600">Total Overdue</h3>
          <p className="text-2xl font-bold text-red-600">
            {borrowRecords.filter(r => r.status === 'overdue').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-600">Total Fines</h3>
          <p className="text-2xl font-bold text-orange-600">
            ${borrowRecords.filter(r => r.status === 'overdue').reduce((sum, r) => sum + r.fineAmount, 0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-600">Students Affected</h3>
          <p className="text-2xl font-bold text-purple-600">
            {new Set(borrowRecords.filter(r => r.status === 'overdue').map(r => r.studentId)).size}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-600">Avg Days Overdue</h3>
          <p className="text-2xl font-bold text-blue-600">7</p>
        </div>
      </div>

      {/* Overdue Books Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Overdue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fine Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {borrowRecords.filter(record => record.status === 'overdue').map((record) => {
              const daysOverdue = Math.floor((new Date().getTime() - new Date(record.dueDate).getTime()) / (1000 * 3600 * 24));
              return (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{record.bookTitle}</div>
                      <div className="text-sm text-gray-500">ID: {record.bookId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{record.studentName}</div>
                      <div className="text-sm text-gray-500">{record.studentClass}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600">
                      {daysOverdue} days
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                    ${record.fineAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <EnvelopeIcon className="h-4 w-4" />
                      </button>
                      <span className="text-gray-400">|</span>
                      <span className="text-xs text-gray-500">Last: 2 days ago</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => openModal('send-reminder', record)}
                      className="text-orange-600 hover:text-orange-900"
                    >
                      <BellIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => openModal('mark-lost', record)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <XCircleIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => openModal('force-return', record)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <CheckCircleIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderStudentRecords = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Student Library Records</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => openModal('export-student-data')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <DocumentArrowDownIcon className="h-4 w-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {students.map((student) => (
          <div key={student.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.class} • Roll: {student.rollNumber}</p>
                <p className="text-sm text-gray-500">{student.email}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.membershipStatus)}`}>
                {student.membershipStatus.charAt(0).toUpperCase() + student.membershipStatus.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-blue-50 rounded">
                <div className="text-lg font-bold text-blue-600">{student.totalBorrowed}</div>
                <div className="text-xs text-blue-600">Total Borrowed</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded">
                <div className="text-lg font-bold text-green-600">{student.currentBorrowed}</div>
                <div className="text-xs text-green-600">Currently Borrowed</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded">
                <div className="text-lg font-bold text-red-600">{student.overdueBooks}</div>
                <div className="text-xs text-red-600">Overdue Books</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded">
                <div className="text-lg font-bold text-orange-600">${student.totalFines}</div>
                <div className="text-xs text-orange-600">Total Fines</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Member since: {student.joinDate}</span>
              <div className="space-x-2">
                <button
                  onClick={() => openModal('view-student-history', student)}
                  className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                >
                  View History
                </button>
                <button
                  onClick={() => openModal('send-student-reminder', student)}
                  className="text-orange-600 hover:text-orange-900 text-sm font-medium"
                >
                  Send Reminder
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Library Reports</h2>
        <button
          onClick={() => openModal('schedule-report')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <CalendarDaysIcon className="h-4 w-4" />
          <span>Schedule Report</span>
        </button>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center mb-4">
            <StarIcon className="h-8 w-8 text-yellow-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Most Popular Books</h3>
          </div>
          <p className="text-gray-600 mb-4">Books with highest borrow frequency</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Computer Science</span>
              <span className="text-sm font-medium">25 borrows</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">World History</span>
              <span className="text-sm font-medium">18 borrows</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Advanced Math</span>
              <span className="text-sm font-medium">15 borrows</span>
            </div>
          </div>
          <button
            onClick={() => openModal('generate-popular-books-report')}
            className="w-full mt-4 bg-yellow-50 text-yellow-600 py-2 rounded hover:bg-yellow-100"
          >
            Generate Full Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center mb-4">
            <UserGroupIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Student Usage</h3>
          </div>
          <p className="text-gray-600 mb-4">Reading patterns and library usage</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Active readers</span>
              <span className="text-sm font-medium">{students.filter(s => s.currentBorrowed > 0).length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Avg books/student</span>
              <span className="text-sm font-medium">{Math.round(students.reduce((sum, s) => sum + s.totalBorrowed, 0) / students.length)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Top reader</span>
              <span className="text-sm font-medium">Alice Johnson</span>
            </div>
          </div>
          <button
            onClick={() => openModal('generate-usage-report')}
            className="w-full mt-4 bg-blue-50 text-blue-600 py-2 rounded hover:bg-blue-100"
          >
            Generate Full Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center mb-4">
            <ClockIcon className="h-8 w-8 text-red-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Overdue Analysis</h3>
          </div>
          <p className="text-gray-600 mb-4">Overdue trends and fine collection</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Current overdue</span>
              <span className="text-sm font-medium">{borrowRecords.filter(r => r.status === 'overdue').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Total fines</span>
              <span className="text-sm font-medium">${borrowRecords.filter(r => r.status === 'overdue').reduce((sum, r) => sum + r.fineAmount, 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Collection rate</span>
              <span className="text-sm font-medium">85%</span>
            </div>
          </div>
          <button
            onClick={() => openModal('generate-overdue-analysis')}
            className="w-full mt-4 bg-red-50 text-red-600 py-2 rounded hover:bg-red-100"
          >
            Generate Full Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center mb-4">
            <BookOpenIcon className="h-8 w-8 text-green-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Inventory Report</h3>
          </div>
          <p className="text-gray-600 mb-4">Book inventory and condition status</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Total books</span>
              <span className="text-sm font-medium">{libraryStats.totalBooks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Available</span>
              <span className="text-sm font-medium">{libraryStats.availableBooks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Need replacement</span>
              <span className="text-sm font-medium">{books.reduce((sum, b) => sum + b.damagedCopies + b.lostCopies, 0)}</span>
            </div>
          </div>
          <button
            onClick={() => openModal('generate-inventory-report')}
            className="w-full mt-4 bg-green-50 text-green-600 py-2 rounded hover:bg-green-100"
          >
            Generate Full Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center mb-4">
            <TagIcon className="h-8 w-8 text-purple-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Category Analysis</h3>
          </div>
          <p className="text-gray-600 mb-4">Popular categories and demand trends</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Technology</span>
              <span className="text-sm font-medium">35%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Mathematics</span>
              <span className="text-sm font-medium">25%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">History</span>
              <span className="text-sm font-medium">20%</span>
            </div>
          </div>
          <button
            onClick={() => openModal('generate-category-report')}
            className="w-full mt-4 bg-purple-50 text-purple-600 py-2 rounded hover:bg-purple-100"
          >
            Generate Full Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center mb-4">
            <ChartBarIcon className="h-8 w-8 text-indigo-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Monthly Summary</h3>
          </div>
          <p className="text-gray-600 mb-4">Monthly library activity summary</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Books borrowed</span>
              <span className="text-sm font-medium">156</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Books returned</span>
              <span className="text-sm font-medium">142</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">New members</span>
              <span className="text-sm font-medium">8</span>
            </div>
          </div>
          <button
            onClick={() => openModal('generate-monthly-report')}
            className="w-full mt-4 bg-indigo-50 text-indigo-600 py-2 rounded hover:bg-indigo-100"
          >
            Generate Full Report
          </button>
        </div>
      </div>
    </div>
  );

  const renderScanMode = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">QR/Barcode Scanner</h2>
        <p className="text-gray-600">Scan book barcodes or student IDs for quick processing</p>
      </div>

      {/* Scanner Interface */}
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div className="text-center">
          <QrCodeIcon className="h-24 w-24 text-blue-600 mx-auto mb-6" />
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12 mb-6">
            <p className="text-gray-600 text-lg">Camera Scanner Interface</p>
            <p className="text-gray-500 text-sm mt-2">Point camera at QR code or barcode</p>
            <div className="mt-4 p-4 bg-white rounded border">
              <p className="text-xs text-gray-400">Scanning area - QR/Barcode detection active</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => openModal('manual-scan-input')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <PencilIcon className="h-5 w-5" />
              <span>Manual Input</span>
            </button>
            <button
              onClick={() => setActiveTab('borrow-return')}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 flex items-center justify-center space-x-2"
            >
              <ArrowPathIcon className="h-5 w-5" />
              <span>Back to Borrow/Return</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Scans */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Scans</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded">
              <div>
                <p className="font-medium text-green-900">Book: Computer Science (BK001)</p>
                <p className="text-sm text-green-700">Returned by Alice Johnson</p>
              </div>
              <span className="text-green-600 text-sm">2 min ago</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
              <div>
                <p className="font-medium text-blue-900">Student: Bob Smith (ST002)</p>
                <p className="text-sm text-blue-700">Borrowed Advanced Mathematics</p>
              </div>
              <span className="text-blue-600 text-sm">5 min ago</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
              <div>
                <p className="font-medium text-orange-900">Book: World History (BK003)</p>
                <p className="text-sm text-orange-700">Scan failed - manual input required</p>
              </div>
              <span className="text-orange-600 text-sm">8 min ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'catalog': return renderBookCatalog();
      case 'borrow-return': return renderBorrowReturn();
      case 'overdue': return renderOverdueTracker();
      case 'students': return renderStudentRecords();
      case 'reports': return renderReports();
      case 'scan': return renderScanMode();
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
              <h1 className="text-2xl font-bold text-gray-900">Library Management System</h1>
              <p className="text-sm text-gray-600">Comprehensive book catalog and borrowing system</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Books</p>
                <p className="text-lg font-semibold text-blue-600">{libraryStats.totalBooks}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openModal('library-settings')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <BuildingLibraryIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => openModal('notifications')}
                  className="text-gray-600 hover:text-gray-900 relative"
                >
                  <BellIcon className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {borrowRecords.filter(r => r.status === 'overdue').length}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {modalType === 'add-book' && 'Add New Book'}
                {modalType === 'edit-book' && 'Edit Book'}
                {modalType === 'view-book' && 'Book Details'}
                {modalType === 'return-book' && 'Return Book'}
                {modalType === 'send-reminder' && 'Send Reminder'}
                {modalType === 'mark-damaged' && 'Mark as Damaged'}
                {modalType === 'mark-lost' && 'Mark as Lost'}
                {modalType === 'view-student-history' && 'Student Reading History'}
                {modalType === 'manual-scan-input' && 'Manual Barcode/ID Input'}
                {modalType.includes('generate') && 'Generate Report'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {modalType === 'add-book' && (
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Book Title"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Author"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="ISBN"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Select Category</option>
                      <option>Technology</option>
                      <option>Mathematics</option>
                      <option>History</option>
                      <option>Science</option>
                      <option>Literature</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Publisher"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Publication Year"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Number of Copies"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Shelf Location"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Add Book
                    </button>
                  </div>
                </form>
              )}
              
              {modalType === 'manual-scan-input' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Barcode or Student ID
                    </label>
                    <input
                      type="text"
                      placeholder="Scan or type barcode/ID..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Process
                    </button>
                  </div>
                </div>
              )}
              
              {modalType === 'send-reminder' && selectedItem && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900">Reminder Details</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Book: {selectedItem.bookTitle}
                    </p>
                    <p className="text-sm text-gray-600">
                      Student: {selectedItem.studentName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Due Date: {selectedItem.dueDate}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reminder Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter custom reminder message..."
                      defaultValue={`Dear ${selectedItem.studentName}, this is a reminder that your book "${selectedItem.bookTitle}" was due on ${selectedItem.dueDate}. Please return it as soon as possible to avoid additional fines.`}
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                      Send Reminder
                    </button>
                  </div>
                </div>
              )}
              
              {modalType.includes('generate') && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900">Report Configuration</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Configure your report parameters below
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Range
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 3 months</option>
                        <option>Last 6 months</option>
                        <option>Last year</option>
                        <option>Custom range</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Format
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>PDF</option>
                        <option>Excel</option>
                        <option>CSV</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Generate Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Librarian;