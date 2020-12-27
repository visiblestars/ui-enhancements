import axios from 'axios';
import {handleError} from '../../helpers/handle-error';
import authHeader from './auth.header';

const API_URL = process.env.REACT_APP_API_BASE_URL + '/admin-api/user';

class UserService {
  async findUsers(input) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    let config = {
      headers: authHeader(),
      cancelToken: source.token,
      params: input,
    };

    try {
      return await axios.get(API_URL + '/search', config).then((response) => {
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

  async getUser(id) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    let config = {
      headers: authHeader(),
      cancelToken: source.token,
    };

    try {
      return await axios.get(API_URL + '/' + id, config).then((response) => {
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

  async createUser(email, firstName, lastName, role, password) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    let params = {};
    params['email'] = email;
    params['firstName'] = firstName;
    params['lastName'] = lastName;
    params['role'] = role;
    params['password'] = password;

    let config = {
      headers: authHeader(),
      cancelToken: source.token,
    };

    try {
      return await axios.post(API_URL, params, config).then((response) => {
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

  async updateUserStatus(ids, status) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    var formData = new FormData();
    formData.append('ids', ids);
    formData.append('status', status);

    let config = {
      headers: authHeader(),
      cancelToken: source.token,
    };

    try {
      return await axios
        .post(API_URL + '/status', formData, config)
        .then((response) => {
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

  async changePassword(id, password) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    var formData = new FormData();
    formData.append('id', id);
    formData.append('password', password);

    let config = {
      headers: authHeader(),
      cancelToken: source.token,
    };

    try {
      return await axios
        .post(API_URL + '/changepassword', formData, config)
        .then((response) => {
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
}

export default new UserService();
