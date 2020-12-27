import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {makeStyles} from '@material-ui/styles';
import {Tabs, Tab, Divider, colors} from '@material-ui/core';

import Page from '../../../../@apps/core/Components/Page';
// import {
//   Header,
//   General,
//   Security
// } from './components';

import Header from './components/Header/Header';
import General from './components/General/General';
import Security from './components/Security/Security';
import getLabel from '../../../../@apps/utility/getLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    margin: '0',
    padding: theme.spacing(3),
  },
  tabs: {
    marginTop: theme.spacing(3),
  },
  divider: {
    backgroundColor: colors.grey[300],
  },
  content: {
    marginTop: theme.spacing(3),
  },
}));

const ProfileView = (props) => {
  const location = useLocation();
  const navigate = useHistory();

  console.log('location: ' + JSON.stringify(location));

  const classes = useStyles();
  const path = location.pathname;
  const tab = path.substring(path.lastIndexOf('/') + 1);

  console.log('tab: ' + tab);

  const handleTabsChange = (event, value) => {
    //navigate(`${process.env.PUBLIC_URL}/app/profile/${value}`, { replace: true });
    navigate.push(
      `${process.env.PUBLIC_URL}/admin/app/profile/general/${value}`,
    );
  };

  const tabs = [
    {value: 'general', label: 'General'},
    {value: 'security', label: 'Security'},
  ];

  return (
    <Page className={classes.root} title={getLabel('profile')}>
      <Header />
      <Tabs
        className={classes.tabs}
        onChange={handleTabsChange}
        scrollButtons='auto'
        value={tab}
        variant='scrollable'>
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      <Divider className={classes.divider} />
      <div className={classes.content}>
        {tab === 'general' && <General />}
        {tab === 'security' && <Security />}
      </div>
    </Page>
  );
};

export default ProfileView;
