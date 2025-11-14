import React from 'react';
import { motion } from 'framer-motion'; // For animations

const HeroSection = () => {
  return (
    <div className="relative flex flex-col lg:flex-row justify-between items-center px-6 py-12 bg-gradient-to-r from-blue-200 to-purple-300 overflow-hidden">
      {/* Left Section */}
      <div className="flex-1 z-10 mb-8 lg:mb-0">
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-700 leading-tight border-b-4 border-blue-600 inline-block pb-2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Unlock Knowledge
        </motion.h1>
        <motion.p
          className="text-gray-700 dark:text-gray-300 mt-4 text-lg max-w-md"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          From tech to non-tech, select from a wide range of courses to upskill and advance your career!
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <button className="px-8 py-4 border border-purple-600 text-white rounded-full bg-purple-600 shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all duration-300">
            Join Courses Pro
          </button>
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="flex-1 relative flex justify-center">
        <motion.img
          className="absolute right-8 w-32 h-32 sm:w-48 sm:h-48 lg:w-56 lg:h-56 z-0 transform hover:rotate-6 transition-transform duration-700"
          src="https://cdn.unstop.com/uploads/images/unstop/user-referral/process-image.png?d=574x617"
          alt="Student 1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
        <motion.img
          className="absolute right-12 w-28 h-28 sm:w-40 sm:h-40 lg:w-48 lg:h-48 z-0 transform hover:-rotate-6 transition-transform duration-700"
          src="https://d8it4huxumps7.cloudfront.net/uploads/images/6231c2c0b51ff_iso_9001.svg"
          alt="Student 2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        />
        {/* Decorative floating circle */}
        <motion.div
          className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-purple-200 rounded-full opacity-50 top-32 right-0 z-[-1]"
          animate={{ scale: [0.9, 1.1], rotate: [0, 10, -10, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        ></motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
