import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import Settings from './Setting';
import Common from './Common';
import Dashboard from './Dashboard';
import Gallery from './Gallery';
import Auth from './Auth';

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    auth: Auth,
    dashboard: Dashboard,
    common: Common,
    gallery: Gallery,
  });
export default reducers;
