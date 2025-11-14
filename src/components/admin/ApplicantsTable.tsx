import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, Search, Filter, Download, Eye, Mail, Phone, MapPin, Briefcase, DollarSign, Building2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { RootState } from '@/redux/store';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import useRealtimeRecruiterUpdates from '@/hooks/useRealtimeRecruiterUpdates';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    // 🔥 Enable real-time updates for recruiter
    useRealtimeRecruiterUpdates();
    
    const { applicants } = useSelector((store: RootState) => store.application);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [dateFilter, setDateFilter] = useState('All');
    const [filteredApplications, setFilteredApplications] = useState<any[]>([]);

    // Filter applications based on search and filters
    useEffect(() => {
        if (applicants?.applications) {
            let filtered = applicants.applications.filter(app => {
                const matchesSearch = 
                    app.applicant?.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    app.applicant?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    app.applicant?.phoneNumber?.toString().includes(searchTerm);

                const matchesStatus = statusFilter === 'All' || app.status?.toLowerCase() === statusFilter.toLowerCase();
                
                // Simple date filtering (you can enhance this based on your needs)
                const matchesDate = dateFilter === 'All' || true; // Add your date logic here

                return matchesSearch && matchesStatus && matchesDate;
            });
            setFilteredApplications(filtered);
        }
    }, [applicants, searchTerm, statusFilter, dateFilter]);

    const statusHandler = async (status: string, id: string) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
                // You might want to refresh the data here
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error updating status');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'accepted':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const exportToCSV = () => {
        // Simple CSV export implementation
        const headers = ['Name', 'Email', 'Phone', 'Status', 'Applied Date', 'Resume'];
        const data = filteredApplications.map((app: any) => [
            app.applicant?.fullname,
            app.applicant?.email,
            app.applicant?.phoneNumber,
            app.status,
            new Date(app.createdAt).toLocaleDateString(),
            app.applicant?.profile?.resumeOriginalName || 'N/A'
        ]);

        const csvContent = [
            headers.join(','),
            ...data.map(row => row.map(field => `"${field}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `applicants-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
        
        toast.success('Data exported successfully');
    };

    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mt-4 sm:mt-0 flex space-x-3">
                        <button 
                            onClick={exportToCSV}
                            className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 font-medium"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Export CSV
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters and Search Section */}
            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search applicants by name, email, or phone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                            />
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                        >
                            <option value="All">All Status</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Pending">Pending</option>
                        </select>

                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                        >
                            <option value="All">All Dates</option>
                            <option value="Today">Today</option>
                            <option value="Week">This Week</option>
                            <option value="Month">This Month</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                                <TableHead className="font-semibold text-gray-700 dark:text-gray-300 py-4 border-r border-gray-200 dark:border-gray-700">Profile</TableHead>
                                <TableHead className="font-semibold text-gray-700 dark:text-gray-300 py-4 border-r border-gray-200 dark:border-gray-700">Contact</TableHead>
                                <TableHead className="font-semibold text-gray-700 dark:text-gray-300 py-4 border-r border-gray-200 dark:border-gray-700">Skills</TableHead>
                                <TableHead className="font-semibold text-gray-700 dark:text-gray-300 py-4 border-r border-gray-200 dark:border-gray-700">Job Details</TableHead>
                                <TableHead className="font-semibold text-gray-700 dark:text-gray-300 py-4 border-r border-gray-200 dark:border-gray-700">Status</TableHead>
                                <TableHead className="font-semibold text-gray-700 dark:text-gray-300 py-4 border-r border-gray-200 dark:border-gray-700">Applied Date</TableHead>
                                <TableHead className="font-semibold text-gray-700 dark:text-gray-300 py-4 border-r border-gray-200 dark:border-gray-700">Resume</TableHead>
                                <TableHead className="font-semibold text-gray-700 dark:text-gray-300 py-4 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredApplications.length > 0 ? (
                                filteredApplications.map((item) => (
                                    <TableRow key={item._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                                        <TableCell className="py-4 border-r border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-12 w-12 border-2 border-blue-200 dark:border-blue-800">
                                                    <AvatarImage
                                                        src={item.applicant?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                                                        alt={item.applicant?.fullname || "User"}
                                                        className="object-cover"
                                                    />
                                                </Avatar>
                                                <div>
                                                    <div className="font-semibold text-gray-900 dark:text-white">
                                                        {item.applicant?.fullname || 'N/A'}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        
                                        <TableCell className="py-4 border-r border-gray-200 dark:border-gray-700">
                                            <div className="space-y-1.5">
                                                <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                                                    <Mail className="w-3.5 h-3.5 mr-1.5 text-blue-500 dark:text-blue-400" />
                                                    <span className="truncate max-w-[180px]">{item.applicant?.email || 'N/A'}</span>
                                                </div>
                                                <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                                                    <Phone className="w-3.5 h-3.5 mr-1.5 text-green-500 dark:text-green-400" />
                                                    {item.applicant?.phoneNumber || 'N/A'}
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="py-4 border-r border-gray-200 dark:border-gray-700">
                                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                                                {item.applicant?.profile?.skills?.length > 0 ? (
                                                    item.applicant.profile.skills.slice(0, 3).map((skill, idx) => (
                                                        <Badge key={idx} className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs border-0">
                                                            {skill}
                                                        </Badge>
                                                    ))
                                                ) : (
                                                    <span className="text-xs text-gray-400 dark:text-gray-500">No skills</span>
                                                )}
                                                {item.applicant?.profile?.skills?.length > 3 && (
                                                    <Badge className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs border-0">
                                                        +{item.applicant.profile.skills.length - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>

                                        <TableCell className="py-4 border-r border-gray-200 dark:border-gray-700">
                                            <div className="space-y-1.5 text-xs">
                                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                                    <Building2 className="w-3.5 h-3.5 mr-1.5 text-purple-500 dark:text-purple-400" />
                                                    <span className="font-medium">{applicants?.company?.name || 'N/A'}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                                    <MapPin className="w-3.5 h-3.5 mr-1.5 text-red-500 dark:text-red-400" />
                                                    {applicants?.location || 'N/A'}
                                                </div>
                                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                                    <Briefcase className="w-3.5 h-3.5 mr-1.5 text-indigo-500 dark:text-indigo-400" />
                                                    {applicants?.jobType || 'N/A'}
                                                </div>
                                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                                    <DollarSign className="w-3.5 h-3.5 mr-1.5 text-green-500 dark:text-green-400" />
                                                    ₹{applicants?.salary || 'N/A'}
                                                </div>
                                            </div>
                                        </TableCell>
                                        
                                        <TableCell className="py-4 border-r border-gray-200 dark:border-gray-700">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={item.status}
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0.8, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                                                        {item.status || 'Pending'}
                                                    </span>
                                                </motion.div>
                                            </AnimatePresence>
                                        </TableCell>

                                        <TableCell className="py-4 border-r border-gray-200 dark:border-gray-700">
                                            <div className="text-xs text-gray-900 dark:text-white font-medium">
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                {new Date(item.createdAt).toLocaleTimeString()}
                                            </div>
                                        </TableCell>
                                        
                                        <TableCell className="py-4 border-r border-gray-200 dark:border-gray-700">
                                            {item.applicant?.profile?.resume ? (
                                                <a 
                                                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer font-medium text-xs"
                                                    href={item.applicant.profile.resume} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    View
                                                </a>
                                            ) : (
                                                <span className="text-xs text-gray-400 dark:text-gray-500">No resume</span>
                                            )}
                                        </TableCell>
                                        
                                        <TableCell className="py-4 text-right">
                                            <Popover>
                                                <PopoverTrigger>
                                                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                                        <MoreHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-48 p-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                                    <div className="space-y-1">
                                                        {shortlistingStatus.map((status, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() => statusHandler(status, item._id)}
                                                                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                                                            >
                                                                Mark as {status}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} className="py-8 text-center text-gray-500 dark:text-gray-400">
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                                <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                                            </div>
                                            <p className="text-lg font-medium text-gray-600 dark:text-gray-300">No applicants found</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                {searchTerm || statusFilter !== 'All' ? 'Try adjusting your search or filters' : 'No applications submitted yet'}
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default ApplicantsTable;