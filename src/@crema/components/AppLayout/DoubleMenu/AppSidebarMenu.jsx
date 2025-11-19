import React from 'react';
import Drawer from '@mui/material/Drawer';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import useStyles from './AppSidebarMenu.style';
import AppScrollbar from '../../AppScrollbar';
import MenuGroup from './SidebarMenu/MenuGroup';
import { useThemeContext } from '@crema/context/AppContextProvider/ThemeContextProvider';

const AppSidebarMenu = ({ variant = '', position = 'left', ...props }) => {
  const { themeMode } = useThemeContext();

  const classes = useStyles({ themeMode });
  let sidebarClasses = classes.sidebarStandard;
  return (
    <>
      <Drawer
        anchor={position}
        open={props.isNavCollapsed}
        onClose={props.toggleNavCollapsed}
        classes={{
          root: clsx(variant),
          paper: clsx(variant),
        }}
        sx={{ position: 'absolute', display: { lg: 'none', xs: 'block' } }}
      >
        <Box className={clsx(classes.appSidebarMenuRoot, 'app-sidebar-menu')}>
          <Box className={clsx(classes.sidebarBg, sidebarClasses)}>
            <AppScrollbar className={classes.drawerScrollAppSidebar}>
              <MenuGroup selectedMenu={props.selectedMenu} setSelectedMenu={props.setSelectedMenu} />
            </AppScrollbar>
          </Box>
        </Box>
      </Drawer>
      <Box
        height="100%"
        sx={{ display: { xs: 'none', md: 'block' } }}
        className={clsx(classes.appSidebarMenuRoot, 'app-sidebar-menu')}
      >
        <Box className={clsx(classes.sidebarBg, sidebarClasses)}>
          <AppScrollbar className={classes.scrollAppSidebar}>
            <MenuGroup selectedMenu={props.selectedMenu} setSelectedMenu={props.setSelectedMenu} />
          </AppScrollbar>
        </Box>
      </Box>
    </>
  );
};

export default AppSidebarMenu;

AppSidebarMenu.propTypes = {
  position: PropTypes.string,
  variant: PropTypes.string,
  selectedMenu: PropTypes.object,
  setSelectedMenu: PropTypes.func,
  toggleNavCollapsed: PropTypes.func,
  isNavCollapsed: PropTypes.bool,
};
