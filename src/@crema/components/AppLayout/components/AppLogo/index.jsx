import React from 'react';
import { Box } from '@mui/material';
import { useThemeContext } from '@crema/context/AppContextProvider/ThemeContextProvider';
import Logo from '../../../../../assets/icon/foodlogo.jpg';
import LogoText from '../../../../../assets/icon/logo_text.svg';

const AppLogo = () => {
  const { theme } = useThemeContext();
  return (
    <Box
      sx={{
        height: { xs: 56, sm: 40 },
        // padding: 2.5,
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        justifyContent: 'center',
        '& img': {
          maxHeight: { xs: 40, sm: 75 },
        },
      }}
      className="app-logo"
    >
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          '& img': {
            height: { xs: 25, sm: 40 },
          },
        }}
      >      <img src={Logo} alt={Logo} />

      </Box>
    </Box>
  );
};

export default AppLogo;
