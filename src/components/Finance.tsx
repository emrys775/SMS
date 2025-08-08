import React, { useState } from 'react';
import {
  BanknotesIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CreditCardIcon,
  UserGroupIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ChartPieIcon,
  DocumentArrowDownIcon,
  BellIcon,
  CalculatorIcon
} from '@heroicons/react/24/outline';

interface Student {
  id: string;
  name: string;
  class: string;
  totalFees: number;
  paidAmount: number;
  outstandingBalance: number;
  lastPayment: string;
  status: 'paid' | 'partial' | 'overdue';
}

interface Staff {
  id: string;
  name: string;
  position: string;
  department: string;
  salary: number;
  lastPaid: string;
  status: 'paid' | 'pending';
}

interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  approvedBy: string;
  status: 'approved' | 'pending' | 'rejected';
}

interface Invoice {
  id: string;
  studentName: string;
  amount: number;
  dueDate: string;
  status: 'sent' | 'paid' | 'overdue';
  type: 'tuition' | 'transport' | 'meals' | 'books';
}

const Finance: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Sample data
  const students: Student[] = [
    {
      id: 'STU001',
      name: 'John Doe',
      class: 'Grade 10A',
      totalFees: 5000,
      paidAmount: 3000,
      outstandingBalance: 2000,
      lastPayment: '2024-01-15',
      status: 'partial'
    },
    {
      id: 'STU002',
      name: 'Jane Smith',
      class: 'Grade 9B',
      totalFees: 4500,
      paidAmount: 4500,
      outstandingBalance: 0,
      lastPayment: '2024-01-10',
      status: 'paid'
    },
    {
      id: 'STU003',
      name: 'Mike Johnson',
      class: 'Grade 11A',
      totalFees: 5500,
      paidAmount: 1000,
      outstandingBalance: 4500,
      lastPayment: '2023-12-01',
      status: 'overdue'
    }
  ];

  const staff: Staff[] = [
    {
      id: 'STF001',
      name: 'Dr. Sarah Wilson',
      position: 'Principal',
      department: 'Administration',
      salary: 8000,
      lastPaid: '2024-01-31',
      status: 'paid'
    },
    {
      id: 'STF002',
      name: 'Mark Thompson',
      position: 'Math Teacher',
      department: 'Mathematics',
      salary: 4500,
      lastPaid: '2024-01-31',
      status: 'paid'
    },
    {
      id: 'STF003',
      name: 'Lisa Brown',
      position: 'Science Teacher',
      department: 'Science',
      salary: 4200,
      lastPaid: '2024-01-25',
      status: 'pending'
    }
  ];

  const expenses: Expense[] = [
    {
      id: 'EXP001',
      category: 'Utilities',
      description: 'Electricity Bill - January',
      amount: 2500,
      date: '2024-01-15',
      approvedBy: 'Finance Manager',
      status: 'approved'
    },
    {
      id: 'EXP002',
      category: 'Supplies',
      description: 'Laboratory Equipment',
      amount: 15000,
      date: '2024-01-20',
      approvedBy: 'Principal',
      status: 'pending'
    }
  ];

  const invoices: Invoice[] = [
    {
      id: 'INV001',
      studentName: 'John Doe',
      amount: 2000,
      dueDate: '2024-02-15',
      status: 'sent',
      type: 'tuition'
    },
    {
      id: 'INV002',
      studentName: 'Mike Johnson',
      amount: 4500,
      dueDate: '2024-01-15',
      status: 'overdue',
      type: 'tuition'
    }
  ];

  const financialSummary = {
    totalRevenue: 125000,
    totalExpenses: 85000,
    netIncome: 40000,
    outstandingFees: 25000,
    monthlyBudget: 95000,
    budgetUtilization: 89.5
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: ChartBarIcon },
    { id: 'fees', name: 'Fee Collection', icon: BanknotesIcon },
    { id: 'payroll', name: 'Payroll', icon: UserGroupIcon },
    { id: 'expenses', name: 'Expenses', icon: DocumentTextIcon },
    { id: 'invoices', name: 'Invoices', icon: CreditCardIcon },
    { id: 'reports', name: 'Reports', icon: DocumentArrowDownIcon }
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
      case 'paid': return 'text-green-600 bg-green-100';
      case 'partial': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-orange-600 bg-orange-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'sent': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">${financialSummary.totalRevenue.toLocaleString()}</p>
            </div>
            <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">${financialSummary.totalExpenses.toLocaleString()}</p>
            </div>
            <DocumentTextIcon className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Income</p>
              <p className="text-2xl font-bold text-blue-600">${financialSummary.netIncome.toLocaleString()}</p>
            </div>
            <ChartPieIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Outstanding Fees</p>
              <p className="text-2xl font-bold text-orange-600">${financialSummary.outstandingFees.toLocaleString()}</p>
            </div>
            <ExclamationTriangleIcon className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Budget Utilization */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Utilization</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Monthly Budget: ${financialSummary.monthlyBudget.toLocaleString()}</span>
            <span className="text-sm font-medium text-gray-900">{financialSummary.budgetUtilization}% Used</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${financialSummary.budgetUtilization}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium">Fee Payment - John Doe</p>
              <p className="text-sm text-gray-600">Grade 10A • Jan 15, 2024</p>
            </div>
            <span className="text-green-600 font-semibold">+$1,500</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium">Electricity Bill</p>
              <p className="text-sm text-gray-600">Utilities • Jan 15, 2024</p>
            </div>
            <span className="text-red-600 font-semibold">-$2,500</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeeCollection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Fee Collection Management</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => openModal('payment-reminder')}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 flex items-center space-x-2"
          >
            <BellIcon className="h-4 w-4" />
            <span>Send Reminders</span>
          </button>
          <button
            onClick={() => openModal('record-payment')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Record Payment</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
          <option value="">All Status</option>
          <option value="paid">Paid</option>
          <option value="partial">Partial</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      {/* Students Fee Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Fees</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Payment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.class}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${student.totalFees.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  ${student.paidAmount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                  ${student.outstandingBalance.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}>
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.lastPayment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => openModal('view-payment-history', student)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openModal('record-payment', student)}
                    className="text-green-600 hover:text-green-900"
                  >
                    <CreditCardIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPayroll = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Payroll Management</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => openModal('process-payroll')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <CalculatorIcon className="h-4 w-4" />
            <span>Process Payroll</span>
          </button>
          <button
            onClick={() => openModal('generate-payslips')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <DocumentTextIcon className="h-4 w-4" />
            <span>Generate Payslips</span>
          </button>
        </div>
      </div>

      {/* Payroll Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900">{staff.length}</p>
            </div>
            <UserGroupIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Payroll</p>
              <p className="text-2xl font-bold text-green-600">
                ${staff.reduce((sum, s) => sum + s.salary, 0).toLocaleString()}
              </p>
            </div>
            <BanknotesIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-orange-600">
                {staff.filter(s => s.status === 'pending').length}
              </p>
            </div>
            <ClockIcon className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Staff Payroll Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Paid</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.position}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {member.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${member.salary.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {member.lastPaid}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => openModal('view-payroll-details', member)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openModal('process-salary', member)}
                    className="text-green-600 hover:text-green-900"
                  >
                    <BanknotesIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderExpenses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Expense Tracking</h2>
        <button
          onClick={() => openModal('add-expense')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Expense Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['Utilities', 'Supplies', 'Maintenance', 'Other'].map((category) => (
          <div key={category} className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-medium text-gray-900">{category}</h3>
            <p className="text-2xl font-bold text-blue-600">
              ${expenses
                .filter(e => e.category === category)
                .reduce((sum, e) => sum + e.amount, 0)
                .toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${expense.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.approvedBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(expense.status)}`}>
                    {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => openModal('view-expense', expense)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openModal('edit-expense', expense)}
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

  const renderInvoices = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Invoice Management</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => openModal('generate-invoice')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Generate Invoice</span>
          </button>
          <button
            onClick={() => openModal('bulk-invoice')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <DocumentTextIcon className="h-4 w-4" />
            <span>Bulk Generate</span>
          </button>
        </div>
      </div>

      {/* Invoice Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-600">Total Invoices</h3>
          <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-600">Paid</h3>
          <p className="text-2xl font-bold text-green-600">
            {invoices.filter(i => i.status === 'paid').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-600">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {invoices.filter(i => i.status === 'sent').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-600">Overdue</h3>
          <p className="text-2xl font-bold text-red-600">
            {invoices.filter(i => i.status === 'overdue').length}
          </p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {invoice.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {invoice.studentName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {invoice.type.charAt(0).toUpperCase() + invoice.type.slice(1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${invoice.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {invoice.dueDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => openModal('view-invoice', invoice)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openModal('download-invoice', invoice)}
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

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Financial Reports</h2>
        <button
          onClick={() => openModal('schedule-report')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <CalendarIcon className="h-4 w-4" />
          <span>Schedule Report</span>
        </button>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Monthly Financial Summary', description: 'Complete monthly financial overview', icon: ChartBarIcon },
          { name: 'Fee Collection Report', description: 'Student fee payment analysis', icon: BanknotesIcon },
          { name: 'Expense Analysis', description: 'Detailed expense breakdown', icon: DocumentTextIcon },
          { name: 'Payroll Summary', description: 'Staff salary and benefits report', icon: UserGroupIcon },
          { name: 'Budget vs Actual', description: 'Budget performance analysis', icon: ChartPieIcon },
          { name: 'Revenue Forecast', description: 'AI-powered revenue predictions', icon: CalculatorIcon }
        ].map((report, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <report.icon className="h-8 w-8 text-blue-600" />
              <h3 className="font-semibold text-gray-900">{report.name}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">{report.description}</p>
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700">
                Generate
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                <ArrowDownTrayIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Revenue Prediction */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Revenue Prediction</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Next Month Prediction</p>
            <p className="text-2xl font-bold text-green-600">$128,500</p>
            <p className="text-xs text-green-600">↑ 5.2% increase</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Potential Shortfall</p>
            <p className="text-2xl font-bold text-red-600">$12,000</p>
            <p className="text-xs text-red-600">Outstanding fees risk</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Confidence Level</p>
            <p className="text-2xl font-bold text-blue-600">87%</p>
            <p className="text-xs text-blue-600">Based on historical data</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'fees': return renderFeeCollection();
      case 'payroll': return renderPayroll();
      case 'expenses': return renderExpenses();
      case 'invoices': return renderInvoices();
      case 'reports': return renderReports();
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
              <h1 className="text-2xl font-bold text-gray-900">Finance Management</h1>
              <p className="text-sm text-gray-600">Comprehensive financial management system</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Current Balance</p>
                <p className="text-lg font-semibold text-green-600">${financialSummary.netIncome.toLocaleString()}</p>
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
                  {modalType === 'record-payment' && 'Record a new payment for the selected student.'}
                  {modalType === 'view-payment-history' && 'View complete payment history for the student.'}
                  {modalType === 'payment-reminder' && 'Send payment reminders to students with outstanding balances.'}
                  {modalType === 'process-payroll' && 'Process monthly payroll for all staff members.'}
                  {modalType === 'generate-payslips' && 'Generate and distribute payslips to staff.'}
                  {modalType === 'add-expense' && 'Add a new expense record to the system.'}
                  {modalType === 'generate-invoice' && 'Generate a new invoice for student fees.'}
                  {modalType === 'bulk-invoice' && 'Generate invoices for multiple students at once.'}
                  {modalType === 'schedule-report' && 'Schedule automatic generation of financial reports.'}
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

export default Finance;