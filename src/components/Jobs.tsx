import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Footer from './shared/Footer';
import { RootState } from '@/redux/store';
import { Briefcase, Search, Sparkles, TrendingUp, MapPin } from 'lucide-react';
import useRealtimeJobs from '@/hooks/useRealtimeJobs';

const Jobs = () => {
    // 🔥 Enable real-time job updates
    useRealtimeJobs();
    
    const { allJobs, searchedQuery } = useSelector((store: RootState) => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase());
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-yellow-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <Navbar />

                {/* Background Decorations */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 dark:bg-orange-900/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 animate-pulse" />
                <div className="absolute top-60 right-10 w-96 h-96 bg-yellow-200 dark:bg-yellow-900/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 animate-pulse delay-1000" />

                {/* Hero Banner Section */}
                <div className='relative z-10 max-w-7xl mx-auto pt-24 pb-12 px-4'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className='text-center mb-12'
                    >
                        {/* Badge */}
                        <motion.div
                            className='inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-orange-200 dark:border-orange-700 rounded-full px-6 py-3 mb-6 shadow-lg'
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Sparkles className='w-5 h-5 text-orange-600 dark:text-orange-400' />
                            <span className='text-orange-700 dark:text-orange-300 font-semibold text-sm'>
                                {searchedQuery ? `Search Results for "${searchedQuery}"` : 'Discover Your Dream Job'}
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <h1 className='text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent'>
                            Find Your Perfect Role
                        </h1>
                        <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
                            Explore {filterJobs.length} opportunities from top companies worldwide
                        </p>
                    </motion.div>

                    {/* Stats Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto'
                    >
                        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-4 border border-orange-200/50 dark:border-orange-700/50 text-center'>
                            <Briefcase className='w-6 h-6 text-orange-500 mx-auto mb-2' />
                            <div className='text-2xl font-bold text-gray-900 dark:text-gray-100'>{filterJobs.length}</div>
                            <div className='text-xs text-gray-600 dark:text-gray-400'>Available Jobs</div>
                        </div>
                        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-4 border border-yellow-200/50 dark:border-yellow-700/50 text-center'>
                            <TrendingUp className='w-6 h-6 text-yellow-500 mx-auto mb-2' />
                            <div className='text-2xl font-bold text-gray-900 dark:text-gray-100'>100+</div>
                            <div className='text-xs text-gray-600 dark:text-gray-400'>Companies</div>
                        </div>
                        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-4 border border-orange-200/50 dark:border-orange-700/50 text-center'>
                            <MapPin className='w-6 h-6 text-orange-500 mx-auto mb-2' />
                            <div className='text-2xl font-bold text-gray-900 dark:text-gray-100'>50+</div>
                            <div className='text-xs text-gray-600 dark:text-gray-400'>Locations</div>
                        </div>
                        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-4 border border-yellow-200/50 dark:border-yellow-700/50 text-center'>
                            <Search className='w-6 h-6 text-yellow-500 mx-auto mb-2' />
                            <div className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Live</div>
                            <div className='text-xs text-gray-600 dark:text-gray-400'>Updates</div>
                        </div>
                    </motion.div>
                </div>

                <div className='relative z-10 max-w-7xl mx-auto px-4 pb-16'>
                    <div className='flex flex-col lg:flex-row gap-8'>
                        
                        {/* Filter Card */}
                        <motion.div 
                            className='w-full lg:w-80'
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className='sticky top-24'>
                                <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200/50 dark:border-orange-700/50 overflow-hidden'>
                                    {/* Filter Header */}
                                    <div className='bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 p-6 text-white'>
                                        <div className='flex items-center gap-3 mb-2'>
                                            <div className='w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm'>
                                                <Search className='w-5 h-5' />
                                            </div>
                                            <h2 className='text-2xl font-bold'>Filters</h2>
                                        </div>
                                        <p className='text-orange-100 text-sm'>Refine your search</p>
                                    </div>
                                    <div className='p-6'>
                                        <FilterCard />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Job Listings */}
                        <motion.div 
                            className='flex-1'
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {filterJobs.length <= 0 ? (
                                <motion.div 
                                    className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200/50 dark:border-orange-700/50 p-16 text-center'
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <div className='w-24 h-24 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6'>
                                        <Briefcase className='w-12 h-12 text-orange-600 dark:text-orange-400' />
                                    </div>
                                    <h3 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3'>No Jobs Found</h3>
                                    <p className='text-gray-600 dark:text-gray-400 mb-6'>
                                        Try adjusting your filters or search query to find more opportunities
                                    </p>
                                </motion.div>
                            ) : (
                                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                                    {filterJobs.map((job, index) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.05 }}
                                            key={job?._id}
                                            className='group relative'
                                            onMouseMove={handleMouseMove}
                                        >
                                            {/* Glow Effect */}
                                            <div 
                                                className='absolute -inset-[1px] bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500'
                                                style={{
                                                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(251, 146, 60, 0.4), rgba(234, 179, 8, 0.4), transparent 50%)`
                                                }}
                                            />
                                            
                                            {/* Card */}
                                            <div className='relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-orange-200/50 dark:border-orange-700/50 overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2'>
                                                <Job job={job} />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Jobs;
