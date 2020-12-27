import {authRole} from '../shared/constants/AppConst';
const user = sessionStorage.getItem('currentUser');
const routesConfig = [
  {
    id: 'app',
    title: 'Application',
    messageId: 'sidebar.application',
    type: 'group',
    children: [
      {
        id: 'dashboards',
        title: 'Dashboards',
        messageId: 'sidebar.app.dashboard',
        type: 'collapse',
        icon: 'dashboard',
        children: [
          {
            id: 'e-commerce',
            title: 'Survey',
            messageId: 'sidebar.app.dashboard.eCommerce',
            type: 'item',
            url: '/dashboards/survey',
          },
        ],
      },
    ],
  },
  {
    id: 'pages',
    title: 'Pages',
    messageId: 'sidebar.pages',
    type: 'group',
    children: [
      {
        id: 'surveys',
        title: 'Surveys',
        messageId: 'sidebar.pages.surveys',
        type: 'collapse',
        icon: 'insert_chart',
        children: [
          {
            id: 'surveys_list',
            title: 'List Survey',
            messageId: 'sidebar.pages.surveys.list',
            type: 'item',
            url: '/admin/app/surveys/list',
          },
          {
            id: 'surveys_create',
            title: 'Create Survey',
            messageId: 'sidebar.pages.surveys.create',
            type: 'item',
            url: '/admin/app/surveys/create',
          },
        ],
      },
      {
        id: 'reports',
        title: 'Reports',
        messageId: 'sidebar.pages.reports',
        type: 'collapse',
        icon: 'insert_chart',
        children: [
          {
            id: 'reports_default',
            title: 'Default',
            messageId: 'sidebar.pages.reports.default',
            type: 'item',
            url: '/admin/app/reports/default',
          },
          // {
          //   id: 'reports_analytics',
          //   title: 'Analytics',
          //   messageId: 'sidebar.pages.reports.analytics',
          //   type: 'item',
          //   url: '/admin/app/reports/analytics',
          // },
        ],
      },
      {
        id: 'users',
        title: 'Users',
        messageId: 'sidebar.pages.users',
        type: 'collapse',
        icon: 'control_camera',
        children: [
          {
            id: 'list',
            title: 'List',
            messageId: 'sidebar.pages.users.list',
            type: 'item',
            url: '/admin/app/users/list',
          },
          {
            id: 'create',
            title: 'Create',
            messageId: 'sidebar.pages.users.create',
            type: 'item',
            url: '/admin/app/users/create',
          },
        ],
      },

      {
        id: 'profile',
        title: 'Profile',
        messageId: 'sidebar.pages.profile',
        type: 'collapse',
        icon: 'control_camera',
        children: [
          {
            id: 'general',
            title: 'General',
            messageId: 'sidebar.pages.profile.general',
            type: 'item',
            url: '/admin/app/profile/general/general',
          },
          {
            id: 'security',
            title: 'Security',
            messageId: 'sidebar.pages.profile.security',
            type: 'item',
            url: '/admin/app/profile/general/security',
          },
        ],
      },
      {
        id: 'multi-level',
        title: 'Multi Level',
        messageId: 'sidebar.multiLevel',
        type: 'collapse',
        icon: 'menu',
        children: [
          {
            id: 'level-1',
            title: 'Level 1',
            messageId: 'sidebar.multiLevel.level1',
            type: 'item',
            url: '/menu-level-1',
          },
          {
            id: 'level-2',
            title: 'Level 1',
            messageId: 'sidebar.multiLevel.level1',
            type: 'collapse',
            children: [
              {
                id: 'level-2-1',
                title: 'Level 2',
                messageId: 'sidebar.multiLevel.level2',
                type: 'item',
                url: '/menu-level-2-1',
              },
              {
                id: 'level-2-2',
                title: 'Level 2',
                messageId: 'sidebar.multiLevel.level2',
                type: 'item',
                url: '/menu-level-2-2',
              },
            ],
          },
          {
            id: 'level-3',
            title: 'Level 1',
            messageId: 'sidebar.multiLevel.level1',
            type: 'collapse',
            children: [
              {
                id: 'level-3-1',
                title: 'Level 2',
                messageId: 'sidebar.multiLevel.level2',
                type: 'collapse',
                children: [
                  {
                    id: 'level-3-1-1',
                    title: 'Level 3',
                    messageId: 'sidebar.multiLevel.level3',
                    type: 'item',
                    url: '/menu-level-3-1-1',
                  },
                  {
                    id: 'level-3-1-2',
                    title: 'Level 3',
                    messageId: 'sidebar.multiLevel.level3',
                    type: 'item',
                    url: '/menu-level-3-1-2',
                  },
                ],
              },
              {
                id: 'level-3-2',
                title: 'Level 2',
                messageId: 'sidebar.multiLevel.level2',
                type: 'collapse',
                children: [
                  {
                    id: 'level-3-2-1',
                    title: 'Level 3',
                    messageId: 'sidebar.multiLevel.level3',
                    type: 'item',
                    url: '/menu-level-3-2-1',
                  },
                  {
                    id: 'level-3-2-2',
                    title: 'Level 3',
                    messageId: 'sidebar.multiLevel.level3',
                    type: 'item',
                    url: '/menu-level-3-2-2',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
export default routesConfig;
