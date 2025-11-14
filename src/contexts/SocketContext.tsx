import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from 'sonner';

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false
});

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within SocketProvider');
    }
    return context;
};

interface SocketProviderProps {
    children: React.ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const { user } = useSelector((store: RootState) => store.auth);

    useEffect(() => {
        // Only connect if user is logged in
        if (!user?._id) {
            return;
        }

        // Connect to Socket.IO server
        // Use production URL if available, otherwise localhost
        const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 
                          'https://job-backend-company.onrender.com' || 
                          'http://localhost:4000';
        
        const newSocket = io(SOCKET_URL, {
            withCredentials: true,
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });

        newSocket.on('connect', () => {
            console.log('✅ Socket.IO connected:', newSocket.id);
            setIsConnected(true);

            // Join user-specific room for notifications
            if (user._id) {
                newSocket.emit('join', user._id);
            }

            // Students join jobs room for real-time job updates
            if (user.role === 'student') {
                newSocket.emit('joinJobsRoom');
            }
        });

        newSocket.on('disconnect', () => {
            console.log('❌ Socket.IO disconnected');
            setIsConnected(false);
        });

        newSocket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            setIsConnected(false);
        });

        setSocket(newSocket);

        // Cleanup on unmount
        return () => {
            newSocket.close();
        };
    }, [user?._id, user?.role]);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};
