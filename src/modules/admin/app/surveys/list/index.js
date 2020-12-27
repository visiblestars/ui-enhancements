import React, {useEffect, useState} from 'react';
import {Box, Container, Grid, makeStyles} from '@material-ui/core';
import Page from '../../../../../@apps/core/Components/Page';
import Toolbar from './Toolbar';
import SurveyCard from './SurveyCard';
import SurveyService from '../../../../../@apps/services/apis/survey/survey.service';
import {Pagination} from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  surveyCard: {
    height: '100%',
  },
}));

const SurveyList = () => {
  const classes = useStyles();
  const [title, setTitle] = useState(null);
  const [surveys, setSurveys] = useState(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  //const pageSizes = [3, 6, 9, 12, 15];
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }

  function fetchSurveys() {
    const params = getRequestParams();
    SurveyService.fetchSurveys(params).then(
      (response) => {
        setSurveys(response.surveys);
        setCount(response.totalPages);
      },
      (error) => {
        console.log(JSON.stringify(error));
      },
    );
  }

  function downloadSurveyUsers(surveyId) {
    SurveyService.downloadSurveyUsers(surveyId);
  }

  function deleteSurvey(surveyId) {
    SurveyService.deleteSurvey(surveyId).then(
      (response) => {
        setMessage(response.message);
        fetchSurveys();
      },
      (error) => {
        console.log(JSON.stringify(error));
      },
    );
  }

  function handlePageChange(event, value) {
    setPage(value);
  }

  /*
  function handlePageSizeChange(event) {
    setPageSize(event.target.value);
  }
  */

  function getRequestParams() {
    let params = {};
    if (title) {
      params['title'] = title;
    }
    if (page) {
      params['page'] = page - 1;
    }
    if (pageSize) {
      params['size'] = pageSize;
    }
    return params;
  }

  function onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    setPage(0);
    setTitle(searchTitle);
  }

  useEffect(() => {
    fetchSurveys();
  }, [page, title]);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  return (
    <Page className={classes.root} title='Surveys'>
      {message && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='success'>
            {message}
          </Alert>
        </Snackbar>
      )}

      <Container maxWidth={false}>
        <Toolbar onChangeSearchTitle={onChangeSearchTitle} />
        <Box mt={3}>
          <Grid container spacing={3}>
            {surveys &&
              surveys.map((survey) => (
                <Grid item lg={4} md={6} xs={12} key={survey.surveyId}>
                  <SurveyCard
                    className={classes.surveyCard}
                    survey={survey}
                    downloadSurveyUsers={downloadSurveyUsers}
                    deleteSurvey={deleteSurvey}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
        <Box mt={3} display='flex' justifyContent='center'>
          {surveys && (
            <Pagination
              color='primary'
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              onChange={handlePageChange}
              size='small'
            />
          )}
        </Box>
      </Container>
    </Page>
  );
};

export default SurveyList;
