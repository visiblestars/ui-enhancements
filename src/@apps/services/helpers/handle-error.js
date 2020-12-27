//import AuthService from 'src/services/auth.service';
// import {useDispatch} from 'react-redux';
// import {onJWTAuthSignout} from '../../../redux/actions';

//const dispatch = useDispatch();

export const handleError = (error) => {
  console.log('handleError: ' + JSON.stringify(error));
  if (error.response && [401, 403].indexOf(error.response.status) !== -1) {
    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    //AuthService.logout();
    // dispatch(onJWTAuthSignout());
  }
  const errorMessage =
    (error.response && error.response.data.message) ||
    error.message ||
    error.statusText;
  return Promise.reject(errorMessage);
};
