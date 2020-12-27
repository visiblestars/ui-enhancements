import React from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import AppLayout from '@apps/core/AppLayout';
import AuthRoutes from '@apps/utility/AuthRoutes';
import LocaleProvider from '@apps/utility/LocaleProvider';
import AathisoftThemeProvider from '@apps/utility/AathisoftThemeProvider';
import AathisoftStyleProvider from '@apps/utility/AathisoftStyleProvider';
import ContextProvider from '@apps/utility/ContextProvider';

import configureStore, {history} from './redux/store';
import CssBaseline from '@material-ui/core/CssBaseline';

const store = configureStore();

const App = () => (
  <ContextProvider>
    <Provider store={store}>
      <AathisoftThemeProvider>
        <AathisoftStyleProvider>
          <LocaleProvider>
            <ConnectedRouter history={history}>
              <AuthRoutes>
                <CssBaseline />
                <AppLayout />
              </AuthRoutes>
            </ConnectedRouter>
          </LocaleProvider>
        </AathisoftStyleProvider>
      </AathisoftThemeProvider>
    </Provider>
  </ContextProvider>
);

export default App;
