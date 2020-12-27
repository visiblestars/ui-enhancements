import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {Auth as awsAuth, Hub} from 'aws-amplify';
import {UPDATE_AUTH_USER} from '../../shared/constants/ActionTypes';
import {auth as firebaseAuth} from '../services/auth/firebase/firebase';
import {
  fetchStart,
  fetchSuccess,
  onGetLoggedInCognitoUser,
  setJWTToken,
} from '../../redux/actions';
import {AuthType} from '../../shared/constants/AppEnums';
import {defaultUser} from '../../shared/constants/AppConst';
import jwtAxios from '../services/auth/jwt-auth/jwt-api';

export const useAuthToken = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const {user} = useSelector(({auth}) => auth);

  useEffect(() => {
    const awsAuthUser = () =>
      new Promise((resolve) => {
        awsAuth
          .currentAuthenticatedUser()
          .then((user) => {
            resolve();
            if (user) {
              dispatch({
                type: UPDATE_AUTH_USER,
                payload: {
                  authType: AuthType.AWS_COGNITO,
                  uid: user.username,
                  displayName: user.attributes.name,
                  email: user.attributes.email,
                  role: defaultUser.role,
                  photoURL: user.photoURL,
                  token: user.signInUserSession.accessToken.jwtToken,
                },
              });
            }
          })
          .catch(function (error) {
            resolve();
          });
        return Promise.resolve();
      });

    const firebaseCheck = () =>
      new Promise((resolve) => {
        firebaseAuth.onAuthStateChanged((authUser) => {
          if (authUser) {
            dispatch({
              type: UPDATE_AUTH_USER,
              payload: {
                authType: AuthType.FIREBASE,
                uid: authUser.uid,
                displayName: authUser.displayName,
                email: authUser.email,
                role: defaultUser.role,
                photoURL: authUser.photoURL,
                token: authUser.refreshToken,
              },
            });
          }
          resolve();
        });
        return Promise.resolve();
      });

    const jwtAthCheck = async () => {
      dispatch(fetchStart());
      const token = sessionStorage.getItem('token');
      if (!token) {
        dispatch(fetchSuccess());
        return;
      }
      dispatch(setJWTToken(token));
      try {
        //const res = await jwtAxios.get('/auth');
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        dispatch(fetchSuccess());
        dispatch({
          type: UPDATE_AUTH_USER,
          payload: {
            authType: AuthType.JWT_AUTH,
            displayName: currentUser.username,
            email: currentUser.username,
            role: currentUser.roles[0],
            token: currentUser.accessToken,
            photoURL: '',
          },
        });
        return;
      } catch (err) {
        dispatch(fetchSuccess());
        return;
      }
    };

    const validateAuth = () => {
      Promise.all([firebaseCheck(), awsAuthUser(), jwtAthCheck()]).then(() => {
        setLoading(false);
      });
      Hub.listen('auth', ({payload: {event, data}}) => {
        switch (event) {
          case 'signIn':
            dispatch(onGetLoggedInCognitoUser());
            break;
          case 'signOut':
            dispatch({type: UPDATE_AUTH_USER, payload: null});
            break;
          default:
            return false;
        }
      });
    };
    validateAuth();
  }, [dispatch]);

  return [loading, user];
};

export const useAuthUser = () => {
  const {user} = useSelector(({auth}) => auth);

  if (user) {
    return {id: 1, ...user};
  }
  return [null];
};
