import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import AppTextField from '@crema/components/AppFormComponents/AppTextField';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useAuthMethod } from '@crema/hooks/AuthHooks';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import AppInfoView from '@crema/components/AppInfoView';
import { Fonts } from '@crema/constants/AppEnums';
import { Link } from 'react-router-dom';
import { AccountCircle, Email, Lock } from '@mui/icons-material';

import { InputAdornment } from '@mui/material';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { MdOutlineEmail } from 'react-icons/md';
import AuthWrapper from '../AuthWrapper';
import Typography from '@mui/material/Typography';

const validationSchema = yup.object({
  name: yup.string().required(<IntlMessages id='validation.nameRequired' />),
  email: yup
    .string()
    .email(<IntlMessages id='validation.emailFormat' />)
    .required(<IntlMessages id='validation.emailRequired' />),
  password: yup
    .string()
    .required(<IntlMessages id='validation.passwordRequired' />),
});

const SignupJwtAuth = () => {
  const { signUpUser } = useAuthMethod();

  return (
    <AuthWrapper>
       <Typography
        sx={{
          color: 'rgb(51, 51, 51)', // Dark grey text color
          fontFamily: 'Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif', // Font family
          fontWeight: 500, // Font weight
          fontSize: '31px', // Font size
          lineHeight: '39px', // Line height
          mb: 4, // Margin bottom
          textAlign: 'left', // Text alignment
        }}
      >
        Registration
      </Typography>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', mb: 5 }}>
          <Formik
            validateOnChange={true}
            initialValues={{
              name: '',
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              signUpUser({
                email: data.email,
                password: data.password,
                name: data.name,
              });
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form style={{ textAlign: 'left' }} noValidate autoComplete='off'>
                {/* Name Field */}
                <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                  <AppTextField
                    name='name'
                    placeholder='Enter Name'
                    variant='outlined'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start' sx={{ fontSize: 25 }}>
                          <AiOutlineUser />
                        </InputAdornment>
                      ),
                      style: {
                        borderRadius: 5,
                        backgroundColor: 'white',
                        padding: '3px 6px',
                        color: '#000',
                      },
                    }}
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-root': {
                        borderRadius: 50,
                        backgroundColor: 'white',
                        color: '#000',
                      },
                      '& .MuiInputBase-input': {
                        fontSize: 16,
                        paddingLeft: '10px',
                        color: '#000',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(161, 161, 161)',
                      },
                    }}
                  />
                </Box>

                {/* Email Field */}
                <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                  <AppTextField
                    name='email'
                    placeholder='Enter Email'
                    variant='outlined'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start' sx={{ fontSize: 25 }}>
                          <MdOutlineEmail />
                        </InputAdornment>
                      ),
                      style: {
                        borderRadius: 5,
                        backgroundColor: 'white',
                        padding: '3px 6px',
                        color: '#000',
                      },
                    }}
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-root': {
                        borderRadius: 50,
                        backgroundColor: 'white',
                        color: '#000',
                      },
                      '& .MuiInputBase-input': {
                        fontSize: 16,
                        paddingLeft: '10px',
                        color: '#000',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(161, 161, 161)',
                      },
                    }}
                  />
                </Box>

                {/* Password Field */}
                <Box sx={{ mb: { xs: 4, xl: 5 } }}>
                  <AppTextField
                    name='password'
                    placeholder='Password'
                    type='password'
                    variant='outlined'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start' sx={{ fontSize: 25 }}>
                          <AiOutlineLock />
                        </InputAdornment>
                      ),
                      style: {
                        borderRadius: 5,
                        backgroundColor: 'white',
                        padding: '3px 6px',
                        color: '#000',
                      },
                    }}
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-root': {
                        borderRadius: 50,
                        backgroundColor: 'white',
                        color: '#000',
                      },
                      '& .MuiInputBase-input': {
                        fontSize: 16,
                        paddingLeft: '10px',
                        color: '#000',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(161, 161, 161)',
                      },
                    }}
                  />
                </Box>

                {/* Terms and Conditions */}
                <Box
                  sx={{
                    mb: { xs: 3, xl: 4 },
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: 6,
                  }}
                >
                  <Checkbox sx={{ ml: -3 }} id='agreeToTerms' />
                  <Box
                    aria-labelledby='agreeToTerms'
                    component='span'
                    sx={{
                      fontFamily: 'Montserrat',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: '20px',
                      color: 'rgb(119, 125, 134)',
                    }}
                  >
                    <IntlMessages id='common.iAgreeTo' />
                  </Box>
                  <Box
                    component='span'
                    sx={{
                      color: 'rgba(47, 198, 246, 0.87)',
                      fontFamily: 'Montserrat',
                      fontSize: '13px',
                      fontWeight: 400,
                      lineHeight: '17px',
                      cursor: 'pointer',
                      textAlign: 'right',
                      ml: 2,
                    }}
                    onClick={() => {}}
                  >
                    <IntlMessages id='common.termConditions' />
                  </Box>
                </Box>

                {/* Submit Button */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '8vh',
                  }}
                >
                  <Button
                    variant='contained'
                    color='primary'
                    disabled={isSubmitting}
                    sx={{
                      minWidth: 130,
                      marginLeft: 10,
                      fontWeight: 500, // Updated font weight
                      fontSize: 17, // Updated font size
                      lineHeight: '23px', // Added line height
                      textTransform: 'capitalize',
                      padding: '10px 16px 8px',
                      color: 'rgb(255, 255, 255)', // Updated font color
                      backgroundColor: 'rgb(157, 207, 0)', // Background color
                      '&:hover': {
                        backgroundColor: 'rgb(157, 207, 0.2)', // Slightly higher opacity on hover
                      },
                      fontFamily: 'Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif', // Updated font family
                    }}
                    type='submit'

                  >
                    <IntlMessages id='common.signup' />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>

        {/* Already have an account */}
        <Box
          sx={{
            color: 'grey.700',
            mb: { xs: 5, md: 7 },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '5vh',
            marginLeft: 10,
          }}
        >
          <span style={{ marginRight: 4 }}>
            <IntlMessages id='common.alreadyHaveAccount' />
          </span>
          <Box
            component='span'
            sx={{
              fontWeight: Fonts.MEDIUM,
              '& a': {
                color: '#64b5f6',
                textDecoration: 'none',
              },
            }}
          >
            <Link to='/signIn'>
              <IntlMessages id='common.signIn' />
            </Link>
          </Box>
        </Box>

        <AppInfoView />
      </Box>
    </AuthWrapper>
  );
};

export default SignupJwtAuth;

