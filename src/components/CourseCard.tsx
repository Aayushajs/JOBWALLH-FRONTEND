import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:shadow-2xl hover:scale-105">
      <img
        className="rounded-t-lg w-full h-48 object-cover"
        src={course.image}
        alt={course.title}
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">{course.title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{course.description}</p>
        <a 
          href={course.youtubeLink} // Assuming course.youtubeLink contains the YouTube URL
          target="_blank" 
          rel="noopener noreferrer"
        >
          <button className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all duration-300">
            Learn More
          </button>
        </a>
      </div>
    </div>
  );
};

export default CourseCard;
