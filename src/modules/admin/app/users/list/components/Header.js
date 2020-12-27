import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {Grid, Typography, Button} from '@material-ui/core';
import getLabel from '../../../../../../@apps/utility/getLabel';
import {Link as RouterLink} from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {},
}));

const Header = (props) => {
  const {className, ...rest} = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems='flex-end' container justify='space-between' spacing={3}>
        <Grid item>
          <Typography component='h2' gutterBottom variant='overline'>
            Management
          </Typography>
          <Typography component='h1' variant='h3'>
            {getLabel('users')}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color='primary'
            variant='contained'
            component={RouterLink}
            to={`${process.env.PUBLIC_URL}/admin/app/users/create`}>
            {getLabel('adduser')}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
