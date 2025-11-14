import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import Hero from './ui/animated-shader-hero';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <Hero
      trustBadge={{
        text: "No. 1 Global Job Platform",
        icons: ["✨"]
      }}
      headline={{
        line1: "Find, Apply & Secure",
        line2: "Your Dream Career"
      }}
      subtitle="Explore thousands of job opportunities worldwide. Take control of your career path with the best job search platform tailored to your ambitions."
    >
      {/* Search Input */}
      <div className="flex items-center max-w-lg mx-auto bg-white/90 backdrop-blur-sm shadow-2xl rounded-full overflow-hidden border border-orange-200/30 mt-8">
        <input
          type="text"
          placeholder="Search jobs worldwide..."
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-6 py-4 outline-none border-none bg-transparent text-gray-800 placeholder:text-gray-500"
        />
        <button
          onClick={searchJobHandler}
          className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-4 transition-all duration-300 hover:scale-105 rounded-r-full"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </Hero>
  );
};

export default HeroSection;
