
import {
    FETCHING_VEHICLETYPES,
    FETCHING_VEHICLETYPE,
    FETCHING_VEHICLETYPES_SUCCESS,
    FETCHING_VEHICLETYPES_FAILURE,
    FETCHING_VEHICLETYPE_SUCCESS
  } from '../constants';
  
  const initialState = {
    vehicleTypes: [],
    isFetching: false,
    error: false,
  };
  
  export default function vehicleTypesReducer(state = initialState, action) {
    switch (action.type) {
      case FETCHING_VEHICLETYPES:
        return {
          ...state,
          vehicleTypes: [],
          isFetching: true,
        };

        case FETCHING_VEHICLETYPE:
        return {
          ...state,
          vehicleTypes: [],
          isFetching: true,
        };

      case FETCHING_VEHICLETYPES_SUCCESS:
        return {
          ...state,
          isFetching: false,
          vehicleTypes: action.vehicleTypes,
        };

        case FETCHING_VEHICLETYPE_SUCCESS:
        return {
          ...state,
          isFetching: false,
          vehicleTypes: action.vehicleTypes,
        };



      case FETCHING_VEHICLETYPES_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true,
        };

      default:
        return state;
    }
  }
  