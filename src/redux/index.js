import { combineReducers } from 'redux';
import drivers from './reducers/drivers';
import licenceTypes from './reducers/licenceTypes';
import vehicleTypes from './reducers/vehicleTypes';
import containerTypes from './reducers/containerTypes';
import carBrands from './reducers/carBrands';
import wasteManagements from './reducers/wasteManagements';
import wastePlaces from './reducers/wastePlaces';
import staticContainers from './reducers/staticContainers';
import units from './reducers/units';
import vehicleYears from './reducers/vehicleYears';


const rootReducer = combineReducers({
  drivers,
  licenceTypes,
  vehicleTypes,
  containerTypes,
  carBrands,
  wasteManagements,
  wastePlaces,
  staticContainers,
  units,
  vehicleYears
});

export default rootReducer;
