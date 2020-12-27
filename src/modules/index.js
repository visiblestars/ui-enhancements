import React from 'react';
import {Redirect} from 'react-router-dom';

import {createRoutes} from '../@apps/utility/Utils';
import {dashBoardConfigs} from './dashboard';
import {muiComponentConfigs} from './muiComponents';
import {thirdPartyConfigs} from './thirdParty';
import {userPagesConfig} from './userPages';
import {extraPagesConfigs} from './extraPages';
import {errorPagesConfigs} from './errorPages';
import {authRouteConfig} from './auth';
import {initialUrl} from '../shared/constants/AppConst';
import {menuLevelConfig} from './menu';
import {adminPagesConfigs} from './admin';

const routeConfigs = [
  ...authRouteConfig,
  ...dashBoardConfigs,
  ...muiComponentConfigs,
  ...thirdPartyConfigs,
  ...userPagesConfig,
  ...extraPagesConfigs,
  ...errorPagesConfigs,
  ...menuLevelConfig,
  ...adminPagesConfigs,
];

const routes = [
  ...createRoutes(routeConfigs),
  {
    path: '/',
    exact: true,
    component: () => <Redirect to={initialUrl} />,
  },
  {
    component: () => <Redirect to='/error-pages/error-404' />,
  },
];

export default routes;
