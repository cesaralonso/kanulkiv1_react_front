
import {
    FETCHING_LICENCETYPES,
    FETCHING_LICENCETYPE,
    FETCHING_LICENCETYPES_SUCCESS,
    FETCHING_LICENCETYPES_FAILURE,
    FETCHING_LICENCETYPE_SUCCESS
  } from '../constants';
  
  const initialState = {
    licenceTypes: [],
    isFetching: false,
    error: false,
  };
  
  export default function licenceTypesReducer(state = initialState, action) {
    switch (action.type) {
      case FETCHING_LICENCETYPES:
        return {
          ...state,
          licenceTypes: [],
          isFetching: true,
        };

        case FETCHING_LICENCETYPE:
        return {
          ...state,
          licenceTypes: [],
          isFetching: true,
        };

      case FETCHING_LICENCETYPES_SUCCESS:
        return {
          ...state,
          isFetching: false,
          licenceTypes: action.licenceTypes,
        };

        case FETCHING_LICENCETYPE_SUCCESS:
        return {
          ...state,
          isFetching: false,
          licenceTypes: action.licenceTypes,
        };



      case FETCHING_LICENCETYPES_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true,
        };

      default:
        return state;
    }
  }
  