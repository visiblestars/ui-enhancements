import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '@apps/core/ComponentCard';
import ComponentHeader from '@apps/core/ComponentHeader';
import GridContainer from '@apps/core/GridContainer';
import SortingNSelecting from '../../../../muiComponents/dataDisplay/Tables/SortingNSelecting';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SortingNSelectingSource from 'modules/admin/app/surveys/list1/muiComponents/dataDisplay/Tables/SortingNSelecting';

const Tables = () => {
  return (
    <>
      <ComponentHeader
        title='Tables'
        description='Data tables display sets of data. They can be fully customized'
        refUrl='https://material-ui.com/components/tables/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Sorting & Selecting'
            component={SortingNSelecting}
            // source={SortingNSelectingSource}
            description='This example demonstrates the use of Checkbox and clickable rows for selection, with a custom Toolbar. It uses the TableSortLabel component to help style column headings.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Tables;
