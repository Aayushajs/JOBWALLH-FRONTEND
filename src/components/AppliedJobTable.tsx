import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { motion, AnimatePresence } from 'framer-motion';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector((store: RootState) => store.job);

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full">
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-4">You haven't applied to any job yet.</TableCell>
                            </TableRow>
                        ) : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={appliedJob.status}
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.8, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Badge 
                                                variant="secondary" 
                                                className={`${
                                                    appliedJob?.status === "rejected" 
                                                        ? 'bg-red-400 text-white' 
                                                        : appliedJob.status === 'pending' 
                                                        ? 'bg-gray-400 text-white' 
                                                        : 'bg-green-400 text-white'
                                                } transition-all duration-300`}
                                            >
                                                {appliedJob.status.toUpperCase()}
                                            </Badge>
                                        </motion.div>
                                    </AnimatePresence>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default AppliedJobTable;
