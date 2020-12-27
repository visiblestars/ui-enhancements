import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  Typography,
  IconButton,
  makeStyles,
  CardHeader,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core';
import TotalUsersIcon from '@material-ui/icons/QuestionAnswer';
import ExpireIcon from '@material-ui/icons/AccessTime';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DownloadIcon from '@material-ui/icons/ArrowDownward';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
}));

const SurveyCard = ({
  downloadSurveyUsers,
  deleteSurvey,
  showStatus,
  className,
  survey,
  ...rest
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        avatar={
          <Avatar
            src='static/images/surveys/survey.png'
            aria-label='recipe'
            className={classes.avatar}
          />
        }
        action={
          <Box>
            <IconButton onClick={handleClick} aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem
                onClick={() => {
                  downloadSurveyUsers(survey.surveyId);
                  handleClose();
                }}>
                <ListItemIcon>
                  <DownloadIcon fontSize='small' />
                </ListItemIcon>
                <Typography variant='inherit'>EXPORT SURVEY LINKS</Typography>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  deleteSurvey(survey.surveyId);
                  handleClose();
                }}>
                <ListItemIcon>
                  <DeleteIcon fontSize='small' />
                </ListItemIcon>
                <Typography variant='inherit'>DELETE</Typography>
              </MenuItem>
            </Menu>
          </Box>
        }
        title={survey.title}
        subheader={survey.category}
      />
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify='space-between' spacing={2}>
          <Grid className={classes.statsItem} item>
            <ExpireIcon className={classes.statsIcon} color='action' />
            <Typography color='textSecondary' display='inline' variant='body2'>
              Expire on {survey.expireOn}
            </Typography>
          </Grid>

          <Grid className={classes.statsItem} item>
            <TotalUsersIcon className={classes.statsIcon} color='action' />
            <Typography color='textSecondary' display='inline' variant='body2'>
              {survey.totalQuestions} Questions
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

SurveyCard.propTypes = {
  className: PropTypes.string,
  survey: PropTypes.object.isRequired,
};

export default SurveyCard;
