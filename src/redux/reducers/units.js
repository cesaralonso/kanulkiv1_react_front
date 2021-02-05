
import {
    FETCHING_UNITS, FETCHING_UNITS_SUCCESS, FETCHING_UNITS_FAILURE, FETCHING_UNIT,
    FETCHING_UNIT_SUCCESS
  } from '../constants';
  
  const initialState = {
    units: [],
    isFetching: false,
    error: false,
  };
  
  export default function unitsReducer(state = initialState, action) {
    switch (action.type) {
      case FETCHING_UNITS:
        return {
          ...state,
          units: [],
          isFetching: true,
        };
      case FETCHING_UNITS_SUCCESS:
        return {
          ...state,
          isFetching: false,
          units: action.units,
        };
      case FETCHING_UNITS_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true,
        };

        case FETCHING_UNIT:
          return {
            ...state,
            units: [],
            isFetching: true,
          };


        case FETCHING_UNIT_SUCCESS:
          return {
            ...state,
            isFetching: false,
            units: action.units,
          };



      default:
        return state;
    }
  }
  