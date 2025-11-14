import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SocketProvider } from "./contexts/SocketContext";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminDashboard from "./components/admin/Banners";
import AdminCourse from "./components/admin/AdminDashboard";
import CoursesPage from "./components/CourseHome";
import Pricing from "./components/Pricing";

// ✅ Define the router
const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/courses", element: <CoursesPage /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/description/:id", element: <JobDescription /> },
  { path: "/browse", element: <Browse /> },
  { path: "/profile", element: <Profile /> },

  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/banner",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/courses",
    element: <AdminCourse />,
  },
]);


const App: React.FC = () => {
  return (
    <SocketProvider>
      <div>
        <RouterProvider router={appRouter}/>
      </div>
    </SocketProvider>
  );
};

export default App;
