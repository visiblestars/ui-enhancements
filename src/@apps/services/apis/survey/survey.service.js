import axios from 'axios';
import {handleError} from '../../helpers/handle-error';
import authMultipartHeader from './auth.multipart.header';
import authHeader from './auth.header';
const API_URL = process.env.REACT_APP_API_BASE_URL + '/admin-api/survey';

class SurveyService {
  async createSurvey(
    title_en,
    title_ar,
    category,
    expire_on,
    questions,
    users,
  ) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    let formData = new FormData();
    formData.append('title_en', title_en);
    formData.append('title_ar', title_ar);
    formData.append('category', category);
    formData.append('expire_on', expire_on);
    formData.append('questions', questions);
    formData.append('users', users);

    let config = {
      headers: authMultipartHeader(),
      cancelToken: source.token,
    };

    try {
      return await axios.post(API_URL, formData, config).then((response) => {
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

  async fetchSurveys(input) {
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

  async deleteSurvey(surveyId) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    let config = {
      headers: authHeader(),
      cancelToken: source.token,
    };

    try {
      return await axios
        .delete(API_URL + '/' + surveyId, config)
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

  async fetchStatistics() {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    let config = {
      headers: authHeader(),
      cancelToken: source.token,
    };

    try {
      return await axios
        .get(API_URL + '/dashboard', config)
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

  async searchSurveyUsers(input) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    let config = {
      headers: authHeader(),
      cancelToken: source.token,
      params: input,
    };

    try {
      return await axios
        .get(API_URL + '/users/search', config)
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

  downloadSurveyUsers = (surveyId) => {
    let config = {
      headers: authHeader(),
    };
    fetch(API_URL + '/download/' + surveyId, config).then((response) => {
      const filename = 'survey_users_links.csv';
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
      });
    });
  };

  async fetchSurveyUsersDistinctSegments() {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    let config = {
      headers: authHeader(),
      cancelToken: source.token,
    };

    try {
      return await axios
        .get(API_URL + '/users/segments', config)
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

export default new SurveyService();
