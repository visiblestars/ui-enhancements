import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {Drawer, Grid, Typography, Button, Hidden} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
// import {UsersContext} from '../context';
import {Context} from '../context/UsersContext';
import getLabel from '../../../../../../@apps/utility/getLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ResultActions = (props) => {
  const {className, ...rest} = props;

  const classes = useStyles();
  const usersContext = useContext(Context);
  const {selectedUsers, onMarkActive, onMarkInActive} = usersContext;

  const open = selectedUsers.length > 0;

  return (
    <Drawer
      anchor='bottom'
      open={open}
      // eslint-disable-next-line react/jsx-sort-props
      PaperProps={{elevation: 1}}
      variant='persistent'>
      <div {...rest} className={clsx(classes.root, className)}>
        <Grid alignItems='center' container spacing={2}>
          <Hidden smDown>
            <Grid item md={3}>
              <Typography color='textSecondary' variant='subtitle1'>
                {selectedUsers.length} selected
              </Typography>
            </Grid>
          </Hidden>
          <Grid item md={6} xs={12}>
            <div className={classes.actions}>
              <Button onClick={onMarkActive}>
                <CheckIcon className={classes.buttonIcon} />
                {getLabel('mark_active')}
              </Button>
              <Button onClick={onMarkInActive}>
                <CloseIcon className={classes.buttonIcon} />
                {getLabel('mark_inactive')}
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </Drawer>
  );
};

ResultActions.propTypes = {
  className: PropTypes.string,
};

export default ResultActions;
