import axios from 'axios';
import {handleError} from '../../helpers/handle-error';

const API_URL = process.env.REACT_APP_API_BASE_URL + '/admin-api/auth';

class AuthService {
  login(username, password) {
    console.log(process.env.API_BASE_URL);
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    let config = {
      cancelToken: source.token,
      username,
      password,
    };

    try {
      return axios.post(API_URL + '/signin', config).then((response) => {
        if (response.data.accessToken) {
          sessionStorage.setItem('currentUser', JSON.stringify(response.data));
        }
        return response.data;
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('cancelled');
      } else {
        return handleError(error);
      }
    }

    return () => {
      source.cancel();
    };
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }
}

export default new AuthService();
