import React from 'react';
import {Container, makeStyles} from '@material-ui/core';
import Page from '../../../../../@apps/core/Components/Page';
import AddSurvey from './AddSurvey';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  productCard: {
    height: '100%',
  },
}));

const CreateSurvey = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title='Create Survey'>
      <Container maxWidth={false}>
        <AddSurvey />
      </Container>
    </Page>
  );
};

export default CreateSurvey;
