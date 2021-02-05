
import {
  FETCHING_DRIVERS, FETCHING_DRIVERS_SUCCESS, FETCHING_DRIVERS_FAILURE,
} from '../constants';

const initialState = {
  drivers: [],
  isFetching: false,
  error: false,
};

export default function driverReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_DRIVERS:
      return {
        ...state,
        drivers: [],
        isFetching: true,
      };
    case FETCHING_DRIVERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        drivers: action.data.data,
      };
    case FETCHING_DRIVERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
}
