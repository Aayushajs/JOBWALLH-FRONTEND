import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import { RootState } from "@/redux/store";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { 
  Calendar, 
  MapPin, 
  DollarSign, 
  Users, 
  Briefcase, 
  Clock, 
  Building, 
  Award, 
  CheckCircle, 
  Send,
  ArrowLeft,
  Share2,
  Bookmark,
  Sparkles,
  TrendingUp,
  Star,
  Target
} from "lucide-react";

const JobDescription = () => {
  const { singleJob, allJobs } = useSelector((store: RootState) => store.job);
  const { user } = useSelector((store: RootState) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const applyJobHandler = async () => {
    // Check if user is logged in
    if (!user) {
      toast.error("Please login to apply for this job");
      navigate('/login');
      return;
    }

    // Check if already applied
    if (isApplied) {
      toast.info("You have already applied for this job");
      return;
    }

    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        setShowConfetti(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success("🎉 Application submitted successfully!");
        
        // Stop confetti after 5 seconds
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.message || "Failed to apply";
      toast.error(errorMessage);
      
      // If error message indicates already applied, update state
      if (errorMessage.includes("already applied")) {
        setIsApplied(true);
      }
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          
          // Check if user has already applied
          if (user) {
            const hasApplied = res.data.job.applications.some(
              (application) => application.applicant === user?._id
            );
            setIsApplied(hasApplied);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const jobDetails = [
    { icon: Building, label: "Company", value: singleJob?.company?.name || "Not Available" },
    { icon: MapPin, label: "Location", value: singleJob?.location || "Not Specified" },
    { icon: DollarSign, label: "Salary", value: singleJob?.salary ? `${singleJob?.salary} LPA` : "Not Disclosed" },
    { icon: Briefcase, label: "Experience", value: singleJob?.experienceLevel ? `${singleJob?.experienceLevel} years` : "Not Required" },
    { icon: Users, label: "Applicants", value: singleJob?.applications?.length || 0 },
    { icon: Calendar, label: "Posted", value: singleJob?.createdAt?.split("T")[0] || "Recently" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-yellow-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      {/* Confetti Animation */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}
      
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200 dark:bg-orange-900/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 animate-pulse" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-yellow-200 dark:bg-yellow-900/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-orange-300 dark:bg-orange-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-60 animate-pulse delay-2000" />

      <div className="relative z-10 pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              onClick={() => window.history.back()}
            >
             
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200/50 dark:border-orange-700/50 overflow-hidden"
              >
                {/* Job Header */}
                <div className="relative bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600 p-8 text-white overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
                  
                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-xl">
                            <Building className="w-10 h-10" />
                          </div>
                          <div>
                            <h1 className="text-4xl font-bold mb-2">{singleJob?.title}</h1>
                            <p className="text-orange-100 text-lg font-medium">{singleJob?.company?.name}</p>
                          </div>
                        </div>
                        
                        {/* Badges */}
                        <div className="flex flex-wrap gap-3">
                          <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 px-5 py-2 rounded-full shadow-lg font-semibold">
                            <Users className="w-4 h-4 mr-2" />
                            {singleJob?.position} Positions
                          </Badge>
                          <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 px-5 py-2 rounded-full shadow-lg font-semibold">
                            <Briefcase className="w-4 h-4 mr-2" />
                            {singleJob?.jobType}
                          </Badge>
                          <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 px-5 py-2 rounded-full shadow-lg font-semibold">
                            <DollarSign className="w-4 h-4 mr-2" />
                            {singleJob?.salary} LPA
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl w-12 h-12 shadow-lg"
                            onClick={() => setIsBookmarked(!isBookmarked)}
                          >
                            <Bookmark 
                              className={`w-5 h-5 ${isBookmarked ? 'fill-white text-white' : ''}`} 
                            />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl w-12 h-12 shadow-lg"
                            onClick={(e) => {
                              e.stopPropagation();
                              const jobUrl = `${window.location.origin}/description/${jobId}`;
                              const whatsappText = `Check out this amazing job opportunity: ${singleJob?.title} at ${singleJob?.company?.name}!\n\n${jobUrl}`;
                              const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;
                              window.open(whatsappUrl, '_blank');
                            }}
                          >
                            <Share2 className="w-5 h-5" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="p-8">
                  {/* Quick Stats - Enhanced */}
                  <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 dark:from-orange-900/10 dark:via-yellow-900/10 dark:to-orange-900/10 rounded-2xl p-6 mb-8 border border-orange-200/50 dark:border-orange-700/30">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {jobDetails.map((detail, index) => (
                        <motion.div
                          key={detail.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          className="flex items-center gap-3 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                            <detail.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{detail.label}</div>
                            <div className="font-bold text-gray-900 dark:text-gray-100 text-sm truncate">{detail.value}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Job Overview */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-8"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Job Overview
                      </h2>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base whitespace-pre-line">
                        {singleJob?.description || "No description available for this position."}
                      </p>
                    </div>
                  </motion.section>

                  {/* Requirements & Skills */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Required Skills
                      </h2>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                      <div className="flex flex-wrap gap-2">
                        {singleJob?.requirements?.length > 0 ? (
                          singleJob.requirements.map((skill, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Badge className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full font-medium border border-orange-200 dark:border-orange-700">
                                {skill}
                              </Badge>
                            </motion.div>
                          ))
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400">No specific requirements listed</span>
                        )}
                      </div>
                    </div>
                  </motion.section>
                </div>
              </motion.div>

              {/* Similar Jobs Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Similar Jobs You May Like
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allJobs
                    ?.filter((job) => job._id !== singleJob?._id)
                    .slice(0, 10)
                    .map((job, index) => (
                      <motion.div
                        key={job._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => window.location.href = `/description/${job._id}`}
                        className="group cursor-pointer bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-5 border border-orange-200/50 dark:border-orange-700/50 shadow-lg hover:shadow-xl transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform overflow-hidden">
                            <img
                              src={job.company?.logo || "https://d8it4huxumps7.cloudfront.net/uploads/images/login/login-img-1.png?d=734x734"}
                              alt={job.company?.name}
                              className="w-8 h-8 object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-1 truncate group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                              {job.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 truncate">
                              {job.company?.name}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Badge className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs px-2 py-1 rounded-full">
                                {job.location}
                              </Badge>
                              <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded-full">
                                {job.salary} LPA
                              </Badge>
                              <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
                                {job.jobType}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6 sticky top-24"
              >
                {/* Apply Card */}
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200/50 dark:border-orange-700/50 overflow-hidden">
                  <div className="p-6">
                    <AnimatePresence mode="wait">
                      {isApplied ? (
                        <motion.div
                          key="applied"
                          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="text-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="relative inline-block mb-4"
                          >
                            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
                            <CheckCircle className="w-20 h-20 text-green-500 relative z-10" />
                          </motion.div>
                          <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2"
                          >
                            🎉 Congratulations!
                          </motion.h3>
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-600 dark:text-gray-300 mb-6"
                          >
                            Your application has been submitted successfully! We'll review it and get back to you soon.
                          </motion.p>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20">
                              Track Application Status
                            </Button>
                          </motion.div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="apply"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                        >
                          <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                              <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Ready to Apply?</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              Take the next step in your career journey
                            </p>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              onClick={applyJobHandler}
                              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg font-bold"
                              size="lg"
                            >
                              <Send className="w-5 h-5 mr-2" />
                              Apply Now
                            </Button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Company Card */}
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200/50 dark:border-orange-700/50 overflow-hidden">
                  <div className="p-6">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <img
                          src={
                            singleJob?.company?.logo ||
                            "https://d8it4huxumps7.cloudfront.net/uploads/images/login/login-img-1.png?d=734x734"
                          }
                          alt={singleJob?.company?.name}
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{singleJob?.company?.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        Leading technology company building innovative solutions
                      </p>
                      <Button variant="outline" className="w-full border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20">
                        View Company Profile
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="relative bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600 rounded-3xl p-6 text-white overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-lg">Application Status</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-orange-100 text-sm">Total Applicants</span>
                          <span className="font-bold text-2xl">{singleJob?.applications?.length}</span>
                        </div>
                        <div className="w-full bg-orange-400/30 rounded-full h-3 backdrop-blur-sm">
                          <motion.div 
                            className="bg-white h-3 rounded-full shadow-lg"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((singleJob?.applications?.length || 0) * 10, 100)}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-center pt-3 border-t border-white/20 text-sm text-orange-100">
                        {singleJob?.applications?.length === 0 ? '🚀 Be the first to apply!' : '⚡ Apply soon - filling fast!'}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDescription;