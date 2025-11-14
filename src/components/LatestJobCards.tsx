import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/description/${job._id}`)}
      className={`p-6 rounded-xl bg-white cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out relative ${
        job?.isPremium ? 'border-2 border-yellow-400 ring-2 ring-yellow-200' : 'border border-gray-200'
      }`}
      whileHover={{ scale: 1.05, shadow: '0px 10px 20px rgba(0, 0, 0, 0.2)' }}
      transition={{ duration: 0.3 }}
    >
      {/* Premium Badge */}
      {job?.isPremium && (
        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-lg z-10">
          <Crown className="w-3.5 h-3.5 fill-white" />
          Premium
        </div>
      )}
      
      {/* Company Info */}
      <div className='flex justify-between items-center mb-4'>
        <h1 className='font-semibold text-xl text-gray-900 dark:text-gray-100 truncate'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500 dark:text-gray-400'>{job?.location || 'Location not specified'}</p>
      </div>

      {/* Job Title and Description */}
      <div className='mb-4'>
        <h2 className='font-bold text-2xl text-gray-800 dark:text-gray-200 mb-2'>{job?.title}</h2>
        <p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-3'>{job?.description}</p>
      </div>

      {/* Job Badges */}
      <div className='flex flex-wrap gap-3 mt-4'>
        <Badge className='text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-semibold'>
          {job?.position} Positions
        </Badge>
        <Badge className='text-red-600 bg-red-100 px-3 py-1 rounded-full font-semibold'>
          {job?.jobType}
        </Badge>
        <Badge className='text-purple-600 bg-purple-100 px-3 py-1 rounded-full font-semibold'>
          {job?.salary} LPA
        </Badge>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;
