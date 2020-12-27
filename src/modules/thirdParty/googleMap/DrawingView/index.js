import React from 'react';

import ComponentCard from '@apps/core/ComponentCard';
import ComponentHeader from '@apps/core/ComponentHeader';
import GridContainer from '@apps/core/GridContainer';
import Grid from '@material-ui/core/Grid';

import DrawingView from './Components/DrawingView';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DrawingViewSource from '!raw-loader!./Components/DrawingView';

const DrawingViewEx = () => {
  return (
    <>
      <ComponentHeader
        title='Drawing View Google Map'
        description='A wrapper around google.maps.drawing.DrawingManager'
        refUrl='https://developers.google.com/maps/documentation/javascript/reference/#DrawingManager/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Drawing View Map'
            component={DrawingView}
            source={DrawingViewSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default DrawingViewEx;
