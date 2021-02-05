import {
    FETCHING_VEHICLETYPES,
    FETCHING_VEHICLETYPE,
    FETCHING_VEHICLETYPE_SUCCESS,
    FETCHING_VEHICLETYPES_SUCCESS,
    FETCHING_VEHICLETYPES_FAILURE, 
  } from '../constants';
import '../../env/globals.js';

  export function obtainVehicleTypes() {
    return (dispatch) => {
      dispatch(getVehicleTypes());
      const url = `${global.BASE_URL}vehicleTypes`;
     return fetch(url, {
        method: 'GET',
      }).then(data => data.json())
        .then((json) => {
            dispatch(getVehicleTypesSuccess(json));
            // console.log(getVehicleTypesSuccess(json));
        })
        .catch(err => dispatch(getVehicleTypesFailure(err)));
    };
  }

  export function fetchVehicleTypes(id) {
    return (dispatch) => {
      dispatch(getVehicleType());
      const url = `${global.BASE_URL}vehicleTypes/${id}`;
      fetch(url, {
        method: 'GET',
      }).then(data => data.json())
        .then((json) => {
            dispatch(getVehicleTypeFetchSuccess(json));
        })
        .catch(err => dispatch(getVehicleTypesFailure(err)));
    };
  }

  export function storeVehicleTypes(type) {
    return (dispatch) => {
      //dispatch(getVehicleTypes());
      const url = `${global.BASE_URL}vehicleTypes`;
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          type: type,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(data => data.json())
        .then((json) => {
          if(json) {
            alert("Guardado correctamente");
          }else {
              alert("Hubo un probleme al guardar, intentelo mas tarde.");
          }
          
        })
        .catch(err => JSON.stringify(err));
    };
  }


  export function updateVehicleTypes(type, id) {
    return (dispatch) => {
      dispatch(getVehicleTypes());
      const url = `${global.BASE_URL}vehicleTypes/${id}`;
      return fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
          type: type,
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

  export function deleteVehicleTypes(vehicleTypeId) {
    return (dispatch) => {
      dispatch(getVehicleTypes());
      const url = `${global.BASE_URL}vehicleTypes/${vehicleTypeId}`;
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
        .catch(err => dispatch(getVehicleTypesFailure(err)));
    };
  }
  
  export function getVehicleTypes() {
    return {
      type: FETCHING_VEHICLETYPES,
    };
  }

  export function getVehicleType() {
    return {
      type: FETCHING_VEHICLETYPE,
    };
  }
  
  export function getVehicleTypesSuccess(vehicleTypes) {
    return {
      type: FETCHING_VEHICLETYPES_SUCCESS,
      vehicleTypes,
    };
  }

  export function getVehicleTypeFetchSuccess(vehicleTypes) {
    return {
      type: FETCHING_VEHICLETYPE_SUCCESS,
      vehicleTypes,
    };
  }
  
  export function getVehicleTypesFailure(err) {
    return {
      type: FETCHING_VEHICLETYPES_FAILURE,
      err
    };
  }
  