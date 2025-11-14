import { useEffect } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { RootState } from '@/redux/store';
import { updateApplicantStatus } from '@/redux/applicationSlice';
import { CheckCircle, XCircle } from 'lucide-react';

const useRealtimeRecruiterUpdates = () => {
    const { socket, isConnected } = useSocket();
    const dispatch = useDispatch();
    const { user } = useSelector((store: RootState) => store.auth);

    useEffect(() => {
        if (!socket || !isConnected || user?.role !== 'recruiter') return;

        // Listen for application status updates that this recruiter made
        socket.on('applicationStatusUpdate', (data) => {
            console.log('🔔 Recruiter side - Status update:', data);
            
            const status = data.status;
            const applicationId = data.application?._id;
            const applicantName = data.application?.applicant?.fullname || 'Applicant';

            // 🔥 Update Redux store in real-time for recruiter's view
            if (applicationId) {
                dispatch(updateApplicantStatus({ 
                    applicationId, 
                    status 
                }));
                console.log(`✅ Recruiter Redux updated: Application ${applicationId} → ${status}`);
            }

            // Show confirmation toast to recruiter
            if (status === 'accepted') {
                toast.success(
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                            <p className="font-semibold">Application Accepted</p>
                            <p className="text-sm">{applicantName}'s application has been accepted</p>
                        </div>
                    </div>,
                    {
                        duration: 3000,
                        position: 'bottom-right'
                    }
                );
            } else if (status === 'rejected') {
                toast.error(
                    <div className="flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <div>
                            <p className="font-semibold">Application Rejected</p>
                            <p className="text-sm">{applicantName}'s application has been rejected</p>
                        </div>
                    </div>,
                    {
                        duration: 3000,
                        position: 'bottom-right'
                    }
                );
            }
        });

        return () => {
            socket.off('applicationStatusUpdate');
        };
    }, [socket, isConnected, dispatch, user?.role]);
};

export default useRealtimeRecruiterUpdates;
