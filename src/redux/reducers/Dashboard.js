import {GET_ECOMMERCE_DATA} from '../../shared/constants/ActionTypes';

const initialState = {
  analyticsData: null,
  ecommerceData: null,
  crmData: null,
  cryptoData: null,
  metricsData: null,
  widgetsData: null,
  healthCare: null,
  academyData: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ECOMMERCE_DATA:
      return {
        ...state,
        ecommerceData: action.payload,
      };

    default:
      return state;
  }
};
export default dashboardReducer;
