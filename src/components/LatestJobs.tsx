import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '@/redux/store';
import { ArrowRight, Sparkles, TrendingUp, Clock, MapPin, Briefcase } from 'lucide-react';

const LatestJobs = () => {
  const { allJobs } = useSelector((store: RootState) => store.job);

  // Stats data for the header
  const stats = [
    { icon: Briefcase, number: '10K+', label: 'Active Jobs' },
    { icon: MapPin, number: '50+', label: 'Countries' },
    { icon: TrendingUp, number: '95%', label: 'Success Rate' },
    { icon: Clock, number: '24/7', label: 'Support' },
  ];

  return (
    <div className='relative bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-24 overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]' />
      
      {/* Animated Background Shapes */}
      <div className='absolute top-10 left-10 w-72 h-72 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 animate-pulse' />
      <div className='absolute top-40 right-10 w-96 h-96 bg-yellow-200 dark:bg-yellow-900/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 animate-pulse delay-1000' />
      <div className='absolute bottom-20 left-1/3 w-80 h-80 bg-pink-200 dark:bg-pink-900/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 animate-pulse delay-2000' />

      <div className='max-w-7xl mx-auto px-6 relative z-10'>
        {/* Header Section with Stats */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className='inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200 dark:border-purple-700 rounded-full px-6 py-3 mb-6 shadow-lg'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className='w-5 h-5 text-purple-600 dark:text-purple-400' />
            <span className='text-purple-700 dark:text-purple-300 font-semibold text-sm'>Top Companies Hiring Now</span>
          </motion.div>

          

          {/* Subtitle */}
          <motion.p
            className='text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore hand-picked opportunities from top companies worldwide. 
            Your next career move starts here.
          </motion.p>

          {/* Stats Grid */}
          {/* <motion.div
            className='grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className='text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { type: 'spring', stiffness: 300 }
                }}
              >
                <stat.icon className='w-8 h-8 text-purple-600 mx-auto mb-3' />
                <div className='text-2xl font-bold text-gray-900'>{stat.number}</div>
                <div className='text-gray-600 text-sm'>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div> */}
        </motion.div>

        {/* Featured Jobs Section */}
        <motion.div
          className='mb-12'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h2 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
                Featured <span className='text-purple-600 dark:text-purple-400'>Opportunities</span>
              </h2>
              <p className='text-gray-600 dark:text-gray-300 mt-2'>Curated selection of top-tier positions</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href='/browse'
                className='group flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300'
              >
                View All Jobs
                <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Job Cards Grid */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {allJobs.length <= 0 ? (
            <motion.div
              className='col-span-3 text-center py-16'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className='max-w-md mx-auto'>
                <div className='w-24 h-24 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <Briefcase className='w-10 h-10 text-orange-600 dark:text-orange-400' />
                </div>
                <h3 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3'>No Jobs Available</h3>
                <p className='text-gray-600 dark:text-gray-300 mb-6'>
                  Be the first to discover amazing opportunities! Login to explore available positions.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300'
                >
                  <a href='/login'>Sign In to Explore</a>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            allJobs.slice(0, 6).map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                whileHover={{ 
                  y: -8,
                  transition: { type: 'spring', stiffness: 300 }
                }}
                className='group'
              >
                <div className='relative'>
                  {/* Card Glow Effect */}
                  <div className='absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300' />
                  <LatestJobCards job={job} />
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* CTA Section */}
        {allJobs.length > 6 && (
          <motion.div
            className='text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div
              className='inline-flex flex-col items-center'
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className='text-gray-600 dark:text-gray-300 mb-4 text-lg'>
                Discover {allJobs.length - 6}+ more opportunities waiting for you
              </div>
              <a
                href='/browse'
                className='group relative bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 px-12 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden'
              >
                {/* Animated background */}
                <div className='absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                
                {/* Button content */}
                <span className='relative flex items-center gap-3 text-lg font-semibold'>
                  Explore All Jobs
                  <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
                </span>
                
                {/* Shine effect */}
                <div className='absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000'>
                  <div className='w-8 h-full bg-white/20' />
                </div>
              </a>
            </motion.div>
          </motion.div>
        )}

        {/* Bottom Pattern */}
        <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/50 dark:from-gray-900/50 to-transparent' />
      </div>
    </div>
  );
};

export default LatestJobs;