import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Select,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {DropzoneArea} from 'material-ui-dropzone';
import {useHistory} from 'react-router-dom';
import SurveyService from '../../../../../@apps/services/apis/survey/survey.service';

const useStyles = makeStyles((theme) => ({
  previewChip: {
    minWidth: 160,
    maxWidth: 210,
  },
}));

const AddSurvey = () => {
  const classes = useStyles();
  //let navigate = useNavigate();
  let navigate = useHistory();
  const [questions, setQuestions] = useState(null);
  const [users, setUsers] = useState(null);
  const expire_on = getExpireOn();

  function getExpireOn() {
    let dt = new Date();
    dt.setHours(dt.getHours() + 1);
    let dd = dt.getDate();
    let mm = dt.getMonth() + 1;
    let yyyy = dt.getFullYear();
    let h = dt.getHours();
    let m = dt.getMinutes();

    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    if (h < 10) {
      h = `0${h}`;
    }
    if (m < 10) {
      m = `0${m}`;
    }
    let result = `${yyyy}-${mm}-${dd}T${h}:${m}`;
    return result;
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      height='100%'
      justifyContent='center'>
      <Container maxWidth='sm'>
        <Formik
          initialValues={{
            questions: null,
            users: null,
            title_en: '',
            category: 'None',
            expire_on: expire_on,
          }}
          validationSchema={Yup.object().shape({
            title_en: Yup.string()
              .max(255)
              .required('Survey Title is required'),
            category: Yup.string()
              .matches('^((?!None).)*$')
              .required('Survey Category is required'),
            expire_on: Yup.string().required('Expire On is required'),
          })}
          onSubmit={(values, actions) => {
            values.questions =
              Array.isArray(questions) && questions.length > 0
                ? questions[0]
                : null;
            if (!values.questions) {
              actions.setStatus({error: 'Please upload Questions'});
              actions.setSubmitting(false);
              return;
            }
            values.users =
              Array.isArray(users) && users.length > 0 ? users[0] : null;
            if (!values.users) {
              actions.setStatus({error: 'Please upload Users'});
              actions.setSubmitting(false);
              return;
            }
            SurveyService.createSurvey(
              values.title_en,
              '',
              values.category,
              values.expire_on,
              values.questions,
              values.users,
            ).then(
              () => {
                navigate.push('localhost:3000/admin/app/surveys/list');
                //navigate.replace(`${process.env.PUBLIC_URL}/admin/app/surveys/list`)
                //navigate(`${process.env.PUBLIC_URL}/admin/app/surveys/list`, { replace: true });
              },
              (error) => {
                actions.setStatus({error: error});
                actions.setSubmitting(false);
              },
            );
          }}>
          {({
            errors,
            status,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <Typography color='textPrimary' variant='h2'>
                  Create Survey
                </Typography>
                <Typography color='textSecondary' gutterBottom variant='body2'>
                  Add a new Survey
                </Typography>
              </Box>
              {status && status.error && (
                <Box my={2}>
                  <Alert variant='outlined' severity='error'>
                    {status.error}
                  </Alert>
                </Box>
              )}
              <Box my={2}>
                <TextField
                  error={Boolean(touched.title_en && errors.title_en)}
                  fullWidth
                  helperText={touched.title_en && errors.title_en}
                  label='Survey Title'
                  margin='normal'
                  name='title_en'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type='text'
                  value={values.title_en}
                  variant='outlined'
                />
              </Box>
              <Box my={2}>
                <Select
                  error={Boolean(touched.category && errors.category)}
                  fullWidth
                  label='Category'
                  name='category'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.category}
                  variant='outlined'
                  className={classes.selectEmpty}>
                  <MenuItem value='None'>
                    <em>Please select Category</em>
                  </MenuItem>
                  <MenuItem value='RETAIL'>Retail</MenuItem>
                  <MenuItem value='CORPORATE'>Corporate</MenuItem>
                  <MenuItem value='REMITTANCE'>Remittance</MenuItem>
                </Select>
              </Box>
              <Box my={2}>
                <DropzoneArea
                  acceptedFiles={[
                    '.csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values',
                  ]}
                  showPreviews={true}
                  showPreviewsInDropzone={false}
                  useChipsForPreview
                  previewGridProps={{container: {spacing: 1, direction: 'row'}}}
                  previewChipProps={{classes: {root: classes.previewChip}}}
                  previewText='Survey Questions'
                  onChange={(files) => setQuestions(files)}
                  maxFileSize={1000000}
                  filesLimit={1}
                  dropzoneText={'Please upload Survey Questions'}
                />
              </Box>
              <Box my={2}>
                <DropzoneArea
                  acceptedFiles={[
                    '.csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values',
                  ]}
                  showPreviews={true}
                  showPreviewsInDropzone={false}
                  useChipsForPreview
                  previewGridProps={{container: {spacing: 1, direction: 'row'}}}
                  previewChipProps={{classes: {root: classes.previewChip}}}
                  previewText='Survey Users'
                  onChange={(files) => setUsers(files)}
                  maxFileSize={1000000}
                  filesLimit={1}
                  dropzoneText={'Please upload Survey Users'}
                />
              </Box>
              <Box my={2}>
                <TextField
                  name='expire_on'
                  label='Expire On'
                  type='datetime-local'
                  className={classes.textField}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.expire_on}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box my={2}>
                <Button
                  color='primary'
                  disabled={isSubmitting}
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'>
                  Submit
                </Button>
              </Box>
              <Box my={2}>
                <Button
                  color='primary'
                  disabled={isSubmitting}
                  fullWidth
                  size='large'
                  type='button'
                  variant='contained'
                  onClick={() => {
                    //navigate.replace(`${process.env.PUBLIC_URL}/admin/app/surveys/list`)
                    navigate.push('localhost:3000/admin/app/surveys/list');
                    //navigate.push(`${process.env.PUBLIC_URL}/admin/app/surveys/list`)
                  }}>
                  Cancel
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default AddSurvey;
