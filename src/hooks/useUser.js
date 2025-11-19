
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import userAPI from '../api/endpoints/userAPI'; // Fixed import - direct import
// import { API_MESSAGES } from '../api/constants/apiMessages';
// import { useToast } from '../components/comman/GloabalToast/UseToast';

// export const useUserProfile = (userId) => {
//   const toast = useToast();

//   return useQuery({
//     queryKey: ['user', userId],
//     queryFn: () => userAPI.getUserById(userId),
//     onError: (error) => {
//       toast.error(error.response?.data?.message || API_MESSAGES.ERROR.NETWORK_ERROR);
//     },
//   });
// };

// export const useUpdateUserProfile = () => {
//   const queryClient = useQueryClient();
//   const toast = useToast();
//   const { user: currentAuthUser, updateAuthUser } = useJWTAuth(); // You'll need to add this to your JWT provider

//   return useMutation({
//     mutationFn: async ({ userId, userData }) => {
//       console.log('🔄 useUpdateUserProfile called with:', { userId, userData });
//       const response = await userAPI.updateUser(userId, userData);
//       console.log('✅ API Response:', response);
//       return response;
//     },
    
//     onSuccess: (data, variables) => {
//       console.log('🎉 Update successful, updating all systems');
      
//       // 1. Update TanStack Query cache
//       queryClient.setQueryData(['user', variables.userId], data);
//       queryClient.invalidateQueries(['user', variables.userId]);
      
//       // 2. Update JWT Auth Context (if you add this function to your provider)
//       if (updateAuthUser) {
//         updateAuthUser(data); // Update the auth context user
//       }
      
//       toast.success(API_MESSAGES.SUCCESS.PROFILE_UPDATED);
//     },
    
//     onError: (error) => {
//       console.error('❌ Update error:', error);
//       toast.error(error.response?.data?.message || API_MESSAGES.ERROR.VALIDATION_ERROR);
//     },
//   });
// };


// export const useUploadProfilePicture = () => {
//   const queryClient = useQueryClient();
//   const toast = useToast();

//   return useMutation({
//     mutationFn: async ({ userId, file }) => {
//       console.log('🖼️ Uploading profile picture:', { userId, file });
//       return userAPI.uploadProfilePicture(userId, file);
//     },
    
//     onSuccess: (data, variables) => {
//       queryClient.invalidateQueries(['user', variables.userId]);
//       toast.success('Profile picture updated successfully');
//     },
    
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to upload profile picture');
//     },
//   });
// };

// export default {
//   useUserProfile,
//   useUpdateUserProfile,
//   useUploadProfilePicture,
// };

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import userAPI from '../api/endpoints/userAPI'; // Fixed import - direct import
import { API_MESSAGES } from '../api/constants/apiMessages';
import { useToast } from '../components/comman/GloabalToast/UseToast';

export const useUserProfile = (userId) => {
  const toast = useToast();

  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userAPI.getUserById(userId),
    enabled: !!userId,
    onError: (error) => {
      toast.error(error.response?.data?.message || API_MESSAGES.ERROR.NETWORK_ERROR);
    },
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async ({ userId, userData }) => {
      console.log('🔄 useUpdateUserProfile called with:', { userId, userData });
      const response = await userAPI.updateUser(userId, userData);
      console.log('✅ API Response:', response);
      return response;
    },
    
    onSuccess: (data, variables) => {
      console.log('🎉 Update successful, updating cache');
      
      // Update TanStack Query cache
      queryClient.setQueryData(['user', variables.userId], data);
      queryClient.invalidateQueries(['user', variables.userId]);
      
      toast.success(API_MESSAGES.SUCCESS.PROFILE_UPDATED);
    },
    
    onError: (error) => {
      console.error('❌ Update error:', error);
      toast.error(error.response?.data?.message || API_MESSAGES.ERROR.VALIDATION_ERROR);
    },
  });
};

export const useUploadProfilePicture = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({ userId, file }) => 
      userAPI.uploadProfilePicture(userId, file),
    
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['user', variables.userId]);
      toast.success('Profile picture updated successfully');
    },
    
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to upload profile picture');
    },
  });
};

export default {
  useUserProfile,
  useUpdateUserProfile,
  useUploadProfilePicture,
};