import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {onGetECommerceData} from '../../../redux/actions';
import InfoView from '../../../@apps/core/InfoView';
import {Box, Grid} from '@material-ui/core';
import GridContainer from '../../../@apps/core/GridContainer';
import SalesState from './SalesState';
import SaleStatics from './SaleStatics';
import Application from './Application';
import AppAnimate from '../../../@apps/core/AppAnimate';

const ECommerce = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetECommerceData());
  }, [dispatch]);

  const ecommerceData = useSelector(({dashboard}) => dashboard.ecommerceData);
  const totalCompleted = {
      id: 1,
      type: 'Total Completed',
      value: ecommerceData ? ecommerceData.totalCompleted : 0,
      bgColor: '#0A8FDC',
      icon: 'assets/images/dashboard/1_sales_icon.png',
      langId: 'dashboard.totalCompleted',
    },
    totalPartial = {
      id: 2,
      type: 'Total Partial',
      value: ecommerceData ? ecommerceData.totalPartial : 0,
      bgColor: '#49BD65',
      icon: 'assets/images/dashboard/1_monthly_sales.png',
      langId: 'dashboard.totalPartial',
    },
    totalViewed = {
      id: 3,
      type: 'Total Viewed',
      value: ecommerceData ? ecommerceData.totalViewed : 0,
      bgColor: '#9E49E6',
      icon: 'assets/images/dashboard/1_revenue_icon.png',
      langId: 'dashboard.totalViewd',
    },
    totalNotViewed = {
      id: 4,
      type: 'Total NotViewed',
      value: ecommerceData ? ecommerceData.totalNotViewed : 0,
      bgColor: '#3A3849',
      icon: 'assets/images/dashboard/1_email_sent.png',
      langId: 'dashboard.totalNotviewd',
    };
  return (
    <>
      {ecommerceData ? (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <Box pt={{xl: 4}} clone>
            <GridContainer>
              <Grid item xs={12} sm={6} md={3}>
                <SalesState state={totalCompleted} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SalesState state={totalPartial} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SalesState state={totalViewed} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SalesState state={totalNotViewed} />
              </Grid>
              <Grid item xs={12} md={9}>
                <SaleStatics />
              </Grid>
              <Grid item xs={12} md={3}>
                <Application />
              </Grid>
            </GridContainer>
          </Box>
        </AppAnimate>
      ) : null}
      <InfoView />
    </>
  );
};

export default ECommerce;
