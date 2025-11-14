import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import useRealtimeJobs from '@/hooks/useRealtimeJobs';
import Footer from './shared/Footer';
import { RootState } from '@/redux/store';

const Browse: React.FC = () => {
    useGetAllJobs();
    // 🔥 Enable real-time job updates
    useRealtimeJobs();
    
    const { allJobs } = useSelector((store: RootState) => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch]);

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto py-10 md:py-20 px-4 md:px-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-10">
                    Search Results ({allJobs.length})
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {allJobs.length > 0 ? (
                        allJobs.map((job) => (
                            <div
                                key={job._id}
                                className="bg-white dark:bg-gray-800 rounded-xl  hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
                            >
                                <Job job={job} />
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-gray-600 dark:text-gray-400 text-center py-10">
                            No jobs found.
                        </p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Browse;
