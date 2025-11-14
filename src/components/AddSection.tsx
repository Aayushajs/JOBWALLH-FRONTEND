import React from 'react';

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6 md:p-10 rounded-3xl shadow-2xl mx-auto w-11/12 md:w-9/12 my-10 animate-fadeIn">
      {/* Left Side (Image) */}
      <div className="md:w-1/2 w-full relative">
        <div className="relative group">
          <img
            src={"https://d8it4huxumps7.cloudfront.net/uploads/images/66a385030aa29_courses.png?d=996x803"}
            alt="Hero"
            className="w-full h-auto rounded-3xl transform transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-500 group-hover:scale-105">
            <p className="text-gray-800 dark:text-gray-200 font-extrabold text-xl">70,324+</p>
            <p className="text-gray-600 dark:text-gray-400">Students Preparing</p>
          </div>
        </div>
      </div>

      {/* Right Side (Text and Button) */}
      <div className="md:w-1/2 w-full md:pl-8 mt-8 md:mt-0 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fadeIn tracking-tight">
          Learn & <span className="text-yellow-400">Level Up Your Skills</span>
        </h1>
        <p className="text-base md:text-lg mb-6 animate-fadeIn">
          Select from a wide range of courses to upskill and advance your career!
        </p>
        <ul className="flex flex-wrap gap-4 mb-8 animate-fadeIn justify-center md:justify-start">
          <li className="flex items-center space-x-2 text-yellow-300">
            <span className="font-extrabold">✔</span>
            <p>50+ Courses</p>
          </li>
          <li className="flex items-center space-x-2 text-yellow-300">
            <span className="font-extrabold">✔</span>
            <p>Certificate</p>
          </li>
          <li className="flex items-center space-x-2 text-yellow-300">
            <span className="font-extrabold">✔</span>
            <p>Projects & Assignments</p>
          </li>
        </ul>
        <a
          href="/courses"
          className="relative bg-yellow-400 text-gray-900 px-6 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition-all inline-block text-lg font-bold tracking-wider"
        >
          Explore Courses →
          <span className="absolute left-0 bottom-0 w-full h-1 bg-white scale-x-0 transition-transform duration-500 ease-in-out origin-left hover:scale-x-100"></span>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
