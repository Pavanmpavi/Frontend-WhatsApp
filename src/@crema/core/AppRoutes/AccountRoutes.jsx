import React from 'react';
import { RoutePermittedRole } from '@crema/constants/AppEnums';
import Account from '../../../modules/account/MyProfile';

export const accountPagesConfigs = [
  {
    permittedRole: [RoutePermittedRole.User,RoutePermittedRole.Admin],
    path: '/my-profile',
    element: <Account />,
  },
];
