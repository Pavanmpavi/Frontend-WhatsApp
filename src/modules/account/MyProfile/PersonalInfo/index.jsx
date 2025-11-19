import { Box, Typography, Button } from '@mui/material';
import { useUpdateUserProfile, useUploadProfilePicture } from '../../../../hooks/useUser';
import { useCurrentUser } from '../../../../hooks/useCurrentUser'; // Use the new hook
import { useJWTAuthActions } from '@crema/services/auth/jwt-auth/JWTAuthProvider';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PersonalInfoForm from "../PersonalInfo/PersonalInfoForm"
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
});

const PersonalInfo = () => {
  const { user, isAuthenticated, refetch } = useCurrentUser(); // Auto-updating user data
  console.log("au",user);
  
  const { updateAuthUser } = useJWTAuthActions();
  
  const updateUserMutation = useUpdateUserProfile();
  const uploadPhotoMutation = useUploadProfilePicture();

    const handleSubmit = async (data, { setSubmitting }) => {
    if (!isAuthenticated || !user) {
      console.error('❌ User not authenticated');
      setSubmitting(false);
      return;
    }

    try {
      await updateUserMutation.mutateAsync({
        userId: user.data.id,
       
        
        userData: {
          name: data.name
        }
      });
      
      // The useCurrentUser hook will automatically refetch due to cache invalidation
      // Also update JWT auth context for immediate UI update
      if (updateAuthUser) {
        updateAuthUser({
          ...user,
          name: data.name
        });
      }
      
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePhotoUpload = async (file) => {
    if (!isAuthenticated || !user) return;

    try {
      const result = await uploadPhotoMutation.mutateAsync({
        userId: user._id || user.id,
        file,
      });
      
      // Update JWT auth context with new photo URL if available
      if (updateAuthUser && result?.data?.photoURL) {
        updateAuthUser({
          ...user,
          photoURL: result.data.photoURL
        });
      }
    } catch (error) {
      console.error('Photo upload error:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ position: 'relative', maxWidth: 550, p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error" gutterBottom>
          Authentication Required
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Please log in to update your profile.
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => window.location.href = '/signin'}
          sx={{ mt: 2 }}
        >
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', maxWidth: 550 }}>
      <Formik
        enableReinitialize
        initialValues={{
          name: user?.name || '',
          email: user?.email || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <PersonalInfoForm
            values={values}
            setFieldValue={setFieldValue}
            isSubmitting={isSubmitting || updateUserMutation.isLoading}
            onPhotoUpload={handlePhotoUpload}
            isUploading={uploadPhotoMutation.isLoading}
          />
        )}
      </Formik>
    </Box>
  );
};

export default PersonalInfo;