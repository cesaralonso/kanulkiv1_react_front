import {
    FETCHING_STATICCONTAINERS, FETCHING_STATICCONTAINER, FETCHING_STATICCONTAINER_SUCCESS, FETCHING_STATICCONTAINERS_SUCCESS, FETCHING_STATICCONTAINERS_FAILURE, 
  } from '../constants';
import '../../env/globals.js';

  export  function obtainStaticContainers() {
    return (dispatch) => {
      dispatch(getStaticContainers());
      const url = `${global.BASE_URL}staticContainers`;
     return fetch(url, {
        method: 'GET',
      }).then(data => data.json())
        .then((json) => {
            dispatch(getStaticContainersSuccess(json));
        })
        .catch(err => dispatch(getStaticContainersFailure(err)));
    };
  }

  export function fetchStaticContainers(id) {
    return (dispatch) => {
      dispatch(getStaticContainer());
      const url = `${global.BASE_URL}staticContainers/${id}`;
      fetch(url, {
        method: 'GET',
      }).then(data => data.json())
        .then((json) => {
            dispatch(getStaticContainerFetchSuccess(json));
        })
        .catch(err => dispatch(getStaticContainersFailure(err)));
    };
  }

  export function storeStaticContainers(name) {
    return (dispatch) => {
      //dispatch(getStaticContainers());
      const url = `${global.BASE_URL}staticContainers`;
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


  export function updateStaticContainers(type, id) {
    return (dispatch) => {
      dispatch(getStaticContainers());
      const url = `${global.BASE_URL}staticContainers/${id}`;
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

  export function deleteStaticContainers(licenceTypeId) {
    return (dispatch) => {
      dispatch(getStaticContainers());
      const url = `${global.BASE_URL}staticContainers/${licenceTypeId}`;
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
        .catch(err => dispatch(getStaticContainersFailure(err)));
    };
  }
  
  export function getStaticContainers() {
    return {
      type: FETCHING_STATICCONTAINERS,
    };
  }

  export function getStaticContainer() {
    return {
      type: FETCHING_STATICCONTAINER,
    };
  }
  
  export function getStaticContainersSuccess(staticContainers) {
    return {
      type: FETCHING_STATICCONTAINERS_SUCCESS,
      staticContainers,
    };
  }

  export function getStaticContainerFetchSuccess(staticContainers) {
    return {
      type: FETCHING_STATICCONTAINER_SUCCESS,
      staticContainers,
    };
  }
  
  export function getStaticContainersFailure(err) {
    return {
      type: FETCHING_STATICCONTAINERS_FAILURE,
      err
    };
  }
  