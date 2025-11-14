import { useEffect } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '@/redux/jobSlice';
import { toast } from 'sonner';
import { RootState } from '@/redux/store';
import { Sparkles, Briefcase } from 'lucide-react';

const useRealtimeJobs = () => {
    const { socket, isConnected } = useSocket();
    const dispatch = useDispatch();
    const { allJobs } = useSelector((store: RootState) => store.job);
    const { user } = useSelector((store: RootState) => store.auth);

    useEffect(() => {
        if (!socket || !isConnected || user?.role !== 'student') return;

        // Listen for new job postings
        socket.on('newJob', (data) => {
            console.log('🔔 New job received:', data);
            
            // Add new job to the beginning of the list
            if (data.job && allJobs) {
                const updatedJobs = [data.job, ...allJobs];
                dispatch(setAllJobs(updatedJobs));
            }

            // Show toast notification with custom icon
            const isPremium = data.job?.isPremium;
            toast.success(
                <div className="flex items-center gap-2">
                    {isPremium ? (
                        <Sparkles className="w-5 h-5 text-yellow-500" />
                    ) : (
                        <Briefcase className="w-5 h-5 text-blue-500" />
                    )}
                    <div>
                        <p className="font-semibold">{isPremium ? '⭐ Premium Job Posted!' : '📢 New Job Posted!'}</p>
                        <p className="text-sm">{data.job?.title} at {data.job?.company?.name}</p>
                    </div>
                </div>,
                {
                    duration: 5000,
                    position: 'top-right'
                }
            );
        });

        return () => {
            socket.off('newJob');
        };
    }, [socket, isConnected, dispatch, allJobs, user?.role]);
};

export default useRealtimeJobs;
