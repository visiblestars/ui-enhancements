import React from 'react';
import AppCard from '../../../../@apps/core/AppCard';
import {useIntl} from 'react-intl';
import {Box, makeStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AppCircularProgress from '../../../../@apps/core/AppCircularProgress';

const Application = (props) => {
  const useStyles = makeStyles((theme) => ({
    textBase: {
      fontSize: 14,
    },
  }));

  const classes = useStyles(props);

  const {messages} = useIntl();
  return (
    <AppCard title={messages['eCommerce.application']} height={1}>
      <Box display='flex' flexDirection='column' justifyContent='center'>
        <Box mb={9}>
          <AppCircularProgress
            activeColor='#49BD65'
            pathColor='#F44D50'
            hidePercentage
            value={20}
            centerNode={
              <img
                alt='icon'
                style={{
                  borderRadius: '50%',
                  boxShadow: '0px 10px 20px rgba(160, 165, 185, 0.2)',
                }}
                src={'assets/images/dashboard/application_icon.png'}
              />
            }
            thickness={2}
          />
        </Box>
        <Box display='flex' justifyContent='center'>
          <Box mr={6} display='flex' alignItems='center'>
            <Box
              bgcolor='#49BD65'
              height={10}
              width={10}
              mr={2}
              borderRadius='50%'
            />
            <Typography className={classes.textBase}>Male</Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <Box
              bgcolor='#d6d6d6'
              height={10}
              width={10}
              mr={2}
              borderRadius='50%'
            />
            <Typography className={classes.textBase}>Female</Typography>
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default Application;
