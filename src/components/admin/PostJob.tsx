import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2, Sparkles, CheckCircle } from 'lucide-react'
import { RootState } from '@/redux/store'

const companyArray = [];

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: "",
        isPremium: false
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector((store: RootState) => store.company);
    const { user } = useSelector((store: RootState) => store.auth);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
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
                ...input,
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
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div 
            className="relative min-h-screen bg-cover bg-center" 
            style={{ backgroundImage: 'url(https://image.slidesdocs.com/responsive-images/slides/2-business-plan-summary-powerpoint-background_137b194fa2__960_540.jpg)' }}
        >
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5 py-20'>
                <div className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md bg-white bg-opacity-90 backdrop-blur-lg'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div >
                            <Label>No of Postion</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return (
                                                        <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                    )
                                                })
                                            }

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                    
                    {/* Post Type Buttons */}
                    <div className="grid grid-cols-2 gap-4 my-6">
                        {/* Normal Job Post */}
                        <Button 
                            type="button"
                            onClick={(e) => submitHandler(e, 'normal')}
                            disabled={loading || companies.length === 0}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold shadow-lg"
                        >
                            {loading ? (
                                <><Loader2 className='mr-2 h-5 w-5 animate-spin' /> Please wait</>
                            ) : (
                                <>📝 Post Normal Job</>
                            )}
                        </Button>
                        
                        {/* Premium Job Post */}
                        <Button 
                            type="button"
                            onClick={(e) => submitHandler(e, 'premium')}
                            disabled={loading || companies.length === 0}
                            className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white py-6 text-lg font-semibold shadow-lg relative overflow-hidden group"
                        >
                            <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                            {loading ? (
                                <><Loader2 className='mr-2 h-5 w-5 animate-spin' /> Please wait</>
                            ) : (
                                <><Sparkles className='mr-2 h-5 w-5' /> Post Premium Job</>
                            )}
                        </Button>
                    </div>
                    
                    {/* Messages */}
                    {companies.length === 0 && (
                        <p className='text-xs text-red-600 font-bold text-center my-3'>
                            *Please register a company first, before posting jobs
                        </p>
                    )}
                    
                    {user?.premiumPlans?.some((p) => new Date(p.expiryDate) > new Date()) ? (
                        <div className='text-xs text-green-600 font-semibold text-center my-2'>
                            <div className='flex items-center justify-center gap-2 mb-1'>
                                <CheckCircle className="w-4 h-4" />
                                Premium access active
                            </div>
                            <div className='flex flex-wrap gap-2 justify-center'>
                                {user.premiumPlans.filter((p) => new Date(p.expiryDate) > new Date()).map((plan, idx) => (
                                    <span key={idx} className='text-xs'>
                                        {plan.planName} until {new Date(plan.expiryDate).toLocaleDateString()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className='text-xs text-orange-600 font-semibold text-center my-2'>
                            💡 Get Premium to post featured jobs that reach more candidates!
                        </p>
                    )}
                </div>
            </div>
        </div >
    )
}

export default PostJob
