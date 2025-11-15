import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen, MapPin, Calendar, Award, Download, Star, Briefcase, TrendingUp, CheckCircle, Clock, Eye, Sparkles, Target, LogOut, Building2, Users, FileText, BarChart3, Globe, Phone, LinkedinIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector, useDispatch } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import useRealtimeApplicationStatus from '@/hooks/useRealtimeApplicationStatus';
import { motion } from 'framer-motion';
import AddSection from './AddSection';
import Footer from './shared/Footer';
import { RootState } from '@/redux/store';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    // 🔥 Enable real-time application status updates
    useRealtimeApplicationStatus();
    
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store: RootState) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRecruiter = user?.role === 'recruiter';

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6
            }
        }
    };

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true
            });
            if (res.data.success) {
                // Clear user from Redux store
                dispatch(setUser(null));
                
                // Clear all cookies
                document.cookie.split(";").forEach((c) => {
                    document.cookie = c
                        .replace(/^ +/, "")
                        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
                
                // Navigate to home
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'Logout failed');
        }
    };

    // Recruiter Profile Component
    if (isRecruiter) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Navbar />
                
                <div className="relative py-8">
                    <motion.div
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Corporate Header Banner */}
                        <motion.div
                            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6 mt-12"
                            variants={itemVariants}
                        >
                            {/* Cover Image */}
                            <div className="h-48 bg-gradient-to-r from-slate-100 via-slate-100 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative">
                                <div className="absolute inset-0 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSESFV2gSiwAzlUVHNm_oDQs4ebvYP5oU1ZJA&s')] opacity-10"></div>
                            </div>
                            
                            {/* Profile Info Section */}
                            <div className="px-8 pb-6">
                                <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-20 relative">
                                    <div className="flex flex-col md:flex-row md:items-end gap-6">
                                        {/* Avatar */}
                                        <motion.div
                                            className="relative"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800 shadow-xl bg-white">
                                                <AvatarImage
                                                    src={user?.profile?.profilePhoto || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
                                                    alt="profile"
                                                    className="object-cover"
                                                />
                                            </Avatar>
                                            <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-3 border-white dark:border-gray-800 rounded-full"></div>
                                        </motion.div>
                                        
                                        {/* Name & Title */}
                                        <div className="mb-4">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user?.fullname}</h1>
                                                {user?.premiumPlans?.some(p => new Date(p.expiryDate) > new Date()) && (
                                                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-3 py-1">
                                                        <Sparkles className="w-3 h-3 mr-1" />
                                                        Premium
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 mb-2">Recruiter • Talent Acquisition</p>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-0">
                                                    <Building2 className="w-3 h-3 mr-1" />
                                                    {user?.profile?.company || 'Independent'}
                                                </Badge>
                                                <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-0">
                                                    <MapPin className="w-3 h-3 mr-1" />
                                                    {user?.phoneNumber || 'Location'}
                                                </Badge>
                                                {/* Show all active premium plans */}
                                                {user?.premiumPlans?.filter(p => new Date(p.expiryDate) > new Date()).map((plan, idx) => (
                                                    <Badge key={idx} className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {plan.planName} until {new Date(plan.expiryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex gap-3 mt-4 md:mt-0">
                                        <Button 
                                            onClick={() => setOpen(true)} 
                                            className="bg-slate-700 hover:bg-slate-800 text-white"
                                        >
                                            <Pen className="w-4 h-4 mr-2" />
                                            Edit Profile
                                        </Button>
                                        <Button 
                                            onClick={logoutHandler} 
                                            variant="outline"
                                            className="border-gray-300 dark:border-gray-600"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Sidebar */}
                            <div className="lg:col-span-1 space-y-6">
                                {/* About Card */}
                                <motion.div
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                                    variants={itemVariants}
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {user?.profile?.bio || 'Professional recruiter helping connect talent with opportunities.'}
                                    </p>
                                </motion.div>

                                {/* Contact Information */}
                                <motion.div
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                                    variants={itemVariants}
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm">
                                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                                <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                                                <p className="text-gray-900 dark:text-white font-medium">{user?.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                                <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                                                <p className="text-gray-900 dark:text-white font-medium">{user?.phoneNumber || 'Not provided'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Skills Card */}
                                <motion.div
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                                    variants={itemVariants}
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Specializations</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {user?.profile?.skills?.length > 0 ? (
                                            user.profile.skills.map((item, index) => (
                                                <Badge 
                                                    key={index}
                                                    className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-0 font-normal"
                                                >
                                                    {item}
                                                </Badge>
                                            ))
                                        ) : (
                                            <span className="text-gray-500 dark:text-gray-400 text-sm">No specializations added</span>
                                        )}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Stats Overview */}
                                <motion.div
                                    className="grid grid-cols-3 gap-4"
                                    variants={itemVariants}
                                >
                                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                                            <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">24</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">Jobs Posted</div>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                                            <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">156</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">Candidates</div>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                                            <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">18</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">Hired</div>
                                    </div>
                                </motion.div>

                                {/* Activity Section */}
                                <motion.div
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                                    variants={itemVariants}
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
                                        <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400">
                                            View All
                                        </Button>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-center text-gray-500 dark:text-gray-400 py-8">Recruiter dashboard coming soon</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <UpdateProfileDialog open={open} setOpen={setOpen} />
                <Footer />
            </div>
        );
    }

    // Student Profile Component
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900"> 
            <Navbar />
            
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-40" />
            <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-40" />
            
            <div className="relative z-10 py-8">
                <motion.div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Modern Header Banner */}
                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6 sm:mb-8 mt-12"
                        variants={itemVariants}
                    >
                        {/* Cover with Gradient */}
                        <div className="h-32 sm:h-40 bg-gradient-to-r from-yellow-600 via-yellow-650 to-yellow-500 relative">
                            <div className="absolute inset-0 bg-[url('https://timelinecovers.pro/facebook-cover/download/black-cat-face-facebook-cover.jpg')] opacity-20"></div>
                        </div>
                        
                        {/* Profile Header Content */}
                        <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
                            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-12 sm:-mt-16">
                                <div className="flex flex-col sm:flex-row md:items-end gap-4 sm:gap-6 mb-4 md:mb-0">
                                    {/* Avatar */}
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="relative"
                                    >
                                        <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white dark:border-gray-800 shadow-xl ring-4 ring-blue-100 dark:ring-blue-900/30">
                                            <AvatarImage
                                                src={user?.profile?.profilePhoto || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
                                                alt="profile"
                                                className="object-cover"
                                            />
                                        </Avatar>
                                        <div className="absolute bottom-2 right-2 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 border-3 border-white dark:border-gray-800 rounded-full"></div>
                                    </motion.div>
                                    
                                    {/* User Info */}
                                    <div className="mb-3">
                                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{user?.fullname}</h1>
                                            {user?.premiumPlans?.some(p => new Date(p.expiryDate) > new Date()) && (
                                                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-3 py-1">
                                                    <Sparkles className="w-3 h-3 mr-1" />
                                                    Premium
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 mb-3">{user?.profile?.bio || 'Job Seeker • Open to Opportunities'}</p>
                                        <div className="flex items-center gap-3 text-sm">
                                            
                                            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                                <Mail className="w-4 h-4" />
                                                <span>{user?.email}</span>
                                            </div>
                                            {user?.phoneNumber && (
                                                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                                    <Phone className="w-4 h-4" />
                                                    <span>{user.phoneNumber}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Actions */}
                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                    <Button 
                                        onClick={() => setOpen(true)}
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md text-sm"
                                    >
                                        <Pen className="w-4 h-4 mr-2" />
                                        <span className="hidden sm:inline">Edit Profile</span>
                                        <span className="sm:hidden">Edit</span>
                                    </Button>
                                    <Button 
                                        onClick={logoutHandler}
                                        variant="outline"
                                        className="border-gray-300 dark:border-gray-600 text-sm"
                                    >
                                        <LogOut className="w-4 h-4 sm:mr-2" />
                                        <span className="hidden sm:inline">Logout</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                     
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                        {/* Left Sidebar */}
                        <motion.div
                            className="lg:col-span-1 space-y-4 sm:space-y-6"
                            variants={itemVariants}
                        >
                            {/* Profile Strength Card */}
                            <motion.div
                                className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-2xl p-6 text-white shadow-lg"
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                        <Target className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-semibold">Profile Strength</h3>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-blue-100">Completion</span>
                                            <span className="font-bold text-xl">85%</span>
                                        </div>
                                        <div className="w-full bg-white/20 rounded-full h-2">
                                            <motion.div 
                                                className="bg-white h-2 rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: '85%' }}
                                                transition={{ duration: 1, delay: 0.3 }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-blue-100 pt-2 border-t border-white/20">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Profile Verified</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Skills Card */}
                            <motion.div
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
                                variants={itemVariants}
                            >
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {user?.profile?.skills?.length > 0 ? (
                                        user.profile.skills.map((item, index) => (
                                            <Badge 
                                                key={index}
                                                className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-0 font-normal"
                                            >
                                                {item}
                                            </Badge>
                                        ))
                                    ) : (
                                        <span className="text-gray-500 dark:text-gray-400 text-sm">No skills added</span>
                                    )}
                                </div>
                            </motion.div>

                            {/* Resume Card */}
                            <motion.div
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
                                variants={itemVariants}
                            >
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resume</h3>
                                {isResume && user?.profile?.resume ? (
                                    <motion.a
                                        target='_blank'
                                        href={user.profile.resume}
                                        className="flex items-center gap-3 bg-gradient-to-r from-yellow-600 to-yellow-800 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <Download className="w-5 h-5" />
                                        <span className="font-medium text-sm">{user.profile.resumeOriginalName || 'Download Resume'}</span>
                                    </motion.a>
                                ) : (
                                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-center">
                                        <span className="text-gray-500 dark:text-gray-400 text-sm">No resume uploaded</span>
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>

                        {/* Main Content Area */}
                        <motion.div
                            className="lg:col-span-2 space-y-6"
                            variants={itemVariants}
                        >
                            {/* Stats Overview */}
                            <motion.div
                                className="grid grid-cols-3 gap-2 sm:gap-4"
                                variants={itemVariants}
                            >
                                <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-6 text-center">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                                        <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">12</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">Applied</div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
                                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">3</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">Interviews</div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
                                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        <Eye className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">28</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">Views</div>
                                </div>
                            </motion.div>

                            {/* Applied Jobs Table */}
                            <motion.div
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                                variants={itemVariants}
                            >
                                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Application History</h2>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Track your job applications</p>
                                        </div>
                                        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-0">
                                            {/* 12 Active */}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <AppliedJobTable />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
            <Footer />
        </div>
    );
}

export default Profile;