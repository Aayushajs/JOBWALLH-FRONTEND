import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { RootState } from '@/redux/store';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector((store: RootState) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div>
            <Navbar />
            <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
                <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden flex-col md:flex-row">
                    {/* Left side with image */}
                    <div className="w-full md:w-1/2 bg-yellow-400 p-6 md:p-10 flex flex-col justify-center items-center">
                        <img
                            src="https://d8it4huxumps7.cloudfront.net/uploads/images/login/login-img-4.png?d=734x734"
                            alt="Practice easy to complex problems"
                            className="w-full h-auto mb-5"
                        />
                        <div className="space-y-2">
                            <div className="bg-white p-2 rounded-lg shadow-md">
                                <p className="text-center text-sm text-gray-800">5-Day Interview Prep</p>
                            </div>
                            <div className="bg-white p-2 rounded-lg shadow-md">
                                <p className="text-center text-sm text-gray-800">100-Day Coding Sprint</p>
                            </div>
                        </div>
                    </div>

                    {/* Right side with login form */}
                    <div className="w-full md:w-1/2 p-6 md:p-10">
                        <h1 className="relative text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">Welcome Back to Job Search!</h1>
                        <p className="text-sm mb-6 dark:text-gray-300">Hi, Candidate! Please login to your account to continue.</p>

                        <form onSubmit={submitHandler} className="space-y-4">
                            {/* Google or LinkedIn login */}
                            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 mb-4">
                                <Button className="bg-blue-500 w-full">Continue with Google</Button>
                                <Button className="bg-blue-700 w-full">Login with LinkedIn</Button>
                            </div>

                            {/* Email login */}
                            <div className="space-y-2">
                                <Label className="dark:text-gray-300">Email</Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="aayushj004@gmail.com"
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="dark:text-gray-300">Password</Label>
                                <Input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your password"
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-4 my-5">
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="cursor-pointer w-4 h-4"
                                        />
                                        <Label htmlFor="r1" className="dark:text-gray-300">Student</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="cursor-pointer w-4 h-4"
                                        />
                                        <Label htmlFor="r2" className="dark:text-gray-300">Recruiter</Label>
                                    </div>
                                </div>
                            </div>

                            {/* Submit button */}
                            {loading ? (
                                <Button className="w-full my-4">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full my-4">
                                    Login
                                </Button>
                            )}
                        </form>

                        <p className="text-sm dark:text-gray-300">
                            Don't have an account? <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">Signup</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
