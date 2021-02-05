
import {
    FETCHING_WASTEMANAGEMENTS, FETCHING_WASTEMANAGEMENTS_SUCCESS, FETCHING_WASTEMANAGEMENTS_FAILURE, FETCHING_WASTEMANAGEMENT,
    FETCHING_WASTEMANAGEMENT_SUCCESS
  } from '../constants';
  
  const initialState = {
    wasteManagements: [],
    isFetching: false,
    error: false,
  };
  
  export default function wasteManagementsReducer(state = initialState, action) {
    switch (action.type) {
      case FETCHING_WASTEMANAGEMENTS:
        return {
          ...state,
          wasteManagements: [],
          isFetching: true,
        };
      case FETCHING_WASTEMANAGEMENTS_SUCCESS:
        return {
          ...state,
          isFetching: false,
          wasteManagements: action.wasteManagements,
        };
      case FETCHING_WASTEMANAGEMENTS_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true,
        };

        case FETCHING_WASTEMANAGEMENT:
          return {
            ...state,
            wasteManagements: [],
            isFetching: true,
          };


        case FETCHING_WASTEMANAGEMENT_SUCCESS:
          return {
            ...state,
            isFetching: false,
            wasteManagements: action.wasteManagements,
          };

      default:
        return state;
    }
  }
  