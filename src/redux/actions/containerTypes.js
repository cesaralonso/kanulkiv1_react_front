import {
    FETCHING_CONTAINERTYPES, FETCHING_CONTAINERTYPE, FETCHING_CONTAINERTYPE_SUCCESS, FETCHING_CONTAINERTYPES_SUCCESS, FETCHING_CONTAINERTYPES_FAILURE, 
  } from '../constants';
import '../../env/globals.js';

  export  function obtainContainerTypes() {
    return (dispatch) => {
      dispatch(getContainerTypes());
      const url = `${global.BASE_URL}containerTypes/`;
     return fetch(url, {
        method: 'GET',
      }).then(data => data.json())
        .then((json) => {
            dispatch(getContainerTypesSuccess(json));
        })
        .catch(err => dispatch(getContainerTypesFailure(err)));
    };
  }

  export function fetchContainerTypes(id) {
    return (dispatch) => {
      dispatch(getContainerType());
      const url = `${global.BASE_URL}containerTypes/${id}`;
      fetch(url, {
        method: 'GET',
      }).then(data => data.json())
        .then((json) => {
            dispatch(getContainerTypeFetchSuccess(json));
        })
        .catch(err => dispatch(getContainerTypesFailure(err)));
    };
  }

  export function storeContainerTypes(name) {
    return (dispatch) => {
      //dispatch(getContainerTypes());
      const url = `${global.BASE_URL}containerTypes`;
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


  export function updateContainerTypes(type, id) {
    return (dispatch) => {
      dispatch(getContainerTypes());
      const url = `${global.BASE_URL}containerTypes/${id}`;
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

  export function deleteContainerTypes(id) {
    return (dispatch) => {
      dispatch(getContainerTypes());
      const url = `${global.BASE_URL}containerTypes/${id}`;
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
        .catch(err => dispatch(getContainerTypesFailure(err)));
    };
  }
  
  export function getContainerTypes() {
    return {
      type: FETCHING_CONTAINERTYPES,
    };
  }

  export function getContainerType() {
    return {
      type: FETCHING_CONTAINERTYPE,
    };
  }
  
  export function getContainerTypesSuccess(containerTypes) {
    return {
      type: FETCHING_CONTAINERTYPES_SUCCESS,
      containerTypes,
    };
  }

  export function getContainerTypeFetchSuccess(containerTypes) {
    return {
      type: FETCHING_CONTAINERTYPE_SUCCESS,
      containerTypes,
    };
  }
  
  export function getContainerTypesFailure(err) {
    return {
      type: FETCHING_CONTAINERTYPES_FAILURE,
      err
    };
  }
  