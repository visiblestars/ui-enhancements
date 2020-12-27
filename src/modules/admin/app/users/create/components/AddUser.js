import React from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  makeStyles,
  Card,
  CardContent,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {useNavigate, useHistory} from 'react-router-dom';
import UserService from '../../../../../../@apps/services/apis/survey/user.service';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {},
  alert: {
    marginBottom: theme.spacing(3),
  },
  formGroup: {
    marginBottom: theme.spacing(3),
  },
  fieldGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  rowField: {
    '& + &': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const AddUser = (props) => {
  const {className, ...rest} = props;
  const classes = useStyles();
  //let navigate = useNavigate();
  let history = useHistory();
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Formik
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
            role: 'None',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .min(2, 'Too Short!')
              .max(50, 'Too Long!')
              .email('Invalid email')
              .required('Email is required'),
            firstName: Yup.string()
              .min(2, 'Too Short!')
              .max(20, 'Too Long!')
              .required('First name is required'),
            lastName: Yup.string()
              .min(2, 'Too Short!')
              .max(20, 'Too Long!')
              .required('Last name is required'),
            role: Yup.string().matches('^((?!None).)*$', 'Role is required'),
            password: Yup.string()
              .min(2, 'Too Short!')
              .max(20, 'Too Long!')
              .required('Password is required'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password')], 'Passwords do not match')
              .required('Confirm password is required'),
          })}
          onSubmit={(values, actions) => {
            UserService.createUser(
              values.email,
              values.firstName,
              values.lastName,
              values.role,
              values.password,
            ).then(
              () => {
                history.push(`${process.env.PUBLIC_URL}/app/management/users`);
                // navigate(`${process.env.PUBLIC_URL}/app/management/users`, {
                //   replace: true,
                // });
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
              {status && status.error && (
                <Alert variant='outlined' severity='error'>
                  {status.error}
                </Alert>
              )}
              <div className={classes.formGroup}>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label='Email'
                  margin='normal'
                  name='email'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type='text'
                  value={values.email}
                  variant='outlined'
                />
              </div>
              <div className={classes.formGroup}>
                <div className={classes.fieldGroup}>
                  <TextField
                    error={Boolean(touched.firstName && errors.firstName)}
                    fullWidth
                    helperText={touched.firstName && errors.firstName}
                    label='First name'
                    margin='normal'
                    name='firstName'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type='text'
                    value={values.firstName}
                    variant='outlined'
                    className={classes.rowField}
                  />
                  <TextField
                    error={Boolean(touched.lastName && errors.lastName)}
                    fullWidth
                    helperText={touched.lastName && errors.lastName}
                    label='Last name'
                    margin='normal'
                    name='lastName'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type='text'
                    value={values.lastName}
                    variant='outlined'
                    className={classes.rowField}
                  />
                </div>
              </div>
              <div className={classes.formGroup}>
                <Select
                  error={Boolean(touched.role && errors.role)}
                  fullWidth
                  label='Role'
                  name='role'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.role}
                  variant='outlined'
                  className={classes.selectEmpty}>
                  <MenuItem value='None'>
                    <em>Please select Role</em>
                  </MenuItem>
                  <MenuItem value='ROLE_USER'>ROLE_USER</MenuItem>
                  <MenuItem value='ROLE_REPORT'>ROLE_REPORT</MenuItem>
                </Select>
              </div>
              <div className={classes.formGroup}>
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
              </div>
              <div className={classes.formGroup}>
                <TextField
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword,
                  )}
                  fullWidth
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  label='Confirm password'
                  margin='normal'
                  name='confirmPassword'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type='password'
                  value={values.confirmPassword}
                  variant='outlined'
                />
              </div>

              <div className={classes.actions}>
                <Button
                  color='primary'
                  disabled={isSubmitting}
                  type='submit'
                  variant='contained'
                  className={classes.rowField}>
                  Submit
                </Button>
                <Button
                  color='primary'
                  disabled={isSubmitting}
                  type='button'
                  variant='contained'
                  onClick={() => {
                    //navigate('app/management/users')
                    history.push('app/management/users');
                  }}
                  className={classes.rowField}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default AddUser;
