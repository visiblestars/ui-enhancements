import React from 'react';
import Api from '../../@apps/services/ApiConfig';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_ECOMMERCE_DATA,
} from '../../shared/constants/ActionTypes';
import IntlMessages from '../../@apps/utility/IntlMessages';

export const onGetECommerceData = () => {
  const access_token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/survey/dashboard', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_ECOMMERCE_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
