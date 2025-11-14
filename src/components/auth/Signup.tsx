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
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { RootState } from '@/redux/store';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: ''
  });
  
  const { loading, user } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className='bg-blue-100 dark:bg-gray-900 min-h-screen px-4 sm:px-8 lg:px-32 transition-colors duration-200'>
      <Navbar />
      <div className='flex max-w-5xl mx-auto py-20'>
        <div className='flex flex-col md:flex-row w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden'>

          {/* Left Side Image */}
          <div className='w-full md:w-1/2 bg-yellow-400 flex items-center justify-center py-12'>
            <img 
              src='https://d8it4huxumps7.cloudfront.net/uploads/images/login/login-img-6.png' 
              alt='Signup Visual'
              className='object-cover h-full w-full rounded-3xl'
            />
          </div>

          {/* Right Side Signup Form */}
          <motion.form 
            onSubmit={submitHandler} 
            className='w-full md:w-1/2 p-6 space-y-6' 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className='relative text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 '>Create an Account</h1>

            <div className='my-2'>
              <Label className='dark:text-gray-300'>Full Name</Label>
              <Input
                type='text'
                value={input.fullname}
                name='fullname'
                onChange={changeEventHandler}
                placeholder='John Doe'
                className='w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 transition'
              />
            </div>
            
            <div className='my-2'>
              <Label className='dark:text-gray-300'>Email</Label>
              <Input
                type='email'
                value={input.email}
                name='email'
                onChange={changeEventHandler}
                placeholder='aayush400@example.com'
                className='w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 transition'
              />
            </div>

            <div className='my-2'>
              <Label className='dark:text-gray-300'>Phone Number</Label>
              <Input
                type='text'
                value={input.phoneNumber}
                name='phoneNumber'
                onChange={changeEventHandler}
                placeholder='9302633269'
                className='w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 transition'
              />
            </div>

            <div className='my-2'>
              <Label className='dark:text-gray-300'>Password</Label>
              <Input
                type='password'
                value={input.password}
                name='password'
                onChange={changeEventHandler}
                placeholder='********'
                className='w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 transition'
              />
            </div>

            <div className='flex flex-col md:flex-row items-center justify-between my-4'>
              <div className='flex items-center gap-6'>
                <div className='flex items-center space-x-2'>
                  <Input
                    type='radio'
                    name='role'
                    value='student'
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                    className='cursor-pointer w-4 h-4'
                  />
                  <Label className='dark:text-gray-300'>Student</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Input
                    type='radio'
                    name='role'
                    value='recruiter'
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                    className='cursor-pointer w-4 h-4'
                  />
                  <Label className='dark:text-gray-300'>Recruiter</Label>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <Label className='dark:text-gray-300'>Profile</Label>
                <Input
                  accept='image/*'
                  type='file'
                  onChange={changeFileHandler}
                  className='cursor-pointer'
                />
              </div>
            </div>

            {
              loading ? (
                <Button className='w-full py-3 flex justify-center items-center bg-blue-500 text-white'>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                </Button>
              ) : (
                <motion.button 
                  type='submit' 
                  className='w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors duration-300'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Signup
                </motion.button>
              )
            }

            <span className='block text-center text-sm text-gray-500 dark:text-gray-400 mt-4'>
              Already have an account? <Link to='/login' className='text-blue-600 dark:text-blue-400 hover:underline'>Login</Link>
            </span>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
