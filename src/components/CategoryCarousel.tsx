import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Briefcase, Code, Database, Palette, Layers, Smartphone, Sparkles, Globe } from 'lucide-react';

const categories = [
  { name: "Frontend Developer", icon: Code, gradient: "from-orange-400 to-yellow-500" },
  { name: "Backend Developer", icon: Database, gradient: "from-yellow-400 to-orange-500" },
  { name: "Data Science", icon: Sparkles, gradient: "from-orange-500 to-red-500" },
  { name: "Graphic Designer", icon: Palette, gradient: "from-yellow-500 to-orange-400" },
  { name: "FullStack Developer", icon: Layers, gradient: "from-orange-400 to-yellow-600" },
  { name: "Mobile Developer", icon: Smartphone, gradient: "from-yellow-600 to-orange-500" },
  { name: "UX/UI Designer", icon: Briefcase, gradient: "from-orange-500 to-yellow-400" },
  { name: "Web Developer", icon: Globe, gradient: "from-yellow-500 to-orange-500" }
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query: string) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-20 px-4">
      {/* Header Section */}
      <div className="text-center mb-16 animate-fade-in-down">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 border border-orange-200 dark:border-orange-700 mb-6">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">Popular Categories</span>
        </div>
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
          Explore Job Categories
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover opportunities across diverse fields. Click on any category to find your perfect match.
        </p>
      </div>
      
      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <button
              key={index}
              onClick={() => searchJobHandler(category.name)}
              className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-orange-200/50 dark:border-orange-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 p-8"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Gradient Background Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Glow Effect on Hover */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${category.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
              
              {/* Icon Container */}
              <div className={`relative mb-4 w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              
              {/* Category Name */}
              <h3 className="relative text-lg font-bold text-gray-800 dark:text-gray-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                {category.name}
              </h3>
              
              {/* Hover Indicator */}
              <div className="relative mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Explore</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
          <Briefcase className="w-5 h-5" />
          <span>View All Jobs</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;
