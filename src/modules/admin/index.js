import React from 'react';
import {authRole} from '../../shared/constants/AppConst';

export const adminPagesConfigs = [
  {
    auth: authRole.user,
    routes: [
      {
        path: '/admin/app/reports/default',
        component: React.lazy(() =>
          import('./app/reports/default/SurveyUserListView'),
        ),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/admin/app/reports/analytics',
        component: React.lazy(() => import('./app/reports/analytics')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/admin/app/profile/general',
        component: React.lazy(() => import('./app/profile/ProfileView')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/admin/app/surveys/list/',
        component: React.lazy(() => import('./app/surveys/list')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/admin/app/surveys/create/',
        component: React.lazy(() => import('./app/surveys/create')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/admin/app/users/list',
        component: React.lazy(() => import('./app/users/list/UserListView')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/admin/app/users/create/',
        component: React.lazy(() =>
          import('./app/users/create/CreateUserView'),
        ),
      },
    ],
  },
];
