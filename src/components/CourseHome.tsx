import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import HeroSection from './CourseHeroSection';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("https://job-search-b2.onrender.com/api/v1/courses",{ withCredentials: true })
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div> 
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 from-purple-50 to-blue-50 text-gray-800 dark:text-gray-200 py-10">
      <Navbar />
      <HeroSection/>
      
      <div className="container mx-auto my-12 px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-600 tracking-tight mb-12 animate-fade-in">
          Explore Our Courses
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 animate-slide-in">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </div>
      <Footer />
    </div>
  );
};

export default CoursesPage;
