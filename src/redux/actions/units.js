import {
    FETCHING_UNITS, FETCHING_UNIT, FETCHING_UNIT_SUCCESS, FETCHING_UNITS_SUCCESS, FETCHING_UNITS_FAILURE, 
  } from '../constants';
import '../../env/globals.js';

  export  function obtainUnits() {
    return (dispatch) => {
      dispatch(getUnits());
      const url = `${global.BASE_URL}units`;
     return fetch(url, {
        method: 'GET',
      }).then(data => data.json())
        .then((json) => {
            dispatch(getUnitsSuccess(json));
        })
        .catch(err => dispatch(getUnitsFailure(err)));
    };
  }

  export function fetchUnits(id) {
    return (dispatch) => {
      dispatch(getUnit());
      const url = `${global.BASE_URL}units/${id}`;
      fetch(url, {
        method: 'GET',
      }).then(data => data.json())
        .then((json) => {
            dispatch(getUnitFetchSuccess(json));
        })
        .catch(err => dispatch(getUnitsFailure(err)));
    };
  }

  export function storeUnits(name) {
    return (dispatch) => {
      //dispatch(getUnits());
      const url = `${global.BASE_URL}units`;
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          name: name,
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


  export function updateUnits(type, id) {
    return (dispatch) => {
      dispatch(getUnits());
      const url = `${global.BASE_URL}units/${id}`;
      return fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
          name: type,
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

  export function deleteUnits(licenceTypeId) {
    return (dispatch) => {
      dispatch(getUnits());
      const url = `${global.BASE_URL}units/${licenceTypeId}`;
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
        .catch(err => dispatch(getUnitsFailure(err)));
    };
  }
  
  export function getUnits() {
    return {
      type: FETCHING_UNITS,
    };
  }

  export function getUnit() {
    return {
      type: FETCHING_UNIT,
    };
  }
  
  export function getUnitsSuccess(units) {
    return {
      type: FETCHING_UNITS_SUCCESS,
      units,
    };
  }

  export function getUnitFetchSuccess(units) {
    return {
      type: FETCHING_UNIT_SUCCESS,
      units,
    };
  }
  
  export function getUnitsFailure(err) {
    return {
      type: FETCHING_UNITS_FAILURE,
      err
    };
  }
  