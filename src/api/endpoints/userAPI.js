import axiosClient from '../axios/axiosClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

const userAPI = {
  // Get all users
  getUsers: () => {
    return axiosClient.get(ENDPOINTS.USERS);
  },

  // Get user by ID
  getUserById: (userId) => {
    return axiosClient.get(`${ENDPOINTS.USERS}/${userId}`);
  },

  // Create user
  createUser: (userData) => {
    return axiosClient.post(ENDPOINTS.USERS, userData);
  },

  // Update user
  updateUser: (userId, userData) => {
    return axiosClient.patch(`${ENDPOINTS.USERS}/${userId}`, userData);
  },

  // Delete user
  deleteUser: (userId) => {
    return axiosClient.delete(`${ENDPOINTS.USERS}/${userId}`);
  },

  // Update user profile
  updateProfile: (userId, profileData) => {
    return axiosClient.patch(`${ENDPOINTS.USERS}/${userId}/profile`, profileData);
  },

  // Upload profile picture
  uploadProfilePicture: (userId, file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    
    return axiosClient.post(
      `${ENDPOINTS.USERS}/${userId}/avatar`, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  },

  // Change password
  changePassword: (userId, passwordData) => {
    return axiosClient.patch(`${ENDPOINTS.USERS}/${userId}/password`, passwordData);
  },
};

export default userAPI;