// This is Home page and adding more compon.
import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import useRealtimeJobs from '@/hooks/useRealtimeJobs'
import useRealtimeApplicationStatus from '@/hooks/useRealtimeApplicationStatus'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BannerCarousel from './shared/Banner'
import Tamplet from './Tamplert'
import FloatingChatButton from './ui/loating-chat-button'
import AddSection from './AddSection'
import { RootState } from '@/redux/store'

const Home: React.FC = () => {
  useGetAllJobs();
  // 🔥 Enable real-time features
  useRealtimeJobs();
  useRealtimeApplicationStatus();
  
  const { user } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div className='bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-200'>
      <Navbar />
      <HeroSection />
      <CategoryCarousel/>
      {/* <AddSection/> */}
      {/* <BannerCarousel/>  */}
      {/* <Tamplet/> */}
      <LatestJobs />
      <FloatingChatButton />
      <Footer />
    </div>
  )
}

export default Home 