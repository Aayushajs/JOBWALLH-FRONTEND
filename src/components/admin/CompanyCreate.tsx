import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import Footer from '../shared/Footer';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while creating the company.");
        }
    }

    return (
        <div> 
        <div className='relative min-h-screen bg-gray-100 py-10 sm:py-20'>
            <Navbar />
            <div className='absolute top-0 right-0 w-full h-full bg-cover bg-center'
                style={{ backgroundImage: `url('https://png.pngtree.com/thumb_back/fw800/background/20240528/pngtree-2d-blue-background-reduced-design-exclusive-and-elegant-image_15824442.jpg')` }}
            >
                {/* Background Image */}
            </div>
            <div className='max-w-4xl mx-auto px-4 sm:px-10 relative z-10'>
                <div className='bg-white shadow-lg rounded-lg p-6 sm:p-8'>
                    <div className='flex flex-col items-center gap-5 mb-6'>
                        <h1 className='font-bold text-xl sm:text-2xl'>Your Company Name</h1>
                        <img src="https://cdn.unstop.com/uploads/images/unstop/user-referral/payment-dashboard-icon.png?d=176x177" alt="Company" className='w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-gray-200' />
                    </div>
                    <p className='text-gray-500 dark:text-gray-400 mb-6 text-center sm:text-left'>What would you like to give your company name? You can change this later.</p>

                    <Label>Company Name</Label>
                    <Input
                        type="text"
                        className="my-2 p-3 border rounded-lg shadow-sm w-full"
                        placeholder="JobHunt, Microsoft etc."
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <div className='flex flex-col sm:flex-row items-center gap-2 mt-6'>
                        <Button variant="outline" onClick={() => navigate("/admin/companies")} className="w-full sm:w-auto">Cancel</Button>
                        <Button onClick={registerNewCompany} className="w-full sm:w-auto">Continue</Button>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </div>
    )
}

export default CompanyCreate;
