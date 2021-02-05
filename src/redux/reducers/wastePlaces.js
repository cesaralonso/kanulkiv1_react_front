
import {
    FETCHING_WASTEPLACES, FETCHING_WASTEPLACES_SUCCESS, FETCHING_WASTEPLACES_FAILURE, FETCHING_WASTEPLACE,
    FETCHING_WASTEPLACE_SUCCESS
  } from '../constants';
  
  const initialState = {
    wastePlaces: [],
    isFetching: false,
    error: false,
  };
  
  export default function wastePlacesReducer(state = initialState, action) {
    switch (action.type) {
      case FETCHING_WASTEPLACES:
        return {
          ...state,
          wastePlaces: [],
          isFetching: true,
        };
      case FETCHING_WASTEPLACES_SUCCESS:
        return {
          ...state,
          isFetching: false,
          wastePlaces: action.wastePlaces,
        };
      case FETCHING_WASTEPLACES_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true,
        };

        case FETCHING_WASTEPLACE:
          return {
            ...state,
            wastePlaces: [],
            isFetching: true,
          };


        case FETCHING_WASTEPLACE_SUCCESS:
          return {
            ...state,
            isFetching: false,
            wastePlaces: action.wastePlaces,
          };

      default:
        return state;
    }
  }
  