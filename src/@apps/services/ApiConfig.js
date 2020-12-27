import axios from 'axios';
const API_URL = process.env.REACT_APP_API_BASE_URL + '/admin-api/';
const ApiConfig = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

// ApiConfig.interceptors.request.use(req =>{
//   const token = sessionStorage.getItem('token');
// if (token) {
//   ApiConfig.defaults.headers.common['x-auth-token'] = token;
//   //sessionStorage.setItem('token', token);
// } else {
//   delete ApiConfig.defaults.headers.common['x-auth-token'];
// }

// })

export default ApiConfig;
