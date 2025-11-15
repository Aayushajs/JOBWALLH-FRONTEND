# 🚀 Job Portal - Frontend

A modern, feature-rich job portal frontend built with React, TypeScript, and Tailwind CSS. This application provides a seamless experience for both job seekers and recruiters with real-time notifications, premium features, and beautiful UI/UX.

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

### 👨‍💼 For Job Seekers
- **Smart Job Search** - Advanced filtering by location, salary, job type, and skills
- **One-Click Apply** - Quick application process with resume upload
- **Real-Time Notifications** - Instant updates on application status changes
- **Application Tracking** - Monitor all your applications in one place
- **Premium Membership** - Access exclusive job postings and features
- **Profile Management** - Showcase your skills, experience, and resume
- **Job Recommendations** - AI-powered job suggestions based on your profile

### 🏢 For Recruiters
- **Company Management** - Create and manage multiple company profiles
- **Job Posting** - Post jobs with detailed requirements and benefits
- **Applicant Management** - Review, filter, and manage applications
- **Real-Time Updates** - Instant notifications when candidates apply
- **Analytics Dashboard** - Track job performance and applicant metrics
- **Premium Job Posting** - Highlight jobs to attract top talent
- **Bulk Actions** - Accept/reject multiple applications efficiently

### 🎯 Core Features
- **Real-Time Communication** - Socket.IO integration for live updates
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Dark Mode Support** - Easy on the eyes with automatic theme switching
- **Premium Plans** - Multiple tier system with expiry tracking
- **Payment Integration** - Secure payment processing for premium features
- **Course Platform** - Access to professional development courses
- **Beautiful Animations** - Smooth transitions with Framer Motion
- **Social Sharing** - Share job postings on WhatsApp and social media

## 🛠️ Tech Stack

### Core
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **React Router DOM** - Client-side routing

### State Management
- **Redux Toolkit** - Efficient state management
- **RTK Query** - Powerful data fetching

### UI/UX
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful component library
- **Framer Motion** - Smooth animations
- **Lucide React** - Icon library
- **React Confetti** - Celebration animations

### Real-Time
- **Socket.IO Client** - Real-time bidirectional communication

### Forms & Validation
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation

### Data Visualization
- **Recharts** - Modern charting library

### Others
- **Axios** - HTTP client
- **Sonner** - Toast notifications
- **date-fns** - Date manipulation

## 📦 Installation

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Git

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/Aayushajs/JOB-FRONTEND-COMPANY.git
cd JOB-FRONTEND-COMPANY
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=https://job-backend-company.onrender.com/api/v1
VITE_SOCKET_URL=https://job-backend-company.onrender.com
```

4. **Start development server**
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # React components
│   │   ├── admin/         # Recruiter dashboard components
│   │   ├── auth/          # Login/Signup components
│   │   ├── shared/        # Shared components (Navbar, Footer)
│   │   └── ui/            # Reusable UI components (shadcn/ui)
│   ├── contexts/          # React contexts (SocketContext)
│   ├── hooks/             # Custom React hooks
│   │   ├── useGetAllJobs.jsx
│   │   ├── useGetAppliedJobs.jsx
│   │   ├── useRealtimeJobs.tsx
│   │   └── useRealtimeApplicationStatus.tsx
│   ├── lib/               # Utility functions
│   ├── redux/             # Redux store and slices
│   │   ├── store.js
│   │   ├── authSlice.js
│   │   ├── jobSlice.js
│   │   ├── companySlice.js
│   │   └── applicationSlice.js
│   ├── utils/             # Constants and helpers
│   │   └── constant.js    # API endpoints
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── .env                   # Environment variables
├── components.json        # shadcn/ui configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.js         # Vite configuration
├── netlify.toml           # Netlify deployment config
└── package.json           # Dependencies
```

## 🎨 Key Components

### Pages
- **Home** - Landing page with featured jobs
- **Jobs** - Browse all available jobs
- **Browse** - Advanced job search
- **Profile** - User/Recruiter profile
- **Job Description** - Detailed job view
- **Admin Dashboard** - Recruiter control panel
- **Companies** - Company management
- **Course Home** - Learning platform

### Real-Time Hooks
- `useRealtimeJobs()` - Listen for new job postings
- `useRealtimeApplicationStatus()` - Track application status changes
- `useRealtimeRecruiterUpdates()` - Recruiter-side notifications

## 🔌 API Integration

### Base URL
```typescript
const API_BASE_URL = 'https://job-backend-company.onrender.com/api/v1';
```

### Endpoints
- **User**: `/user/register`, `/user/login`, `/user/logout`, `/user/profile/update`
- **Job**: `/job/post`, `/job/get`, `/job/getadminjobs`, `/job/get/:id`
- **Application**: `/application/apply/:id`, `/application/get`, `/application/status/:id/update`
- **Company**: `/company/register`, `/company/get`, `/company/get/:id`, `/company/update/:id`

## 🌐 Deployment

### Netlify Deployment

The project is configured for Netlify deployment with SPA routing:

```toml
# netlify.toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Deploy Steps:**
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Build Command
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## 🔐 Authentication Flow

1. User registers/logs in
2. JWT token stored in cookies (httpOnly)
3. Token sent with each API request
4. Protected routes check authentication status
5. Automatic logout on token expiration

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components are fully responsive with mobile-first design.

## 🎭 Dark Mode

Automatic dark mode support using Tailwind CSS dark mode classes:
```typescript
<div className="bg-white dark:bg-gray-800">
```

## 🔔 Real-Time Features

### Socket.IO Connection
```typescript
const socket = io('https://job-backend-company.onrender.com', {
  withCredentials: true,
  transports: ['websocket', 'polling']
});
```

### Events
- **newJob** - New job posted
- **applicationStatusUpdate** - Application status changed
- **join** - Join user-specific room
- **joinJobsRoom** - Join jobs broadcast room

## 🎨 Theming

### Color Palette
- **Primary**: Blue/Indigo gradient
- **Secondary**: Orange/Yellow gradient
- **Success**: Green
- **Error**: Red
- **Warning**: Yellow

### Typography
- **Font**: Inter, system-ui
- **Headings**: Bold, 2xl-4xl
- **Body**: Regular, sm-base

## 🧪 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Production build
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

## 📊 Performance Optimizations

- **Code Splitting** - Lazy loading for routes
- **Image Optimization** - Lazy loading images
- **Memoization** - React.memo for expensive components
- **Virtual Scrolling** - For large lists
- **Bundle Analysis** - Optimized bundle size

## 🐛 Common Issues & Solutions

### Issue: CORS Error
**Solution**: Ensure backend CORS is configured correctly with your frontend URL.

### Issue: Socket connection fails
**Solution**: Check SOCKET_URL in constants and verify backend is running.

### Issue: 404 on refresh
**Solution**: Configure server to handle SPA routing (netlify.toml included).

### Issue: Images not loading
**Solution**: Check Cloudinary configuration and image URLs.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Style

- Use TypeScript for new components
- Follow ESLint rules
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add comments for complex logic

## 🔒 Security

- **XSS Protection** - React's built-in escaping
- **CSRF Protection** - Token-based authentication
- **Secure Cookies** - httpOnly, secure flags
- **Input Validation** - Zod schema validation
- **API Rate Limiting** - Backend implemented

## 📞 Support

For support, email support@jobportal.com or join our Discord server.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- **shadcn/ui** - Beautiful component library
- **Tailwind CSS** - Awesome utility-first CSS
- **React Community** - Helpful resources and support
- **Lucide Icons** - Beautiful icon set

---

**Built with ❤️ by Aayush**

🌟 Star this repo if you find it helpful!

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
