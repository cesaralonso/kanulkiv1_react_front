import {
    FETCHING_VEHICLE_YEARS, FETCHING_VEHICLE_YEAR, FETCHING_VEHICLE_YEAR_SUCCESS, FETCHING_VEHICLE_YEARS_SUCCESS, FETCHING_VEHICLE_YEARS_FAILURE, 
  } from '../constants';
import '../../env/globals.js';

  export  function obtainVehicleYears() {
    return (dispatch) => {
      dispatch(getVehicleYears());
      const url = `${global.BASE_URL}vehicleYears`;
     return fetch(url, {
        method: 'GET',
      }).then(data => data.json())
        .then((json) => {
            dispatch(getVehicleYearsSuccess(json));
        })
        .catch(err => dispatch(getVehicleYearsFailure(err)));
    };
  }

  export function fetchVehicleYears(id) {
    return (dispatch) => {
      dispatch(getVehicleYear());
      const url = `${global.BASE_URL}vehicleYears/${id}`;
      fetch(url, {
        method: 'GET',
      }).then(data => data.json())
        .then((json) => {
            dispatch(getVehicleYearFetchSuccess(json));
        })
        .catch(err => dispatch(getVehicleYearsFailure(err)));
    };
  }

  export function storeVehicleYears(year) {
    return (dispatch) => {
      //dispatch(getVehicleYears());
      const url = `${global.BASE_URL}vehicleYears`;
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          year: year,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(data => data.json())
        .then((json) => {
          if(json.errorMessage) {
            alert(json.errorMessage);
            return false;
           } else {
            alert("Guardado correctamente");
            return true;
           }
          
        })
        .catch(err => JSON.stringify(err));
    };
  }


  export function updateVehicleYears(year, id) {
    return (dispatch) => {
      dispatch(getVehicleYears());
      const url = `${global.BASE_URL}vehicleYears/${id}`;
      return fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
          year: year,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(data => data.json())
        .then((json) => {
          if(json) {
            alert("Actualizado correctamente");
          }else {
              alert("Hubo un probleme al guardar, intentelo mas tarde.");
          }
        })
        .catch(err => JSON.stringify(err));
    };
  }

  export function deleteVehicleYears(licenceTypeId) {
    return (dispatch) => {
      dispatch(getVehicleYears());
      const url = `${global.BASE_URL}vehicleYears/${licenceTypeId}`;
     return fetch(url, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(data => data.json())
        .then((json) => {
          if(json)
            alert("Eliminado correctamente");
        })
        .catch(err => dispatch(getVehicleYearsFailure(err)));
    };
  }
  
  export function getVehicleYears() {
    return {
      type: FETCHING_VEHICLE_YEARS,
    };
  }

  export function getVehicleYear() {
    return {
      type: FETCHING_VEHICLE_YEAR,
    };
  }
  
  export function getVehicleYearsSuccess(vehicleYears) {
    return {
      type: FETCHING_VEHICLE_YEARS_SUCCESS,
      vehicleYears,
    };
  }

  export function getVehicleYearFetchSuccess(vehicleYears) {
    return {
      type: FETCHING_VEHICLE_YEAR_SUCCESS,
      vehicleYears,
    };
  }
  
  export function getVehicleYearsFailure(err) {
    return {
      type: FETCHING_VEHICLE_YEARS_FAILURE,
      err
    };
  }
  