import React from 'react';
import PropsTypes from 'prop-types';
import SidebarBGWrapper from './SidebarBGWrapper';
import SidebarWrapper from './SidebarWrapper';

const MainSidebar = ({ children, sxProps }) => {
  return (
    <SidebarWrapper className="app-sidebar" sxProps={sxProps}>
      <SidebarBGWrapper>{children}</SidebarBGWrapper>
    </SidebarWrapper>
  );
};

export default MainSidebar;
MainSidebar.propTypes = {
  children: PropsTypes.node,
  sxProps: PropsTypes.object,
};
