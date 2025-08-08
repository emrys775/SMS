import React, { useState } from 'react';
import {
  BookOpenIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ClockIcon,
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
  TrophyIcon,
  BeakerIcon,
  LanguageIcon,
  MusicalNoteIcon,
  HeartIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  PaintBrushIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

interface Subject {
  id: string;
  name: string;
  code: string;
  category: 'core' | 'elective' | 'vocational' | 'extracurricular';
  description: string;
  levels: string[];
  creditHours: number;
  weeklyPeriods: number;
  duration: number; // in minutes
  teachers: AssignedTeacher[];
  curriculum: CurriculumTopic[];
  assessmentMethods: AssessmentMethod[];
  resources: SubjectResource[];
  performance: SubjectPerformance;
  status: 'active' | 'inactive' | 'under_review';
  academicYear: string;
}

interface AssignedTeacher {
  teacherId: string;
  teacherName: string;
  levels: string[];
  qualification: string;
  experience: number;
  specialization: string[];
  workload: number; // percentage
}

interface CurriculumTopic {
  id: string;
  title: string;
  description: string;
  level: string;
  term: 'Term 1' | 'Term 2' | 'Term 3';
  week: number;
  objectives: string[];
  activities: string[];
  resources: string[];
  assessment: string;
  status: 'planned' | 'in_progress' | 'completed';
}

interface AssessmentMethod {
  type: 'continuous_assessment' | 'class_test' | 'project' | 'practical' | 'final_exam';
  weight: number; // percentage
  frequency: string;
  description: string;
}

interface SubjectResource {
  id: string;
  title: string;
  type: 'textbook' | 'digital' | 'equipment' | 'software' | 'material';
  description: string;
  availability: 'available' | 'limited' | 'unavailable';
  cost: number;
  supplier: string;
}

interface SubjectPerformance {
  totalStudents: number;
  averageScore: number;
  passRate: number;
  excellentRate: number;
  attendanceRate: number;
  completionRate: number;
  levelPerformance: LevelPerformance[];
  trends: PerformanceTrend[];
}

interface LevelPerformance {
  level: string;
  students: number;
  averageScore: number;
  passRate: number;
  topPerformers: string[];
}

interface PerformanceTrend {
  period: string;
  averageScore: number;
  passRate: number;
  attendance: number;
}

interface Teacher {
  id: string;
  name: string;
  qualification: string;
  specialization: string[];
  experience: number;
  currentWorkload: number;
}

const SubjectManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCurriculumModal, setShowCurriculumModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');

  // Ghana Primary School Levels
  const ghanaLevels = [
    'Nursery 1', 'Nursery 2', 'KG 1', 'KG 2',
    'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'
  ];

  // Subject Categories
  const subjectCategories = [
    { id: 'core', name: 'Core Subjects', color: 'blue' },
    { id: 'elective', name: 'Elective Subjects', color: 'green' },
    { id: 'vocational', name: 'Vocational Subjects', color: 'purple' },
    { id: 'extracurricular', name: 'Extracurricular', color: 'orange' }
  ];

  // Sample data
  const subjects: Subject[] = [
    {
      id: '1',
      name: 'English Language',
      code: 'ENG',
      category: 'core',
      description: 'Comprehensive English language learning covering reading, writing, speaking, and listening skills.',
      levels: ['Nursery 1', 'Nursery 2', 'KG 1', 'KG 2', 'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'],
      creditHours: 6,
      weeklyPeriods: 6,
      duration: 40,
      teachers: [
        { teacherId: 'T001', teacherName: 'Mrs. Akosua Mensah', levels: ['Primary 1', 'Primary 2'], qualification: 'B.Ed English', experience: 8, specialization: ['Grammar', 'Literature'], workload: 80 },
        { teacherId: 'T002', teacherName: 'Mr. Kwame Asante', levels: ['Primary 3', 'Primary 4'], qualification: 'M.A English Literature', experience: 12, specialization: ['Creative Writing', 'Literature'], workload: 75 }
      ],
      curriculum: [],
      assessmentMethods: [
        { type: 'continuous_assessment', weight: 40, frequency: 'Weekly', description: 'Class exercises and homework' },
        { type: 'class_test', weight: 30, frequency: 'Monthly', description: 'Monthly assessments' },
        { type: 'final_exam', weight: 30, frequency: 'Termly', description: 'End of term examination' }
      ],
      resources: [
        { id: 'R001', title: 'Ghana Primary English Textbook', type: 'textbook', description: 'Official curriculum textbook', availability: 'available', cost: 25, supplier: 'Ghana Education Service' },
        { id: 'R002', title: 'English Learning Software', type: 'software', description: 'Interactive learning platform', availability: 'limited', cost: 500, supplier: 'EduTech Ghana' }
      ],
      performance: {
        totalStudents: 450,
        averageScore: 78.5,
        passRate: 87.3,
        excellentRate: 23.1,
        attendanceRate: 92.8,
        completionRate: 95.2,
        levelPerformance: [
          { level: 'Primary 1', students: 75, averageScore: 82.1, passRate: 92.0, topPerformers: ['Kwame Asante', 'Ama Serwaa'] },
          { level: 'Primary 2', students: 78, averageScore: 79.8, passRate: 89.7, topPerformers: ['Akosua Frimpong', 'Yaw Osei'] }
        ],
        trends: [
          { period: 'Term 1', averageScore: 76.2, passRate: 85.1, attendance: 91.5 },
          { period: 'Term 2', averageScore: 78.5, passRate: 87.3, attendance: 92.8 }
        ]
      },
      status: 'active',
      academicYear: '2024/2025'
    },
    {
      id: '2',
      name: 'Mathematics',
      code: 'MATH',
      category: 'core',
      description: 'Fundamental mathematics covering arithmetic, geometry, and problem-solving skills.',
      levels: ['KG 1', 'KG 2', 'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'],
      creditHours: 6,
      weeklyPeriods: 6,
      duration: 40,
      teachers: [
        { teacherId: 'T003', teacherName: 'Mr. Kwaku Boateng', levels: ['Primary 1', 'Primary 2', 'Primary 3'], qualification: 'B.Sc Mathematics Education', experience: 10, specialization: ['Arithmetic', 'Geometry'], workload: 85 }
      ],
      curriculum: [],
      assessmentMethods: [
        { type: 'continuous_assessment', weight: 35, frequency: 'Weekly', description: 'Problem-solving exercises' },
        { type: 'class_test', weight: 35, frequency: 'Bi-weekly', description: 'Mathematical assessments' },
        { type: 'final_exam', weight: 30, frequency: 'Termly', description: 'Comprehensive examination' }
      ],
      resources: [
        { id: 'R003', title: 'Ghana Mathematics Textbook', type: 'textbook', description: 'Primary mathematics curriculum', availability: 'available', cost: 30, supplier: 'Ghana Education Service' },
        { id: 'R004', title: 'Mathematical Instruments Set', type: 'equipment', description: 'Rulers, protractors, calculators', availability: 'available', cost: 15, supplier: 'Educational Supplies Ltd' }
      ],
      performance: {
        totalStudents: 420,
        averageScore: 81.2,
        passRate: 89.8,
        excellentRate: 28.6,
        attendanceRate: 94.1,
        completionRate: 96.7,
        levelPerformance: [
          { level: 'Primary 1', students: 70, averageScore: 85.3, passRate: 94.3, topPerformers: ['Nana Yaa', 'Kofi Mensah'] },
          { level: 'Primary 2', students: 72, averageScore: 83.1, passRate: 91.7, topPerformers: ['Efua Asante', 'Kwabena Osei'] }
        ],
        trends: [
          { period: 'Term 1', averageScore: 79.8, passRate: 87.2, attendance: 93.5 },
          { period: 'Term 2', averageScore: 81.2, passRate: 89.8, attendance: 94.1 }
        ]
      },
      status: 'active',
      academicYear: '2024/2025'
    },
    {
      id: '3',
      name: 'Science',
      code: 'SCI',
      category: 'core',
      description: 'Basic science concepts covering nature, environment, and simple experiments.',
      levels: ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'],
      creditHours: 4,
      weeklyPeriods: 4,
      duration: 40,
      teachers: [
        { teacherId: 'T004', teacherName: 'Mrs. Abena Osei', levels: ['Primary 4', 'Primary 5', 'Primary 6'], qualification: 'B.Sc Biology Education', experience: 7, specialization: ['Biology', 'Environmental Science'], workload: 70 }
      ],
      curriculum: [],
      assessmentMethods: [
        { type: 'continuous_assessment', weight: 30, frequency: 'Weekly', description: 'Observation and experiments' },
        { type: 'practical', weight: 40, frequency: 'Bi-weekly', description: 'Hands-on experiments' },
        { type: 'final_exam', weight: 30, frequency: 'Termly', description: 'Theory and practical exam' }
      ],
      resources: [
        { id: 'R005', title: 'Primary Science Textbook', type: 'textbook', description: 'Integrated science curriculum', availability: 'available', cost: 28, supplier: 'Ghana Education Service' },
        { id: 'R006', title: 'Science Laboratory Kit', type: 'equipment', description: 'Basic lab equipment for experiments', availability: 'limited', cost: 200, supplier: 'Science Equipment Co.' }
      ],
      performance: {
        totalStudents: 380,
        averageScore: 76.8,
        passRate: 84.2,
        excellentRate: 19.7,
        attendanceRate: 91.3,
        completionRate: 93.4,
        levelPerformance: [
          { level: 'Primary 4', students: 65, averageScore: 78.9, passRate: 86.2, topPerformers: ['Akua Serwaa', 'Yaw Asante'] },
          { level: 'Primary 5', students: 68, averageScore: 75.4, passRate: 82.4, topPerformers: ['Ama Frimpong', 'Kofi Osei'] }
        ],
        trends: [
          { period: 'Term 1', averageScore: 74.5, passRate: 81.8, attendance: 90.1 },
          { period: 'Term 2', averageScore: 76.8, passRate: 84.2, attendance: 91.3 }
        ]
      },
      status: 'active',
      academicYear: '2024/2025'
    },
    {
      id: '4',
      name: 'Ghanaian Language (Twi)',
      code: 'TWI',
      category: 'core',
      description: 'Local language instruction in Twi for cultural preservation and communication.',
      levels: ['KG 1', 'KG 2', 'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'],
      creditHours: 3,
      weeklyPeriods: 3,
      duration: 40,
      teachers: [
        { teacherId: 'T005', teacherName: 'Nana Akoto Bamfo', levels: ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4'], qualification: 'B.A Akan Studies', experience: 15, specialization: ['Twi Literature', 'Cultural Studies'], workload: 60 }
      ],
      curriculum: [],
      assessmentMethods: [
        { type: 'continuous_assessment', weight: 50, frequency: 'Weekly', description: 'Speaking and listening exercises' },
        { type: 'class_test', weight: 25, frequency: 'Monthly', description: 'Reading and writing tests' },
        { type: 'final_exam', weight: 25, frequency: 'Termly', description: 'Comprehensive language exam' }
      ],
      resources: [
        { id: 'R007', title: 'Twi Language Textbook', type: 'textbook', description: 'Primary Twi curriculum book', availability: 'available', cost: 20, supplier: 'Ghana Languages Bureau' },
        { id: 'R008', title: 'Twi Audio Materials', type: 'digital', description: 'Audio lessons and stories', availability: 'available', cost: 50, supplier: 'Cultural Heritage Media' }
      ],
      performance: {
        totalStudents: 320,
        averageScore: 83.4,
        passRate: 92.5,
        excellentRate: 35.6,
        attendanceRate: 95.2,
        completionRate: 97.8,
        levelPerformance: [
          { level: 'Primary 1', students: 55, averageScore: 86.2, passRate: 96.4, topPerformers: ['Kwame Nkrumah', 'Akosua Agyeman'] },
          { level: 'Primary 2', students: 58, averageScore: 84.7, passRate: 94.8, topPerformers: ['Yaa Asantewaa', 'Kofi Antwi'] }
        ],
        trends: [
          { period: 'Term 1', averageScore: 81.9, passRate: 90.3, attendance: 94.8 },
          { period: 'Term 2', averageScore: 83.4, passRate: 92.5, attendance: 95.2 }
        ]
      },
      status: 'active',
      academicYear: '2024/2025'
    },
    {
      id: '5',
      name: 'Information Communication Technology',
      code: 'ICT',
      category: 'elective',
      description: 'Basic computer skills and digital literacy for the modern world.',
      levels: ['Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'],
      creditHours: 2,
      weeklyPeriods: 2,
      duration: 40,
      teachers: [
        { teacherId: 'T006', teacherName: 'Mr. Emmanuel Adjei', levels: ['Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'], qualification: 'B.Sc Computer Science', experience: 5, specialization: ['Programming', 'Digital Literacy'], workload: 50 }
      ],
      curriculum: [],
      assessmentMethods: [
        { type: 'practical', weight: 60, frequency: 'Weekly', description: 'Computer exercises and projects' },
        { type: 'project', weight: 25, frequency: 'Monthly', description: 'Digital projects and presentations' },
        { type: 'class_test', weight: 15, frequency: 'Termly', description: 'Theory assessments' }
      ],
      resources: [
        { id: 'R009', title: 'Computer Laboratory', type: 'equipment', description: '30 desktop computers with internet', availability: 'available', cost: 15000, supplier: 'Tech Solutions Ghana' },
        { id: 'R010', title: 'Educational Software Suite', type: 'software', description: 'Learning applications and tools', availability: 'available', cost: 800, supplier: 'EduSoft Africa' }
      ],
      performance: {
        totalStudents: 180,
        averageScore: 79.6,
        passRate: 88.9,
        excellentRate: 22.2,
        attendanceRate: 93.3,
        completionRate: 94.4,
        levelPerformance: [
          { level: 'Primary 5', students: 48, averageScore: 81.3, passRate: 91.7, topPerformers: ['Nana Ama', 'Kweku Asante'] },
          { level: 'Primary 6', students: 52, averageScore: 78.1, passRate: 86.5, topPerformers: ['Akua Boateng', 'Yaw Mensah'] }
        ],
        trends: [
          { period: 'Term 1', averageScore: 77.2, passRate: 85.6, attendance: 92.1 },
          { period: 'Term 2', averageScore: 79.6, passRate: 88.9, attendance: 93.3 }
        ]
      },
      status: 'active',
      academicYear: '2024/2025'
    }
  ];

  const teachers: Teacher[] = [
    { id: 'T001', name: 'Mrs. Akosua Mensah', qualification: 'B.Ed English', specialization: ['Grammar', 'Literature'], experience: 8, currentWorkload: 80 },
    { id: 'T002', name: 'Mr. Kwame Asante', qualification: 'M.A English Literature', specialization: ['Creative Writing', 'Literature'], experience: 12, currentWorkload: 75 },
    { id: 'T003', name: 'Mr. Kwaku Boateng', qualification: 'B.Sc Mathematics Education', specialization: ['Arithmetic', 'Geometry'], experience: 10, currentWorkload: 85 },
    { id: 'T004', name: 'Mrs. Abena Osei', qualification: 'B.Sc Biology Education', specialization: ['Biology', 'Environmental Science'], experience: 7, currentWorkload: 70 },
    { id: 'T005', name: 'Nana Akoto Bamfo', qualification: 'B.A Akan Studies', specialization: ['Twi Literature', 'Cultural Studies'], experience: 15, currentWorkload: 60 },
    { id: 'T006', name: 'Mr. Emmanuel Adjei', qualification: 'B.Sc Computer Science', specialization: ['Programming', 'Digital Literacy'], experience: 5, currentWorkload: 50 }
  ];

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || subject.category === filterCategory;
    const matchesLevel = filterLevel === 'all' || subject.levels.includes(filterLevel);
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getSubjectIcon = (subjectName: string) => {
    const name = subjectName.toLowerCase();
    if (name.includes('english') || name.includes('language')) return LanguageIcon;
    if (name.includes('math')) return AcademicCapIcon;
    if (name.includes('science')) return BeakerIcon;
    if (name.includes('ict') || name.includes('computer')) return ComputerDesktopIcon;
    if (name.includes('art') || name.includes('creative')) return PaintBrushIcon;
    if (name.includes('music')) return MusicalNoteIcon;
    if (name.includes('physical') || name.includes('sport')) return PlayIcon;
    if (name.includes('social')) return GlobeAltIcon;
    if (name.includes('religious') || name.includes('moral')) return HeartIcon;
    return BookOpenIcon;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core': return 'text-blue-600 bg-blue-100';
      case 'elective': return 'text-green-600 bg-green-100';
      case 'vocational': return 'text-purple-600 bg-purple-100';
      case 'extracurricular': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      case 'under_review': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BookOpenIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Subjects</p>
              <p className="text-2xl font-semibold text-gray-900">{subjects.length}</p>
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
                {subjects.reduce((sum, subject) => sum + subject.performance.totalStudents, 0)}
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
                {(subjects.reduce((sum, subject) => sum + subject.performance.averageScore, 0) / subjects.length).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrophyIcon className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pass Rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {(subjects.reduce((sum, subject) => sum + subject.performance.passRate, 0) / subjects.length).toFixed(1)}%
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
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {subjectCategories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
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
            <span>Add Subject</span>
          </button>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => {
            const SubjectIcon = getSubjectIcon(subject.name);
            return (
              <div key={subject.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <SubjectIcon className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.code} • {subject.weeklyPeriods} periods/week</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(subject.status)}`}>
                    {subject.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Category:</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(subject.category)}`}>
                      {subject.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Students:</span>
                    <span className="text-sm font-medium">{subject.performance.totalStudents}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Performance:</span>
                    <span className="text-sm font-medium text-green-600">{subject.performance.averageScore}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Pass Rate:</span>
                    <span className="text-sm font-medium text-blue-600">{subject.performance.passRate}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Teachers:</span>
                    <span className="text-sm font-medium">{subject.teachers.length}</span>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedSubject(subject.id)}
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
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderSubjectDetails = () => {
    const currentSubject = subjects.find(subject => subject.id === selectedSubject);
    if (!currentSubject) return null;

    const SubjectIcon = getSubjectIcon(currentSubject.name);

    return (
      <div className="space-y-6">
        {/* Subject Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <SubjectIcon className="h-12 w-12 text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{currentSubject.name}</h2>
                <p className="text-gray-500">{currentSubject.code} • {currentSubject.description}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <PrinterIcon className="h-4 w-4 inline mr-2" />
                Print Report
              </button>
              <button
                onClick={() => setSelectedSubject(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Back to Overview
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800">Students</p>
                  <p className="text-lg font-semibold text-blue-900">{currentSubject.performance.totalStudents}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center">
                <ChartBarIcon className="h-6 w-6 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">Performance</p>
                  <p className="text-lg font-semibold text-green-900">{currentSubject.performance.averageScore}%</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center">
                <TrophyIcon className="h-6 w-6 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-purple-800">Pass Rate</p>
                  <p className="text-lg font-semibold text-purple-900">{currentSubject.performance.passRate}%</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center">
                <CalendarDaysIcon className="h-6 w-6 text-orange-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-orange-800">Attendance</p>
                  <p className="text-lg font-semibold text-orange-900">{currentSubject.performance.attendanceRate}%</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center">
                <StarIcon className="h-6 w-6 text-yellow-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-yellow-800">Excellence</p>
                  <p className="text-lg font-semibold text-yellow-900">{currentSubject.performance.excellentRate}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Information Tabs */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'teachers', label: 'Teachers', icon: UserIcon },
                { id: 'curriculum', label: 'Curriculum', icon: BookOpenIcon },
                { id: 'assessment', label: 'Assessment', icon: ClipboardDocumentListIcon },
                { id: 'resources', label: 'Resources', icon: DocumentTextIcon },
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
            {activeTab === 'teachers' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Assigned Teachers</h3>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <PlusIcon className="h-4 w-4" />
                    <span>Assign Teacher</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentSubject.teachers.map((teacher, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {teacher.teacherName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{teacher.teacherName}</h4>
                            <p className="text-sm text-gray-500">{teacher.qualification}</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{teacher.workload}% workload</span>
                      </div>
                      
                      <div className="mt-3 space-y-2">
                        <div>
                          <span className="text-sm text-gray-500">Levels: </span>
                          <span className="text-sm font-medium">{teacher.levels.join(', ')}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Experience: </span>
                          <span className="text-sm font-medium">{teacher.experience} years</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Specialization: </span>
                          <span className="text-sm font-medium">{teacher.specialization.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Curriculum Topics</h3>
                  <button
                    onClick={() => setShowCurriculumModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span>Add Topic</span>
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <BookOpenIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Curriculum Topics</h4>
                  <p className="text-gray-500 mb-4">Add curriculum topics to organize the subject content by terms and weeks.</p>
                  <button
                    onClick={() => setShowCurriculumModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add First Topic
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'assessment' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Assessment Methods</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentSubject.assessmentMethods.map((method, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900 capitalize">
                          {method.type.replace('_', ' ')}
                        </h4>
                        <span className="text-lg font-semibold text-blue-600">{method.weight}%</span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-gray-500">Frequency: </span>
                          <span className="text-sm font-medium">{method.frequency}</span>
                        </div>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Subject Resources</h3>
                  <button
                    onClick={() => setShowResourceModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span>Add Resource</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentSubject.resources.map((resource) => (
                    <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{resource.title}</h4>
                          <p className="text-sm text-gray-500 capitalize">{resource.type.replace('_', ' ')}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          resource.availability === 'available' ? 'text-green-600 bg-green-100' :
                          resource.availability === 'limited' ? 'text-yellow-600 bg-yellow-100' :
                          'text-red-600 bg-red-100'
                        }`}>
                          {resource.availability}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Cost: GH₵{resource.cost}</span>
                          <span className="text-sm text-gray-500">{resource.supplier}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Performance Analytics</h3>
                
                {/* Performance Trends */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-4">Performance Trends</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentSubject.performance.trends.map((trend, index) => (
                      <div key={index} className="bg-white rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">{trend.period}</h5>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Average Score:</span>
                            <span className="text-sm font-medium">{trend.averageScore}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Pass Rate:</span>
                            <span className="text-sm font-medium">{trend.passRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Attendance:</span>
                            <span className="text-sm font-medium">{trend.attendance}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Level Performance */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Performance by Level</h4>
                  <div className="space-y-4">
                    {currentSubject.performance.levelPerformance.map((level, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-medium text-gray-900">{level.level}</h5>
                          <span className="text-sm text-gray-500">{level.students} students</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <span className="text-sm text-gray-500">Average Score:</span>
                            <p className="text-lg font-semibold text-blue-600">{level.averageScore}%</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Pass Rate:</span>
                            <p className="text-lg font-semibold text-green-600">{level.passRate}%</p>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Top Performers: </span>
                          <span className="text-sm font-medium">{level.topPerformers.join(', ')}</span>
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
    if (selectedSubject) {
      return renderSubjectDetails();
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
              <BookOpenIcon className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Subject Management</h1>
                <p className="text-sm text-gray-500">Ghana Primary School Curriculum</p>
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

      {/* Create Subject Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Create New Subject</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subject Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="e.g., English Language"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subject Code</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="e.g., ENG"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Select Category</option>
                    {subjectCategories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Brief description of the subject"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Credit Hours</label>
                    <input
                      type="number"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="6"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Weekly Periods</label>
                    <input
                      type="number"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="6"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Duration (mins)</label>
                    <input
                      type="number"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="40"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Applicable Levels</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {ghanaLevels.map(level => (
                      <label key={level} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Create Subject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Curriculum Modal */}
      {showCurriculumModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-[700px] shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add Curriculum Topic</h3>
                <button
                  onClick={() => setShowCurriculumModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Topic Title</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g., Introduction to Numbers"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Detailed description of the topic"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Level</label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option value="">Select Level</option>
                      {ghanaLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Term</label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option value="">Select Term</option>
                      <option value="Term 1">Term 1</option>
                      <option value="Term 2">Term 2</option>
                      <option value="Term 3">Term 3</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Week</label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="1-12"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Learning Objectives</label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="List the learning objectives (one per line)"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Activities</label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="List the learning activities (one per line)"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Assessment Method</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g., Class exercise, Quiz, Project"
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowCurriculumModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Add Topic
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resource Modal */}
      {showResourceModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add Subject Resource</h3>
                <button
                  onClick={() => setShowResourceModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Resource Title</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g., Mathematics Textbook"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Resource Type</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Select Type</option>
                    <option value="textbook">Textbook</option>
                    <option value="digital">Digital Resource</option>
                    <option value="equipment">Equipment</option>
                    <option value="software">Software</option>
                    <option value="material">Learning Material</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Brief description of the resource"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cost (GH₵)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Availability</label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option value="">Select Availability</option>
                      <option value="available">Available</option>
                      <option value="limited">Limited</option>
                      <option value="unavailable">Unavailable</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Supplier</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g., Ghana Education Service"
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowResourceModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Add Resource
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

export default SubjectManagement;