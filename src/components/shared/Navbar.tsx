import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, Moon, Sun, Home, Briefcase, Search, DollarSign } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useTheme } from '@/contexts/ThemeContext';
import { RootState } from '@/redux/store';

const Navbar = () => {
    const { user } = useSelector((store: RootState) => store.auth);
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* ===== Desktop Navbar ===== */}
            <nav
                className={`hidden lg:block fixed top-2 left-3 w-[98%] z-50 transition-all duration-300
                ${isScrolled
                    ? 'backdrop-blur-lg bg-white/40 dark:bg-gray-900/30 shadow-md border-t border-b border-red-500/50'
                    : 'bg-transparent'}
                rounded-full`}
            >
                <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 lg:px-8">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 font-sans">
                            MANTYA<span className="font-bold text-black dark:text-gray-200">SEARCH</span>
                        </h1>
                    </div>

                    {/* Desktop Menu */}
                    <div className="lg:flex items-center gap-6 font-bold hidden">
                        {/* Transparent Blur Buttons - Role Based */}
                        <div className="flex items-center gap-4">
                            {user && user.role === 'recruiter' ? (
                                <>
                                    <Link
                                        to="/admin/companies"
                                        className="px-5 py-2 rounded-full text-sm font-semibold text-gray-900 dark:text-gray-100 
                                        backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/40 
                                        shadow-sm hover:bg-white/50 dark:hover:bg-gray-700/60 hover:scale-105 
                                        transition-all duration-300"
                                    >
                                        Companies
                                    </Link>
                                    <Link
                                        to="/admin/jobs"
                                        className="px-5 py-2 rounded-full text-sm font-semibold text-gray-900 dark:text-gray-100 
                                        backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/40 
                                        shadow-sm hover:bg-white/50 dark:hover:bg-gray-700/60 hover:scale-105 
                                        transition-all duration-300"
                                    >
                                        Jobs
                                    </Link>
                                    <Link
                                        to="/pricing"
                                        className="px-5 py-2 rounded-full text-sm font-semibold text-gray-900 dark:text-gray-100 
                                        backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/40 
                                        shadow-sm hover:bg-white/50 dark:hover:bg-gray-700/60 hover:scale-105 
                                        transition-all duration-300"
                                    >
                                        Pricing
                                    </Link>
                                    {/* <Link
                                        to="/admin/courses"
                                        className="px-5 py-2 rounded-full text-sm font-semibold text-gray-900 dark:text-gray-100 
                                        backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/40 
                                        shadow-sm hover:bg-white/50 dark:hover:bg-gray-700/60 hover:scale-105 
                                        transition-all duration-300"
                                    >
                                        Add Course
                                    </Link> */}
                                    {/* <Link
                                        to="/admin/jobs/banner"
                                        className="px-5 py-2 rounded-full text-sm font-semibold text-gray-900 dark:text-gray-100 
                                        backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/40 
                                        shadow-sm hover:bg-white/50 dark:hover:bg-gray-700/60 hover:scale-105 
                                        transition-all duration-300"
                                    >
                                        Add Section
                                    </Link> */}
                                    {/* <Link
                                        to="/about"
                                        className="px-5 py-2 rounded-full text-sm font-semibold text-gray-900 dark:text-gray-100 
                                        backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/40 
                                        shadow-sm hover:bg-white/50 dark:hover:bg-gray-700/60 hover:scale-105 
                                        transition-all duration-300"
                                    >
                                        About
                                    </Link> */}
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/"
                                        className="px-5 py-2 rounded-full text-sm font-semibold text-gray-900 dark:text-gray-100 
                                        backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/40 
                                        shadow-sm hover:bg-white/50 dark:hover:bg-gray-700/60 hover:scale-105 
                                        transition-all duration-300"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to="/jobs"
                                        className="px-5 py-2 rounded-full text-sm font-semibold text-gray-900 dark:text-gray-100 
                                        backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/40 
                                        shadow-sm hover:bg-white/50 dark:hover:bg-gray-700/60 hover:scale-105 
                                        transition-all duration-300"
                                    >
                                        Jobs
                                    </Link>
                                    <Link
                                        to="/browse"
                                        className="px-5 py-2 rounded-full text-sm font-semibold text-gray-900 dark:text-gray-100 
                                        backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/40 
                                        shadow-sm hover:bg-white/50 dark:hover:bg-gray-700/60 hover:scale-105 
                                        transition-all duration-300"
                                    >
                                        Browse
                                    </Link>
                                    {/* <Link
                                        to="/pricing"
                                        className="px-5 py-2 rounded-full text-sm font-semibold text-gray-900 dark:text-gray-100 
                                        backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/40 
                                        shadow-sm hover:bg-white/50 dark:hover:bg-gray-700/60 hover:scale-105 
                                        transition-all duration-300"
                                    >
                                        Pricing
                                    </Link>
                                    <Link
                                        to="/about"
                                        className="px-5 py-2 rounded-full text-sm font-semibold text-gray-900 dark:text-gray-100 
                                        backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/40 
                                        shadow-sm hover:bg-white/50 dark:hover:bg-gray-700/60 hover:scale-105 
                                        transition-all duration-300"
                                    >
                                        About
                                    </Link> */}
                                </>
                            )}
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                            style={{
                                background: theme === 'dark' 
                                    ? 'linear-gradient(to right, #1e293b, #334155)' 
                                    : 'linear-gradient(to right, #3b82f6, #fff)'
                            }}
                        >
                            <span
                                className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center"
                                style={{
                                    transform: theme === 'dark' ? 'translateX(28px)' : 'translateX(0)'
                                }}
                            >
                                {theme === 'dark' ? (
                                    <Moon className="h-3.5 w-3.5 text-white" />
                                ) : (
                                    <Sun className="h-3.5 w-3.5 text-yellow-600" />
                                )}
                            </span>
                        </button>

                        {/* User or Auth Buttons */}
                        {user ? (
                            // CHANGED: Direct profile navigation without popover
                            <button 
                                onClick={() => navigate('/profile')}
                                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/30 dark:hover:bg-gray-700/60 transition-colors"
                            >
                                <Avatar className="h-8 w-8 cursor-pointer">
                                    <AvatarImage
                                        src={user?.profile?.profilePhoto}
                                        alt={user?.fullname || 'User'}
                                    />
                                </Avatar>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {user.fullname}
                                </span>
                            </button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login">
                                    <Button 
                                        variant="outline" 
                                        className="px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/40 hover:bg-white/50 dark:hover:bg-gray-700/60 hover:scale-105 transition-all duration-300"
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button 
                                        className="px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white hover:scale-105 transition-all duration-300 shadow-lg"
                                    >
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* ===== Mobile Top Navbar (Logo + Profile) ===== */}
            <nav className="lg:hidden fixed top-2 left-3 w-[96%] z-50 flex justify-between items-center px-5 py-3 rounded-full backdrop-blur-md bg-white/30 dark:bg-gray-900/80 shadow-md border border-white/50">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-1">
                    <h1 className="text-2xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 font-sans">
                        MANTYA<span className="font-light text-gray-900 dark:text-gray-200">SEARCH</span>
                    </h1>
                </Link>

                {/* Profile Avatar or Auth Buttons */}
                {user ? (
                    <Avatar className="h-10 w-10 cursor-pointer" onClick={() => navigate('/profile')}>
                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || 'User'} />
                    </Avatar>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link to="/login">
                            <Button 
                                variant="outline" 
                                className="px-3 py-1 text-xs rounded-full backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/40"
                            >
                                Login
                            </Button>
                        </Link>
                        {/* <Link to="/signup">
                            <Button 
                                className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white"
                            >
                                Signup
                            </Button>
                        </Link> */}
                    </div>
                )}
            </nav>

            {/* ===== Mobile Bottom Taskbar ===== */}
            <div className="lg:hidden fixed bottom-2 left-1/2 transform -translate-x-1/2 w-[95%] max-w-3xl bg-white/60 dark:bg-gray-900/80 backdrop-blur-md rounded-full shadow-lg flex justify-around items-center py-3 px-2 z-50">
                {user && user.role === 'recruiter' ? (
                    <>
                        <Link to="/admin/companies" className="flex flex-col items-center text-gray-700 dark:text-gray-200 hover:text-red-500 transition-colors">
                            <Briefcase className="h-5 w-5" />
                            <span className="text-xs mt-1">Companies</span>
                        </Link>
                        <Link to="/admin/jobs" className="flex flex-col items-center text-gray-700 dark:text-gray-200 hover:text-red-500 transition-colors">
                            <Briefcase className="h-5 w-5" />
                            <span className="text-xs mt-1">Jobs</span>
                        </Link>
                        <Link to="/pricing" className="flex flex-col items-center text-gray-700 dark:text-gray-200 hover:text-red-500 transition-colors">
                            <DollarSign className="h-5 w-5" />
                            <span className="text-xs mt-1">Pricing</span>
                        </Link>
                        {/* <Link to="/about" className="flex flex-col items-center text-gray-700 dark:text-gray-200 hover:text-red-500 transition-colors">
                            <Home className="h-5 w-5" />
                            <span className="text-xs mt-1">About</span>
                        </Link> */}
                    </>
                ) : (
                    <>
                        <Link to="/" className="flex flex-col items-center text-gray-700 dark:text-gray-200 hover:text-red-500 transition-colors">
                            <Home className="h-5 w-5" />
                            <span className="text-xs mt-1">Home</span>
                        </Link>
                        <Link to="/jobs" className="flex flex-col items-center text-gray-700 dark:text-gray-200 hover:text-red-500 transition-colors">
                            <Briefcase className="h-5 w-5" />
                            <span className="text-xs mt-1">Jobs</span>
                        </Link>
                        <Link to="/browse" className="flex flex-col items-center text-gray-700 dark:text-gray-200 hover:text-red-500 transition-colors">
                            <Search className="h-5 w-5" />
                            <span className="text-xs mt-1">Browse</span>
                        </Link>
                        {/* <Link to="/pricing" className="flex flex-col items-center text-gray-700 dark:text-gray-200 hover:text-red-500 transition-colors">
                            <DollarSign className="h-5 w-5" />
                            <span className="text-xs mt-1">Pricing</span>
                        </Link> */}
                    </>
                )}
                <button
                    onClick={toggleTheme}
                    className="relative w-12 h-6 rounded-full transition-all duration-300"
                    style={{
                        background: theme === 'dark' 
                            ? 'linear-gradient(to right, #1e293b, #334155)' 
                            : 'linear-gradient(to right, #3b82f6, #60a5fa)'
                    }}
                >
                    <span
                        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center"
                        style={{
                            transform: theme === 'dark' ? 'translateX(24px)' : 'translateX(0)'
                        }}
                    >
                        {theme === 'dark' ? (
                            <Moon className="h-3 w-3 text-slate-700" />
                        ) : (
                            <Sun className="h-3 w-3 text-yellow-600" />
                        )}
                    </span>
                </button>
            </div>
        </>
    );
};

export default Navbar;