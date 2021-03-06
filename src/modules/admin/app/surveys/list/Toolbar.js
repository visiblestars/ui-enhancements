import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
} from '@material-ui/core';
import {Search as SearchIcon} from 'react-feather';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Toolbar = ({onChangeSearchTitle, className, ...rest}) => {
  const classes = useStyles();
  //const navigate = useNavigate();
  const history = useHistory();
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display='flex' justifyContent='flex-end'>
        <Button
          color='primary'
          variant='contained'
          onClick={() => {
            history.push(`${process.env.PUBLIC_URL}/admin/app/surveys/create`);
            //navigate(`${process.env.PUBLIC_URL}/app/surveys/create`)
          }}>
          Create Survey
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SvgIcon fontSize='small' color='action'>
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder='Search Survey'
                variant='outlined'
                onChange={onChangeSearchTitle}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
