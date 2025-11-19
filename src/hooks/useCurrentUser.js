import { useJWTAuth } from '@crema/services/auth/jwt-auth/JWTAuthProvider';
import { useQuery } from '@tanstack/react-query';
import userAPI from '../api/endpoints/userAPI';

export const useCurrentUser = () => {
  const { user: authUser, isAuthenticated, isLoading: authLoading } = useJWTAuth();
  
  // Use TanStack Query for auto-updating user data
  const { 
    data: freshUser, 
    isLoading: queryLoading, 
    error,
    refetch
  } = useQuery({
    queryKey: ['current-user', authUser?._id || authUser?.id],
    queryFn: () => {
      if (!authUser?._id && !authUser?.id) {
        throw new Error('No user ID available');
      }
      return userAPI.getUserById(authUser._id || authUser.id);
    },
    enabled: !!authUser && isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Prefer fresh data from query, fallback to auth context
  const user = freshUser || authUser;
  const isLoading = authLoading || queryLoading;

  const userRole = Array.isArray(user?.role)
    ? user.role
    : user?.role
    ? [user.role]
    : [];

  return {
    isLoading,
    isAuthenticated,
    user,
    role: userRole,
    refetch, // Allow manual refetch
    isFreshData: !!freshUser,
  };
};