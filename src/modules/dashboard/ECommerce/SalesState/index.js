import React from 'react';
import {Box, Typography} from '@material-ui/core';
import AppCard from '../../../../@apps/core/AppCard';
import {useIntl} from 'react-intl';

const SalesState = (props) => {
  const {bgColor, icon, type, value, langId} = props.state;
  const {messages} = useIntl();
  return (
    <AppCard
      height={1}
      style={{backgroundColor: bgColor}}
      className='card-hover'>
      <Box display='flex' alignItems='center'>
        <Box mr={3} clone alignSelf='flex-start'>
          <img src={icon} alt='icon' />
        </Box>
        <Box flex={1} color='white'>
          <Typography component='h3' variant='inherit' color='inherit'>
            {value}
          </Typography>
          <Box mt={0.5} component='p'>
            {messages[langId]}
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default SalesState;
