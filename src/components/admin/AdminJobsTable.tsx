import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Trash2, Crown } from "lucide-react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { JOB_API_END_POINT } from "@/utils/constant";

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(
        (store: RootState) => store.job
    );
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filtered = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;

            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });

        setFilterJobs(filtered);
    }, [allAdminJobs, searchJobByText]);

    const handleDeleteJob = async (jobId: string) => {
        if (window.confirm("Are you sure you want to delete this job?")) {
            try {
                const res = await axios.delete(
                    `${JOB_API_END_POINT}/${jobId}`
                );

                if (res) {
                    alert("Job deleted successfully");
                }
            } catch (error) {
                alert("Error deleting job");
            }
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">

            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Job Listings</h2>

            <Table className="rounded-xl overflow-hidden border border-gray-300">
                <TableCaption className="text-gray-500 font-medium py-4">
                    A list of your recently posted jobs
                </TableCaption>

                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead className="font-semibold border-r text-gray-700">Company</TableHead>
                        <TableHead className="font-semibold border-r text-gray-700">Role</TableHead>
                        <TableHead className="font-semibold border-r text-gray-700">Type</TableHead>
                        <TableHead className="font-semibold border-r text-gray-700">Salary</TableHead>
                        <TableHead className="font-semibold border-r text-gray-700">Location</TableHead>
                        <TableHead className="font-semibold border-r text-gray-700">Job Type</TableHead>
                        <TableHead className="font-semibold border-r text-gray-700">Position</TableHead>
                        <TableHead className="font-semibold border-r text-gray-700">Date</TableHead>
                        <TableHead className="font-semibold text-right text-gray-700">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filterJobs.length > 0 ? (
                        filterJobs.map((job) => (
                            <TableRow
                                key={job._id}
                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                className="dark:hover:bg-gray-600 cursor-pointer transition duration-150 border-b border-gray-200"
                            >
                                <TableCell className="flex items-center gap-3 py-4 border-r">
                                    <Avatar className="w-11 h-11 shadow-md">
                                        <AvatarImage
                                            src={job?.company?.logo || "/default-logo.png"}
                                            alt={job?.company?.name}
                                        />
                                    </Avatar>
                                    <span className="font-medium text-gray-900">{job.company.name}</span>
                                </TableCell>

                                <TableCell className="border-r text-gray-900 font-medium">
                                    {job.title}
                                </TableCell>

                                <TableCell className="border-r">
                                    {job.isPremium ? (
                                        <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2.5 py-1 rounded-full w-fit">
                                            <Crown className="w-3.5 h-3.5 fill-white" />
                                            <span className="text-xs font-bold">Premium</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full w-fit">
                                            <span className="text-xs font-semibold">Normal</span>
                                        </div>
                                    )}
                                </TableCell>

                                <TableCell className="border-r text-gray-700 font-medium">
                                    ₹{job.salary}
                                </TableCell>

                                <TableCell className="border-r text-gray-700 font-medium">
                                    {job.location}
                                </TableCell>

                                <TableCell className="border-r text-gray-700 font-medium">
                                    {job.jobType}
                                </TableCell>

                                <TableCell className="border-r text-gray-700 font-medium">
                                    {job.position}
                                </TableCell>

                                <TableCell className="border-r text-gray-700">
                                    {new Date(job.createdAt).toLocaleDateString()}
                                </TableCell>

                                {/* STOP ROW CLICK FOR ACTION BUTTON */}
                                <TableCell
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-right"
                                >
                                    <Popover>
                                        <PopoverTrigger>
                                            <button className="text-gray-700 hover:text-blue-600 transition">
                                                <MoreHorizontal />
                                            </button>
                                        </PopoverTrigger>

                                        <PopoverContent className="p-2 shadow-md rounded-lg border border-gray-200 bg-white">
                                            <button
                                                onClick={() => navigate(`/admin/companies/${job._id}`)}
                                                className="flex items-center gap-2 w-full text-blue-600 hover:bg-blue-50 rounded-md px-3 py-2 transition"
                                            >
                                                <Edit2 size={16} /> Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(`/admin/jobs/${job._id}/applicants`)
                                                }
                                                className="flex items-center gap-2 w-full text-green-600 hover:bg-green-50 rounded-md px-3 py-2 transition"
                                            >
                                                <Eye size={16} /> View
                                            </button>

                                            <button
                                                onClick={() => handleDeleteJob(job._id)}
                                                className="flex items-center gap-2 w-full text-red-600 hover:bg-red-50 rounded-md px-3 py-2 transition"
                                            >
                                                <Trash2 size={16} /> Delete
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={9}
                                className="text-center text-gray-500 py-6 font-medium"
                            >
                                No jobs found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
