import { useAuth } from '@/providers/auth/useAuthContext';
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedLayout = () => {
    const { user } = useAuth();

    return <Outlet/>
    return user !== undefined ? <Outlet /> : <Navigate to="/" replace />
};

export { ProtectedLayout };
