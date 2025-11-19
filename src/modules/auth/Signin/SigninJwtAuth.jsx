
import React from 'react';
import { Checkbox } from '@mui/material';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppTextField from '@crema/components/AppFormComponents/AppTextField';
import AuthWrapper from '../AuthWrapper';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { AiOutlineUser , AiOutlineLock } from 'react-icons/ai';
import AppInfoView from '@crema/components/AppInfoView';
import { useAuthMethod } from '@crema/hooks/AuthHooks';
import { Fonts } from '@crema/constants/AppEnums';
import Typography from '@mui/material/Typography';

const validationSchema = yup.object({
  email: yup
    .string()
    .email(<IntlMessages id='validation.emailFormat' />)
    .required(<IntlMessages id='validation.emailRequired' />),
  password: yup
    .string()
    .required(<IntlMessages id='validation.passwordRequired' />),
});

const SigninJwtAuth = () => {
  const navigate = useNavigate();
  const { signInUser  } = useAuthMethod();
  console.log(signInUser)
  const onGoToForgetPassword = () => {
    navigate('/forget-password', { tab: 'jwtAuth' });
  };

  const { messages } = useIntl();

  return (
    <AuthWrapper>
      <Typography
        sx={{
          color: 'rgb(51, 51, 51)',
          fontFamily: 'Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontWeight: 500,
          fontSize: '31px',
          lineHeight: '39px',
          mb: 4,
          textAlign: 'left',
          marginTop: 22,
        }}
      >
        SIGN IN
      </Typography>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', mb: 5 }}>
          <Formik
            validateOnChange={true}
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (data, { setSubmitting }) => {
              setSubmitting(true);
              const user = await signInUser ({
                email: data.email,
                password: data.password,
              });

              if (user) {
                // Determine redirect URL based on user role
                let redirectUrl;
                if (user.role === 'superadmin') {
                  redirectUrl = '/dashboards/crypto'; // Replace with your superadmin dashboard URL
                } else if (user.role === 'admin') {
                  redirectUrl = '/dashboards/crypto'; // Admin-specific URL
                } else if (user.role === 'user') {
                  redirectUrl = '/dashboards/e-commerce'; // User-specific URL
                } else {
                  redirectUrl = '/dashboards/e-commerce'; // Fallback URL
                }

                // Navigate to the determined URL
                navigate(redirectUrl);
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form style={{ textAlign: 'left' }} noValidate autoComplete='off'>
                <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                  <AppTextField
                    placeholder={messages['common.email']}
                    name='email'
                    label={<IntlMessages id='common.email' />}
                    variant='outlined'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton edge="start">
                            <AiOutlineUser  />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      width: '100%',
                    }}
                  />
                </Box>

                <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                  <AppTextField
                    type='password'
                    placeholder={messages['common.password']}
                    label={<IntlMessages id='common.password' />}
                    name='password'
                    variant='outlined'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton edge="start">
                            <AiOutlineLock />
                          </IconButton>
 </InputAdornment>
                      ),
                    }}
                    sx={{
                      width: '100%',
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    mb: { xs: 3, xl: 4 },
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox color='primary' sx={{ ml: -3 }} />
                    <Box
                      aria-labelledby="rememberMe"
                      component="span"
                      sx={{
                        color: 'rgb(119, 125, 134)',
                        fontFamily: '"Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '20px',
                      }}
                    >
                      <IntlMessages id='common.rememberMe' />
                    </Box>
                  </Box>
                  <Box
                    component='span'
                    sx={{
                      color: 'rgba(47, 198, 246, 0.87)',
                      fontFamily: 'Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontWeight: 530,
                      fontSize: '13px',
                      lineHeight: '17px',
                      cursor: 'pointer',
                      textAlign: 'right',
                      marginRight: -1,
                    }}
                    onClick={onGoToForgetPassword}
                  >
                    <IntlMessages id='common.forgetPassword' />
                  </Box>
                </Box>

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
                    type='submit'
                    disabled={isSubmitting}
                    sx={{
                      minWidth: 130,
                      fontFamily: 'Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontWeight: 500,
                      fontSize: '17px',
                      lineHeight: '23px',
                      color: 'rgb(255, 255, 255)',
                      textTransform: 'capitalize',
                      padding: '10px 16px 8px',
                      backgroundColor: 'rgb(157, 207, 0)',
                      '&:hover': {
                        backgroundColor: 'rgb(157, 207, 0.2)',
                      },
                    }}
                  >
                    <IntlMessages id='common.login' />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>

        <Box
          sx={{
            color: 'grey.700',
          }}
        >
          {/* <span style={{ marginRight: 4 }}>
            <IntlMessages id='common.dontHaveAccount' />
          </span> */}
          <Box
            component='span'
            sx={{
              fontFamily: 'Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '20px',
              color: 'rgb(119, 125, 134)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '5vh',
              marginBottom: 10,
              '& a': {
                color: (theme) => theme.palette.primary.main,
                textDecoration: 'none',
              },
            }}
          >
            <span style={{ marginRight: 4, color: 'rgb(152, 152, 152)' }}>
              <IntlMessages id='common.dontHaveAccount' />
            </span>
            <Link to='/signup'>
              <IntlMessages id='common.signup' />
            </Link>
          </Box>
        </Box>

        <AppInfoView />
      </Box>
    </AuthWrapper>
  );
};

export default SigninJwtAuth;
