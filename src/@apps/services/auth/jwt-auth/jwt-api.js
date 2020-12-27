import axios from 'axios';
const API_URL = process.env.REACT_APP_API_BASE_URL + '/admin-api/';
const jwtAxios = axios.create({
  baseURL: 'https://survey.visiblestars.in/admin-api/', //'http://localhost:5000/api/',
  //  baseURL: 'https://Aathisoft-mongo-api.herokuapp.com/api/', //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
});
jwtAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.data.msg === 'Token is not valid') {
      console.log('Need to logout user');
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  },
);
export const setAuthToken = (token) => {
  if (token) {
    jwtAxios.defaults.headers.common['x-auth-token'] = token;
    sessionStorage.setItem('token', token);
  } else {
    delete jwtAxios.defaults.headers.common['x-auth-token'];
    sessionStorage.removeItem('token');
  }
};

export default jwtAxios;
