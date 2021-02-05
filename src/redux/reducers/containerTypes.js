
import {
    FETCHING_CONTAINERTYPES, FETCHING_CONTAINERTYPES_SUCCESS, FETCHING_CONTAINERTYPES_FAILURE, FETCHING_CONTAINERTYPE,
    FETCHING_CONTAINERTYPE_SUCCESS
  } from '../constants';
  
  const initialState = {
    containerTypes: [],
    isFetching: false,
    error: false,
  };
  
  export default function containerTypesReducer(state = initialState, action) {
    switch (action.type) {
      case FETCHING_CONTAINERTYPES:
        return {
          ...state,
          containerTypes: [],
          isFetching: true,
        };
      case FETCHING_CONTAINERTYPES_SUCCESS:
        return {
          ...state,
          isFetching: false,
          containerTypes: action.containerTypes,
        };
      case FETCHING_CONTAINERTYPES_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true,
        };

        case FETCHING_CONTAINERTYPE:
          return {
            ...state,
            containerTypes: [],
            isFetching: true,
          };


        case FETCHING_CONTAINERTYPE_SUCCESS:
          return {
            ...state,
            isFetching: false,
            containerTypes: action.containerTypes,
          };



      default:
        return state;
    }
  }
  