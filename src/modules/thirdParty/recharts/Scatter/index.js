import React from 'react';
import SimpleScatterChart from './Components/SimpleScatterChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleScatterChartSource from '!raw-loader!./Components/SimpleScatterChart';
import ThreeDimScatterChart from './Components/ThreeDimScatterChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ThreeDimScatterChartSource from '!raw-loader!./Components/ThreeDimScatterChart';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '@apps/core/ComponentCard';
import ComponentHeader from '@apps/core/ComponentHeader';
import GridContainer from '@apps/core/GridContainer';

const Scatter = () => {
  return (
    <>
      <ComponentHeader
        title='ScatterChart'
        refUrl='http://recharts.org/en-US/api/ScatterChart'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple Scatter Chart'
            component={SimpleScatterChart}
            source={SimpleScatterChartSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Three Dim Scatter Chart'
            component={ThreeDimScatterChart}
            source={ThreeDimScatterChartSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Scatter;
