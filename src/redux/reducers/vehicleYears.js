
import {
    FETCHING_VEHICLE_YEARS, FETCHING_VEHICLE_YEARS_SUCCESS, FETCHING_VEHICLE_YEARS_FAILURE, FETCHING_VEHICLE_YEAR,
    FETCHING_VEHICLE_YEAR_SUCCESS
  } from '../constants';
  
  const initialState = {
    vehicleYears: [],
    isFetching: false,
    error: false,
  };
  
  export default function vehicleYearsReducer(state = initialState, action) {
    switch (action.type) {
      case FETCHING_VEHICLE_YEARS:
        return {
          ...state,
          vehicleYears: [],
          isFetching: true,
        };
      case FETCHING_VEHICLE_YEARS_SUCCESS:
        return {
          ...state,
          isFetching: false,
          vehicleYears: action.vehicleYears,
        };
      case FETCHING_VEHICLE_YEARS_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true,
        };

        case FETCHING_VEHICLE_YEAR:
          return {
            ...state,
            vehicleYears: [],
            isFetching: true,
          };


        case FETCHING_VEHICLE_YEAR_SUCCESS:
          return {
            ...state,
            isFetching: false,
            vehicleYears: action.vehicleYears,
          };



      default:
        return state;
    }
  }
  