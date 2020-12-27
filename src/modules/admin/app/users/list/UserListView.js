import React from 'react';
import {makeStyles} from '@material-ui/styles';
import Page from '../../../../../@apps/core/Components/Page';
import Header from './components/Header';
import Results from './components/Results';
import Filter from './components/Filter';

import getLabel from '../../../../../@apps/utility/getLabel';

import {Provider as UsersContextProvider} from './context/UsersContext';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3),
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  filter: {
    marginTop: theme.spacing(3),
  },
  results: {
    marginTop: theme.spacing(6),
  },
}));

const UserListView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title={getLabel('users')}>
      <Header className={classes.header} />
      <UsersContextProvider>
        <Filter className={classes.filter} />
        <Results className={classes.results} />
      </UsersContextProvider>
    </Page>
  );
};

export default UserListView;
