import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { setSearchJobByText } from '@/redux/jobSlice';
import Footer from '../shared/Footer';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { Briefcase, Sparkles, Loader2, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { RootState } from '@/redux/store';

const AdminJobs = () => {
  return (
    <div>
      <Navbar />
      <AdminJob />
      <Footer />
    </div>
  );
};

const AdminJob = () => {
  useGetAllAdminJobs();
  useGetAllCompanies();
  const [input, setInput] = useState('');
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobInput, setJobInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companies } = useSelector((store: RootState) => store.company);
  const { user } = useSelector((store: RootState) => store.auth);

  // ⭐ Dummy Stats — Replace with your API data if needed
  const stats = [
    { title: "Total Jobs", value: 128, color1: "#3b82f6", color2: "#06b6d4" },
    { title: "Active Jobs", value: 86, color1: "#22c55e", color2: "#10b981" },
    { title: "Internships", value: 32, color1: "#a855f7", color2: "#ec4899" },
    { title: "Closed Jobs", value: 14, color1: "#f97316", color2: "#fb923c" },
  ];

  const graphData = [
    { v: 10 }, { v: 40 }, { v: 25 }, { v: 55 }, { v: 35 }, { v: 70 }
  ];

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  const changeEventHandler = (e) => {
    setJobInput({ ...jobInput, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
    setJobInput({ ...jobInput, companyId: selectedCompany._id });
  };

  const submitHandler = async (e, postType: 'normal' | 'premium') => {
    e.preventDefault();
    
    // Check if user has premium access for premium posts
    if (postType === 'premium') {
      const hasPremium = user?.premiumPlans?.some((p) => new Date(p.expiryDate) > new Date());
      if (!hasPremium) {
        toast.info("Premium membership required for premium job posts");
        navigate("/pricing");
        return;
      }
    }
    
    try {
      setLoading(true);
      const jobData = {
        ...jobInput,
        isPremium: postType === 'premium'
      };
      
      const res = await axios.post(`${JOB_API_END_POINT}/post`, jobData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setIsJobDialogOpen(false);
        setJobInput({
          title: "",
          description: "",
          requirements: "",
          salary: "",
          location: "",
          jobType: "",
          experience: "",
          position: 0,
          companyId: ""
        });
        // Refresh the jobs list
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 pt-32 pb-20 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl"
            >
              <p className="text-gray-500 dark:text-gray-400">{stat.title}</p>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</h1>

              <div className="h-16 mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={graphData}>
                    <defs>
                      <linearGradient id={`grad-${index}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={stat.color1} stopOpacity={0.8} />
                        <stop offset="100%" stopColor={stat.color2} stopOpacity={0.2} />
                      </linearGradient>
                    </defs>

                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={stat.color1}
                      fill={`url(#grad-${index})`}
                      strokeWidth={3}
                      animationDuration={800}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-xl rounded-xl p-8 mb-12 border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <h1 className="text-4xl font-semibold text-gray-800 dark:text-white mb-6">
            Manage Job Listings
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Use the form below to filter and manage job listings or create new ones.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Input
              className="w-full sm:w-1/2 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              placeholder="Filter jobs by name or role..."
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              className="w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
              onClick={() => setIsJobDialogOpen(true)}
            >
              + Add New Job
            </Button>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="">
          <AdminJobsTable />
        </div>

        {/* Add Job Dialog */}
        <Dialog open={isJobDialogOpen} onOpenChange={(open) => {
          if (!open) {
            setJobInput({
              title: "",
              description: "",
              requirements: "",
              salary: "",
              location: "",
              jobType: "",
              experience: "",
              position: 0,
              companyId: ""
            })
          }
          setIsJobDialogOpen(open)
        }}>
          <DialogContent className="sm:max-w-[650px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-teal-600 -mx-6 -mt-6 px-6 py-5 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Post New Job</h2>
                  <p className="text-sm text-blue-100">Create a new job listing</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={(e) => submitHandler(e, 'normal')} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Job Title *
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="e.g., Senior Developer"
                    value={jobInput.title}
                    onChange={changeEventHandler}
                    required
                    className="h-10 border-gray-300 dark:border-gray-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="location" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Location *
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="e.g., Remote"
                    value={jobInput.location}
                    onChange={changeEventHandler}
                    required
                    className="h-10 border-gray-300 dark:border-gray-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="salary" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Salary *
                  </Label>
                  <Input
                    id="salary"
                    name="salary"
                    type="text"
                    placeholder="e.g., ₹10-15 LPA"
                    value={jobInput.salary}
                    onChange={changeEventHandler}
                    required
                    className="h-10 border-gray-300 dark:border-gray-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="jobType" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Job Type *
                  </Label>
                  <Input
                    id="jobType"
                    name="jobType"
                    type="text"
                    placeholder="e.g., Full-time"
                    value={jobInput.jobType}
                    onChange={changeEventHandler}
                    required
                    className="h-10 border-gray-300 dark:border-gray-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="experience" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Experience *
                  </Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="text"
                    placeholder="e.g., 2-5 years"
                    value={jobInput.experience}
                    onChange={changeEventHandler}
                    required
                    className="h-10 border-gray-300 dark:border-gray-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="position" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Positions *
                  </Label>
                  <Input
                    id="position"
                    name="position"
                    type="number"
                    placeholder="e.g., 3"
                    value={jobInput.position}
                    onChange={changeEventHandler}
                    required
                    className="h-10 border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description *
                </Label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Brief job description..."
                  value={jobInput.description}
                  onChange={changeEventHandler}
                  required
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="requirements" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Requirements *
                </Label>
                <textarea
                  id="requirements"
                  name="requirements"
                  placeholder="Required skills..."
                  value={jobInput.requirements}
                  onChange={changeEventHandler}
                  required
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 resize-none"
                />
              </div>

              {companies.length > 0 && (
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Company *
                  </Label>
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="h-10 border-gray-300 dark:border-gray-600">
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {companies.length === 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p className="text-xs text-red-600 dark:text-red-400">
                    ⚠️ Please register a company first
                  </p>
                </div>
              )}

              {/* Premium Status Message */}
              {user?.premiumPlans?.some((p) => new Date(p.expiryDate) > new Date()) ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <p className="text-xs text-green-600 dark:text-green-400 font-semibold">
                      Premium access active
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-green-600 dark:text-green-400">
                    {user.premiumPlans?.filter((p) => new Date(p.expiryDate) > new Date()).map((plan, idx) => (
                      <span key={idx}>
                        ✓ {plan.planName} (expires: {new Date(plan.expiryDate).toLocaleDateString()})
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                  <p className="text-xs text-orange-600 dark:text-orange-400">
                    💡 Get Premium to post featured jobs that reach more candidates!
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                {/* Normal Job Post */}
                <Button
                  type="button"
                  onClick={(e) => submitHandler(e, 'normal')}
                  disabled={loading || companies.length === 0}
                  className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Wait...
                    </>
                  ) : (
                    <>📝 Post Normal Job</>
                  )}
                </Button>
                
                {/* Premium Job Post */}
                <Button
                  type="button"
                  onClick={(e) => submitHandler(e, 'premium')}
                  disabled={loading || companies.length === 0}
                  className="h-12 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Wait...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Post Premium Job
                    </>
                  )}
                </Button>
              </div>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsJobDialogOpen(false)}
                className="w-full h-10 mt-2"
                disabled={loading}
              >
                Cancel
              </Button>
            </form>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
};

export default AdminJobs;
