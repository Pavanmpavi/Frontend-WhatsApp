import React from 'react';
import { alpha, Box, Button, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AppGridContainer from '@crema/components/AppGridContainer';
import Grid from '@mui/material/Grid';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useDropzone } from 'react-dropzone';
import { Form } from 'formik';
import PropTypes from 'prop-types';
import AppTextField from '@crema/components/AppFormComponents/AppTextField';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import { Fonts } from '@crema/constants/AppEnums';

const AvatarViewWrapper = styled('div')(({ theme }) => {
  return {
    position: 'relative',
    cursor: 'pointer',
    '& .edit-icon': {
      position: 'absolute',
      bottom: 0,
      right: 0,
      zIndex: 1,
      border: `solid 2px ${theme.palette.background.paper}`,
      backgroundColor: alpha(theme.palette.primary.main, 0.7),
      color: theme.palette.primary.contrastText,
      borderRadius: '50%',
      width: 26,
      height: 26,
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.4s ease',
      cursor: 'pointer',
      '& .MuiSvgIcon-root': {
        fontSize: 16,
      },
    },
    '&.dropzone': {
      outline: 0,
      '&:hover .edit-icon, &:focus .edit-icon': {
        display: 'flex',
      },
    },
  };
});

const PersonalInfoForm = ({ 
  values, 
  setFieldValue, 
  isSubmitting, 
  onPhotoUpload,
  isUploading 
}) => {
  
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setFieldValue('photoURL', e.target.result);
        };
        reader.readAsDataURL(file);
        
        // Upload to server
        onPhotoUpload(file);
      }
    },
  });

  return (
    <Form noValidate autoComplete="off">
      <Typography
        component="h3"
        sx={{
          fontSize: 16,
          fontWeight: Fonts.BOLD,
          mb: { xs: 3, lg: 4 },
        }}
      >
        <IntlMessages id="common.personalInfo" />
      </Typography>
      
      {/* Profile Photo Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: { xs: 5, lg: 6 },
        }}
      >
        <AvatarViewWrapper {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <Avatar
            sx={{
              width: { xs: 50, lg: 64 },
              height: { xs: 50, lg: 64 },
              cursor: 'pointer',
            }}
            src={values.photoURL}
          />
          <Box className="edit-icon">
            {isUploading ? (
              <Typography variant="body2">...</Typography>
            ) : (
              <EditIcon />
            )}
          </Box>
        </AvatarViewWrapper>
        <Box sx={{ ml: 4 }}>
          <Typography sx={{ fontWeight: Fonts.MEDIUM }}>
            {values.name || values.name}
          </Typography>
          <Typography sx={(theme) => ({ color: theme.palette.text.secondary })}>
            {values.email}
          </Typography>
        </Box>
      </Box>

      {/* Form Fields */}
      <AppGridContainer spacing={4}>
        <Grid item xs={12} md={6}>
          <AppTextField 
            name="name" 
            fullWidth 
            label={<IntlMessages id="common.fullName" />} 
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <AppTextField 
            fullWidth 
            name="email" 
            label={<IntlMessages id="common.email" />}
            disabled // Email might not be editable
            InputProps={{
              readOnly: true,
            }}
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: '#000000', // Keep text color black when disabled
              },
            }}
          />
        </Grid>

        {/* Remove fields that don't exist in your DB */}
        {/* <Grid item xs={12} md={6}>
          <AppTextField name="username" label={<IntlMessages id="common.userName" />} />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextField name="company" label={<IntlMessages id="common.company" />} />
        </Grid> */}

        <Grid item xs={12} md={12}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              sx={{ position: 'relative', minWidth: 100 }}
              color="primary"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : <IntlMessages id="common.saveChanges" />}
            </Button>
            
            <Button
              sx={{ position: 'relative', minWidth: 100, ml: 2.5 }}
              color="primary"
              variant="outlined"
              type="button" // Changed from "cancel" to "button"
              disabled={isSubmitting}
            >
              <IntlMessages id="common.cancel" />
            </Button>
          </Box>
        </Grid>
      </AppGridContainer>
    </Form>
  );
};

PersonalInfoForm.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
  isSubmitting: PropTypes.bool,
  onPhotoUpload: PropTypes.func,
  isUploading: PropTypes.bool,
};

export default PersonalInfoForm;