
import {
    FETCHING_STATICCONTAINERS, FETCHING_STATICCONTAINERS_SUCCESS, FETCHING_STATICCONTAINERS_FAILURE, FETCHING_STATICCONTAINER,
    FETCHING_STATICCONTAINER_SUCCESS
  } from '../constants';
  
  const initialState = {
    staticContainers: [],
    isFetching: false,
    error: false,
  };
  
  export default function staticContainersReducer(state = initialState, action) {
    switch (action.type) {
      case FETCHING_STATICCONTAINERS:
        return {
          ...state,
          staticContainers: [],
          isFetching: true,
        };
      case FETCHING_STATICCONTAINERS_SUCCESS:
        return {
          ...state,
          isFetching: false,
          staticContainers: action.staticContainers,
        };
      case FETCHING_STATICCONTAINERS_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true,
        };

        case FETCHING_STATICCONTAINER:
          return {
            ...state,
            staticContainers: [],
            isFetching: true,
          };


        case FETCHING_STATICCONTAINER_SUCCESS:
          return {
            ...state,
            isFetching: false,
            staticContainers: action.staticContainers,
          };



      default:
        return state;
    }
  }
  