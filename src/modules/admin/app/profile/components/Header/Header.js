import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {Typography} from '@material-ui/core';
import getLabel from '../../../../../../@apps/utility/getLabel';

const useStyles = makeStyles(() => ({
  root: {},
}));

const Header = (props) => {
  const {className, ...rest} = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography component='h2' gutterBottom variant='overline'>
        {getLabel('profile')}
      </Typography>
      <Typography component='h1' variant='h3'>
        {getLabel('personal_info')}
      </Typography>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
