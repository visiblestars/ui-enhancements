import React, {useContext, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {matchRoutes} from 'react-router-config';
import AppContext from './AppContext';
import {useAuthToken} from './AppHooks';
import {Loader} from '../index';
import PropTypes from 'prop-types';
import {checkPermission} from './Utils';
import {initialUrl} from '../../shared/constants/AppConst';
import {setInitialPath} from '../../redux/actions';

const AuthRoutes = ({children}) => {
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const {routes} = useContext(AppContext);

  const [loading, user] = useAuthToken();
  const initialPath = useSelector(({settings}) => settings.initialPath);
  const currentRoute = matchRoutes(routes, pathname)[0].route;
  let isPermitted = checkPermission(currentRoute.auth, user ? user.role : null);

  useEffect(() => {
    function setInitPath() {
      if (
        initialPath === '/' &&
        [
          '/signin',
          '/signup',
          '/confirm-signup',
          '/reset-password',
          '/error-pages/error-404',
          '/forget-password',
        ].indexOf(pathname) === -1
      ) {
        if (isPermitted) {
          dispatch(setInitialPath(pathname));
        } else {
          dispatch(setInitialPath(undefined));
        }
      }
    }

    setInitPath();
  }, [dispatch, isPermitted, initialPath, pathname]);

  useEffect(() => {
    if (!loading) {
      if (!user && !isPermitted) {
        history.push('/signin'); // allowed route
      } else if (user && !isPermitted) {
        history.push('/error-pages/error-404'); // Not found
      } else if (user && isPermitted) {
        if (
          pathname === '/' ||
          pathname === '/signin' ||
          pathname === '/signup'
        ) {
          history.push(initialUrl);
        } else if (
          initialPath &&
          initialUrl !== initialPath &&
          (initialPath !== '/' ||
            initialPath !== '/signin' ||
            initialPath !== '/signup')
        ) {
          history.push(initialPath);
        }
      }
    }
  }, [user, loading, initialPath, isPermitted, pathname, history]);

  return loading ? <Loader /> : <>{children}</>;
};

export default AuthRoutes;

AuthRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
