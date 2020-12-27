import React from 'react';
import {makeStyles} from '@material-ui/styles';

import Page from '../../../../../@apps/core/Components/Page';
import Header from './components/Header';
import AddUser from './components/AddUser';

import getLabel from '../../../../../@apps/utility/getLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3),
  },
  addUser: {
    marginTop: theme.spacing(3),
  },
  actions: {
    marginTop: theme.spacing(3),
  },
}));

const CreateUserView = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title={getLabel('add_user')}>
      <Header className={classes.header} />
      <AddUser className={classes.addUser} />
    </Page>
  );
};

export default CreateUserView;
