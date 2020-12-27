import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';
import UserService from '../../../../../../@apps/services/apis/survey/user.service';
import AuthService from '../../../../../../@apps/services/apis/survey/auth.service';
import ProfileDetails from './components/ProfileDetails/ProfileDetails';

const useStyles = makeStyles(() => ({
  root: {},
}));

const Profile = (props) => {
  const {className, ...rest} = props;

  const classes = useStyles();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser && currentUser.id) {
      UserService.getUser(currentUser.id).then(
        (response) => {
          setUser(response);
        },
        (error) => {
          console.log(JSON.stringify(error));
        },
      );
    } else {
      console.log('Error in getting current user.');
    }
  }, []);

  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}>
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <ProfileDetails user={user} />
      </Grid>
    </Grid>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
