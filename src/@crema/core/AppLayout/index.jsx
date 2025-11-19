// import React, { useEffect } from 'react';
// import { useUrlSearchParams } from 'use-url-search-params';
// import AppContentView from '@crema/components/AppContentView';
// import generateRoutes from '@crema/helpers/RouteGenerator';
// import { Layouts } from '@crema/components/AppLayout';
// import { useAuthUser } from '@crema/hooks/AuthHooks';
// import { useLayoutActionsContext, useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
// import { useSidebarActionsContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
// import { anonymousStructure, authorizedStructure, publicStructure } from '../AppRoutes';
// import { useRoutes } from 'react-router-dom';
// import routesConfig from '../AppRoutes/routeConfig';
// import { initialUrl } from '@crema/constants/AppConst';

// const AppLayout = () => {
//   const { navStyle } = useLayoutContext();

//   const { user, isAuthenticated } = useAuthUser();
//   const { updateNavStyle } = useLayoutActionsContext();
//   const { updateMenuStyle, setSidebarBgImage } = useSidebarActionsContext();
//   const AppLayout = Layouts[navStyle];
//   const [params] = useUrlSearchParams();

//   const initURL = params?.redirect ? params?.redirect : initialUrl;
//   const loginUrl = `/signin?redirect=${window.location.pathname}`;
//   const generatedRoutes = generateRoutes({
//     isAuthenticated: isAuthenticated,
//     userRole: user?.role,
//     anonymousStructure: anonymousStructure(initURL),
//     authorizedStructure: authorizedStructure(loginUrl),
//     publicStructure: publicStructure(initURL),
//   });

//   const routes = useRoutes(generatedRoutes);
//   useEffect(() => {
//     if (params.layout) updateNavStyle(params.layout);
//     if (params.menuStyle) updateMenuStyle(params.menuStyle);
//     if (params.sidebarImage) setSidebarBgImage(true);
//   }, [params.layout, params.menuStyle, params.sidebarImage, updateNavStyle, updateMenuStyle, setSidebarBgImage]);

//   return (
//     <>
//       {isAuthenticated ? <AppLayout routes={routes} routesConfig={routesConfig} /> : <AppContentView routes={routes} />}
//     </>
//   );
// };

// export default AppLayout;
import React, { useEffect, useState } from 'react';
import { useUrlSearchParams } from 'use-url-search-params';
import AppContentView from '@crema/components/AppContentView';
import generateRoutes from '@crema/helpers/RouteGenerator';
import { Layouts } from '@crema/components/AppLayout';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import {
  useLayoutActionsContext,
  useLayoutContext,
} from '@crema/context/AppContextProvider/LayoutContextProvider';
import { useSidebarActionsContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import {
  anonymousStructure,
  authorizedStructure,
  publicStructure,
} from '../AppRoutes';
import { useRoutes } from 'react-router-dom';
import routesConfig from '../AppRoutes/routeConfig';
import { initialUrl, adminInitialUrl } from '@crema/constants/AppConst';
import Standard from '@crema/components/AppLayout/Standard';
// import { SuperAdminConfig } from '../AppRoutes/SuperAdminRoutes';
import { getInitialUrlByRole } from '../../constants/AppConst';

const AppLayout = () => {
  const { navStyle } = useLayoutContext();
  const { user: authUser, isAuthenticated, isLoading } = useAuthUser(); // Authenticated user
  const { updateNavStyle } = useLayoutActionsContext();
  const { updateMenuStyle, setSidebarBgImage } = useSidebarActionsContext();
  const [params] = useUrlSearchParams();
  console.log("a",authUser)
  const loginuser = authUser?.role?.[0];
 console.log("login",authUser)
    // Get initial URL based on user role
    const roleBasedInitialUrl = getInitialUrlByRole(loginuser);
    const initURL = params?.redirect ? params?.redirect : roleBasedInitialUrl;
    const loginUrl = `/signin`;

  // Log user and role for debugging


  // Determine if the user is an admin
  // user?.role?.[0]?.toLowerCase()
  const isAdmin = authUser?.role?.[0]?.toLowerCase() === 'admin';
console.log(isAdmin)
  // Check if the current route belongs to SuperAdminConfig
  // const isEcommAdminRoute = SuperAdminConfig.some((route) =>
  //   window.location.pathname.startsWith(route.path)
  // );

  // Determine the layout to use
  const SelectedLayout =
      isAdmin ? Standard : Layouts[navStyle];

  const generatedRoutes = generateRoutes({
    isAuthenticated,
    userRole: authUser?.role,
    anonymousStructure: anonymousStructure(initURL),
    authorizedStructure: authorizedStructure(loginUrl),
    publicStructure: publicStructure(initURL),
  });

  const routes = useRoutes(generatedRoutes);

  useEffect(() => {
    if (params.layout) updateNavStyle(params.layout);
    if (params.menuStyle) updateMenuStyle(params.menuStyle);
    if (params.sidebarImage) setSidebarBgImage(true);
  }, [
    params.layout,
    params.menuStyle,
    params.sidebarImage,
    updateNavStyle,
    updateMenuStyle,
    setSidebarBgImage,
  ]);

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading indicator while user info is fetched
  }

  return (
    <>
      {isAuthenticated ? (
        <SelectedLayout routes={routes} routesConfig={routesConfig} />
      ) : (
        <AppContentView routes={routes} />
      )}
    </>
  );
};

export default AppLayout;
