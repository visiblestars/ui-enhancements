import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {useLocation} from 'react-router-dom';

import Page from '../../../../../@apps/core/Components/Page';
import Header from './components/Header';
import Results from './components/Results';
import Filter from './components/Filter';

import getLabel from '../../../../../@apps/utility/getLabel';

import {Provider as SurveyUsersContextProvider} from './context/SurveyUsersContext';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    margin: '0',
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

const SurveyUserListView = () => {
  const classes = useStyles();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const status = query.get('status') ? [query.get('status')] : [];
  return (
    <Page className={classes.root} title={getLabel('survey_respondents')}>
      <Header className={classes.header} />
      <SurveyUsersContextProvider status={status}>
        <Filter className={classes.filter} />
        <Results className={classes.results} />
      </SurveyUsersContextProvider>
    </Page>
  );
};

export default SurveyUserListView;
