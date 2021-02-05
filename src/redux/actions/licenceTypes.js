import {
    FETCHING_LICENCETYPES,
    FETCHING_LICENCETYPE,
    FETCHING_LICENCETYPE_SUCCESS,
    FETCHING_LICENCETYPES_SUCCESS,
    FETCHING_LICENCETYPES_FAILURE, 
  } from '../constants';
import '../../env/globals.js';

  export function obtainLicenceTypes() {
    return (dispatch) => {
      dispatch(getLicenceTypes());
      const url = `${global.BASE_URL}licenceTypes`;
     return fetch(url, {
        method: 'GET',
      }).then(data => data.json())
        .then((json) => {
            dispatch(getLicenceTypesSuccess(json));
        })
        .catch(err => dispatch(getLicenceTypesFailure(err)));
    };
  }

  export function fetchLicenceTypes(id) {
    return (dispatch) => {
      dispatch(getLicenceType());
      const url = `${global.BASE_URL}licenceTypes/${id}`;
      fetch(url, {
        method: 'GET',
      }).then(data => data.json())
        .then((json) => {
            dispatch(getLicenceTypeFetchSuccess(json));
        })
        .catch(err => dispatch(getLicenceTypesFailure(err)));
    };
  }

  export function storeLicenceTypes(type) {
    return (dispatch) => {
      //dispatch(getLicenceTypes());
      const url = `${global.BASE_URL}licenceTypes`;
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


  export function updateLicenceTypes(type, id) {
    return (dispatch) => {
      dispatch(getLicenceTypes());
      const url = `${global.BASE_URL}licenceTypes/${id}`;
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

  export function deleteLicenceTypes(licenceTypeId) {
    return (dispatch) => {
      dispatch(getLicenceTypes());
      const url = `${global.BASE_URL}licenceTypes/${licenceTypeId}`;
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
        .catch(err => dispatch(getLicenceTypesFailure(err)));
    };
  }
  
  export function getLicenceTypes() {
    return {
      type: FETCHING_LICENCETYPES,
    };
  }

  export function getLicenceType() {
    return {
      type: FETCHING_LICENCETYPE,
    };
  }
  
  export function getLicenceTypesSuccess(licenceTypes) {
    return {
      type: FETCHING_LICENCETYPES_SUCCESS,
      licenceTypes,
    };
  }

  export function getLicenceTypeFetchSuccess(licenceTypes) {
    return {
      type: FETCHING_LICENCETYPE_SUCCESS,
      licenceTypes,
    };
  }
  
  export function getLicenceTypesFailure(err) {
    return {
      type: FETCHING_LICENCETYPES_FAILURE,
      err
    };
  }
  