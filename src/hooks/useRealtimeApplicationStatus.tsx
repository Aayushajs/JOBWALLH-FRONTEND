import { useEffect } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { RootState } from '@/redux/store';
import { updateApplicationStatus } from '@/redux/jobSlice';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const useRealtimeApplicationStatus = () => {
    const { socket, isConnected } = useSocket();
    const dispatch = useDispatch();
    const { user } = useSelector((store: RootState) => store.auth);

    useEffect(() => {
        if (!socket || !isConnected || user?.role !== 'student') return;

        // Listen for application status updates
        socket.on('applicationStatusUpdate', (data) => {
            console.log('🔔 Application status update received:', data);
            
            const status = data.status;
            const jobTitle = data.application?.job?.title || 'Job';
            const applicationId = data.application?._id;

            // 🔥 Update Redux store in real-time - Status changes instantly
            if (applicationId) {
                dispatch(updateApplicationStatus({ 
                    applicationId, 
                    status 
                }));
                console.log(`✅ Redux updated: Application ${applicationId} → ${status}`);
            }

            // Show toast notification based on status
            if (status === 'accepted') {
                toast.success(
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <div>
                            <p className="font-bold text-green-700">🎉 Application Accepted!</p>
                            <p className="text-sm text-gray-600">Congratulations! Your application for <b>{jobTitle}</b> has been accepted.</p>
                        </div>
                    </div>,
                    {
                        duration: 8000,
                        position: 'top-right',
                        className: 'bg-green-50 border-green-200'
                    }
                );
            } else if (status === 'rejected') {
                toast.error(
                    <div className="flex items-center gap-3">
                        <XCircle className="w-6 h-6 text-red-500" />
                        <div>
                            <p className="font-bold text-red-700">Application Not Selected</p>
                            <p className="text-sm text-gray-600">Your application for <b>{jobTitle}</b> was not selected. Keep applying!</p>
                        </div>
                    </div>,
                    {
                        duration: 6000,
                        position: 'top-right',
                        className: 'bg-red-50 border-red-200'
                    }
                );
            } else {
                toast.info(
                    <div className="flex items-center gap-3">
                        <Clock className="w-6 h-6 text-blue-500" />
                        <div>
                            <p className="font-bold text-blue-700">Application Status Updated</p>
                            <p className="text-sm text-gray-600">Status: <b className="capitalize">{status}</b> for {jobTitle}</p>
                        </div>
                    </div>,
                    {
                        duration: 5000,
                        position: 'top-right'
                    }
                );
            }
        });

        return () => {
            socket.off('applicationStatusUpdate');
        };
    }, [socket, isConnected, dispatch, user?.role]);
};

export default useRealtimeApplicationStatus;
