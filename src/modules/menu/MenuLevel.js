import React from 'react';
import {Box} from '@material-ui/core';
import InjectMassage from '../../@apps/utility/IntlMessages';
import AppAnimate from '../../@apps/core/AppAnimate';

const MenuLevel = () => {
  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box
        fontSize={20}
        component='h3'
        display='flex'
        alignItems='center'
        justifyContent='center'>
        <InjectMassage id='sidebar.multiLevel' />
      </Box>
    </AppAnimate>
  );
};

export default MenuLevel;
