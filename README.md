# School Management System (SMS)

A comprehensive School Management System (SMS) SaaS platform designed for schools across Africa, starting with Ghana. This system handles academic, administrative, financial, and communication needs while integrating Artificial Intelligence for enhanced educational experiences.

## Features

### 🎯 Core Functionality
- **Student Management**: Complete student profiles, attendance tracking, and academic progress
- **Teacher Dashboard**: Class management, grading, and student performance analytics
- **Admin Panel**: Comprehensive school oversight with detailed analytics and reporting
- **Multi-Role Support**: Different dashboards for students, teachers, admins, parents, and more

### 🤖 AI Integration
- Student performance analysis
- Personalized learning recommendations
- Career guidance suggestions
- Gamified learning content

### 📱 Modern UI/UX
- Responsive design that works on all devices
- Beautiful, intuitive interface inspired by modern design principles
- Dark/light mode support
- Accessibility-first approach

## Technology Stack

- **Frontend**: React.js + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express.js (planned)
- **Database**: Firebase Firestore (NoSQL), Firebase Realtime DB
- **Authentication**: Firebase Auth
- **Cloud Functions**: Firebase Functions
- **Offline Support**: PWA (Progressive Web App)
- **Messaging/SMS**: Africa's Talking API
- **AI/Automation**: OpenAI API
- **Hosting**: Supabase

## User Roles

1. **Student** - Access assignments, study resources, AI support, academic tracking
2. **Teacher** - Class assignments, grading, attendance, lesson materials
3. **Admin** - System settings, user accounts, scheduling, communication
4. **Parent/Guardian** - View child's progress, receive alerts, pay fees
5. **Headmaster/Principal** - School oversight, reports, analytics, approvals
6. **Accountant** - Fee tracking, financial reports, budgeting, payroll
7. **HR Manager** - Staff records, attendance, recruitment, appraisals
8. **And more...**

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SMS
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Demo Accounts

You can use these demo accounts to explore different user roles:

- **Admin**: admin@school.com (password: any)
- **Student**: student@school.com (password: any)
- **Teacher**: teacher@school.com (password: any)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Layout.tsx      # Main layout with sidebar and header
├── contexts/           # React contexts for state management
│   └── AuthContext.tsx # Authentication context
├── pages/              # Page components
│   ├── AdminDashboard.tsx
│   ├── StudentDashboard.tsx
│   ├── TeacherDashboard.tsx
│   └── Login.tsx
├── App.tsx             # Main app component with routing
├── index.tsx           # App entry point
└── index.css           # Global styles with Tailwind
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact the development team.

---

**Built with ❤️ for African schools**