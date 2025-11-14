import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector((store: any) => store.application);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        new: 0,
        reviewed: 0,
        shortlisted: 0
    });

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
                
                // Calculate stats
                const applications = res.data.job?.applications || [];
                const newApps = applications.filter(app => app.status === 'applied').length;
                const reviewedApps = applications.filter(app => app.status === 'reviewed').length;
                const shortlistedApps = applications.filter(app => app.status === 'shortlisted').length;
                
                setStats({
                    total: applications.length,
                    new: newApps,
                    reviewed: reviewedApps,
                    shortlisted: shortlistedApps
                });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
            <Navbar />
            
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Manage and review all applications for this position
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Applicants Card */}
                    <div className="bg-white  dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl hover:scale-105 transition-all duration-200">
                        <div className="flex items-center">
                            <div className="p-3 bg-gradient-to-br rounded-full from-blue-300 to-blue-400 dark:from-blue-600 dark:to-blue-700 shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Applicants</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                            </div>
                        </div>
                    </div>

                    {/* New Applications Card */}
                    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl hover:scale-105 transition-all duration-200">
                        <div className="flex items-center">
                            <div className="p-3 bg-gradient-to-br rounded-full from-green-300 to-green-400 dark:from-green-600 dark:to-green-700 shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">New Applications</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.new}</p>
                            </div>
                        </div>
                    </div>

                    {/* Reviewed Card */}
                    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl hover:scale-105 transition-all duration-200">
                        <div className="flex items-center">
                            <div className="p-3 bg-gradient-to-br rounded-full from-yellow-200 to-yellow-200 dark:from-yellow-600 dark:to-yellow-700 shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Reviewed</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.reviewed}</p>
                            </div>
                        </div>
                    </div>

                    {/* Shortlisted Card */}
                    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl hover:scale-105 transition-all duration-200">
                        <div className="flex items-center">
                            <div className="p-3 bg-gradient-to-br rounded-full from-purple-200 to-purple-300 dark:from-purple-600 dark:to-purple-700 shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Shortlisted</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.shortlisted}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Details Card */}
                <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {applicants?.title || 'Job Title'}
                            </h2>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2  text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {applicants?.location || 'Location'}
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                    {applicants?.type || 'Job Type'}
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-purple-500  dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Posted {applicants?.createdAt ? new Date(applicants.createdAt).toLocaleDateString() : 'Date'}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 lg:mt-0">
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
                                Active
                            </span>
                        </div>
                    </div>
                </div>

                {/* Applicants Table Section */}
                <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm  r border-gray-200 dark:border-gray-700 overflow-hidden">
                    
                    
                    {/* Loading State */}
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400"></div>
                        </div>
                    ) : (
                        <ApplicantsTable />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Applicants