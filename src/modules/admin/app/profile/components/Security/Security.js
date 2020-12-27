import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Button,
  Divider,
  TextField,
  colors,
} from '@material-ui/core';
import getLabel from '../../../../../../@apps/utility/getLabel';
import * as Yup from 'yup';
import {Formik} from 'formik';
import UserService from '../../../../../../@apps/services/apis/survey/user.service';
import AuthService from '../../../../../../@apps/services/apis/survey/auth.service';
import Alert from '@material-ui/lab/Alert';
import SuccessSnackbar from './components/SuccessSnackbar/SuccessSnackbar';

const useStyles = makeStyles((theme) => ({
  root: {},
  saveButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900],
    },
  },
}));

const Security = (props) => {
  const {className, ...rest} = props;
  const currentUser = AuthService.getCurrentUser();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const classes = useStyles();
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords do not match')
            .required('Confirm password is required'),
        })}
        onSubmit={(values, actions) => {
          UserService.changePassword(currentUser.id, values.password).then(
            () => {
              setOpenSnackbar(true);
              actions.setSubmitting(false);
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
            <CardHeader title={getLabel('change_password')} />
            <Divider />
            <CardContent>
              {status && status.error && (
                <Alert variant='outlined' severity='error'>
                  {status.error}
                </Alert>
              )}
              <Grid container spacing={3}>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label='Password'
                    margin='normal'
                    name='password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type='password'
                    value={values.password}
                    variant='outlined'
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword,
                    )}
                    fullWidth
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    label='Confirm password'
                    margin='normal'
                    name='confirmPassword'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type='password'
                    value={values.confirmPassword}
                    variant='outlined'
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                color='primary'
                disabled={isSubmitting}
                type='submit'
                variant='contained'>
                Submit
              </Button>
            </CardActions>
          </form>
        )}
      </Formik>
      <SuccessSnackbar onClose={handleSnackbarClose} open={openSnackbar} />
    </Card>
  );
};

Security.propTypes = {
  className: PropTypes.string,
};

export default Security;
