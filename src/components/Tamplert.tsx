import React from 'react';

const Template = () => {
  return (
    <div className="container mx-auto my-8 p-4 flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-lg border border-gray-200">
      
      {/* Left Section: Content */}
      <div className="w-full md:w-2/3 p-4 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-gray-100">Unlock Your Career Potential</h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6">
          Explore a variety of opportunities tailored for you. From internships to mentorship, our platform connects you with resources to accelerate your growth.
        </p>
        <a 
          href="/courses" 
          className="mt-4 inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-full shadow hover:bg-blue-700 transition duration-300"
        >
          Learn More
        </a>
      </div>

      {/* Right Section: Floating Image */}
      <div className="relative w-56 md:w-1/3 flex justify-center items-center my-4">
        <img 
          src="https://cdn.prod.website-files.com/656d6ffbf552eddb5afd7d98/657a27cde5bc26158ade4ea4_chaturji.png" 
          alt="Floating" 
          className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-xl transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      {/* Cards Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 font-bold text-center my-5 p-4 md:p-6 w-full">
        <Card 
          title="Internships" 
          description="Gain hands-on experience in your field."
          bgColor="bg-gradient-to-r from-green-400 to-green-600 text-white"
        />
        <Card 
          title="Learning" 
          description="Expand your knowledge base with our resources."
          bgColor="bg-gradient-to-r from-pink-400 to-pink-600 text-white"
        />
        <Card 
          title="Jobs" 
          description="Discover a wide range of career opportunities."
          bgColor="bg-gradient-to-r from-blue-400 to-blue-600 text-white"
        />
        <Card 
          title="Practice" 
          description="Sharpen your skills with daily challenges."
          bgColor="bg-gradient-to-r from-purple-400 to-purple-600 text-white"
        />
        <Card 
          title="Competition" 
          description="Participate in contests to showcase your talent."
          bgColor="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
        />
        <Card 
          title="Mentorship" 
          description="Get guidance from experienced professionals."
          bgColor="bg-gradient-to-r from-orange-400 to-orange-600 text-white"
        />
      </div>
    </div>
  );
};

const Card = ({ title, description, bgColor }) => (
  <div className={`relative p-4 rounded-lg shadow-md overflow-hidden ${bgColor} transition-transform duration-300 hover:scale-105`}>
    <h2 className="text-md md:text-lg font-semibold mb-2">{title}</h2>
    <p className="text-sm">{description}</p>
    <div className="absolute inset-0 bg-opacity-10 rounded-lg"></div> {/* Subtle overlay for depth */}
  </div>
);

export default Template;
