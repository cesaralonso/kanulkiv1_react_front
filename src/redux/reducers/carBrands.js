
import {
    FETCHING_CARBRANDS, FETCHING_CARBRANDS_SUCCESS, FETCHING_CARBRANDS_FAILURE, FETCHING_CARBRAND,
    FETCHING_CARBRAND_SUCCESS
  } from '../constants';
  
  const initialState = {
    carBrands: [],
    isFetching: false,
    error: false,
  };
  
  export default function carBrandsReducer(state = initialState, action) {
    switch (action.type) {
      case FETCHING_CARBRANDS:
        return {
          ...state,
          carBrands: [],
          isFetching: true,
        };
      case FETCHING_CARBRANDS_SUCCESS:
        return {
          ...state,
          isFetching: false,
          carBrands: action.carBrands,
        };
      case FETCHING_CARBRANDS_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true,
        };

        case FETCHING_CARBRAND:
          return {
            ...state,
            carBrands: [],
            isFetching: true,
          };


        case FETCHING_CARBRAND_SUCCESS:
          return {
            ...state,
            isFetching: false,
            carBrands: action.carBrands,
          };



      default:
        return state;
    }
  }
  