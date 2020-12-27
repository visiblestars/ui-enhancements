import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {Card, CardContent, Avatar, Typography} from '@material-ui/core';
import getLabel from '../../../../../../../../@apps/utility/getLabel';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlgin: 'center',
  },
  name: {
    marginTop: theme.spacing(1),
  },
  avatar: {
    height: 100,
    width: 100,
  },
  removeBotton: {
    width: '100%',
  },
}));
const profile = {
  avatar: 'static/images/avatars/user_avatar.svg',
};
const ProfileDetails = (props) => {
  const {user, className, ...rest} = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <Avatar className={classes.avatar} src={profile.avatar} />
        <Typography className={classes.name} gutterBottom variant='h3'>
          {user && user.firstName} {user && user.lastName}
        </Typography>
        <Typography color='textSecondary' variant='body1'>
          {user && user.email}
        </Typography>
        <Typography color='textSecondary' variant='body2'>
          {user && `${getLabel('role')}: ${getLabel(user.role)}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired,
};

export default ProfileDetails;
