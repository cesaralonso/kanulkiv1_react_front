import {
    FETCHING_WASTEMANAGEMENTS, FETCHING_WASTEMANAGEMENT, FETCHING_WASTEMANAGEMENT_SUCCESS, FETCHING_WASTEMANAGEMENTS_SUCCESS, FETCHING_WASTEMANAGEMENTS_FAILURE, 
  } from '../constants';
import '../../env/globals.js';

  export  function obtainWasteManagements() {
    return (dispatch) => {
      dispatch(getWasteManagements());
      const url = `${global.BASE_URL}wasteManagements`;
     return fetch(url, {
        method: 'GET',
      }).then(data => data.json())
        .then((json) => {
            dispatch(getWasteManagementsSuccess(json));
        })
        .catch(err => dispatch(getWasteManagementsFailure(err)));
    };
  }

  export function fetchWasteManagements(id) {
    return (dispatch) => {
      dispatch(getWasteManagement());
      const url = `${global.BASE_URL}wasteManagements/${id}`;
      fetch(url, {
        method: 'GET',
      }).then(data => data.json())
        .then((json) => {
            dispatch(getWasteManagementFetchSuccess(json));
        })
        .catch(err => dispatch(getWasteManagementsFailure(err)));
    };
  }

  export function storeWasteManagements(stage, code) {
    return (dispatch) => {
      //dispatch(getWasteManagements());
      const url = `${global.BASE_URL}wasteManagements`;
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          stage,
          code
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(data => data.json())
        .then((json) => {
          if(json.errorMessage) {
            json.errorMessage.forEach(el => {
                alert(el.message);
            });

            return false;
           } else {
            alert("Guardado correctamente");
            return true;
           }
          
        })
        .catch(err => JSON.stringify(err));
    };
  }


  export function updateWasteManagements(stage, code, id) {
    return (dispatch) => {
      dispatch(getWasteManagements());
      const url = `${global.BASE_URL}wasteManagements/${id}`;
      return fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
          stage: stage,
          code: code
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

  export function deleteWasteManagements(id) {
    return (dispatch) => {
      dispatch(getWasteManagements());
      const url = `${global.BASE_URL}wasteManagements/${id}`;
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
        .catch(err => dispatch(getWasteManagementsFailure(err)));
    };
  }
  
  export function getWasteManagements() {
    return {
      type: FETCHING_WASTEMANAGEMENTS,
    };
  }

  export function getWasteManagement() {
    return {
      type: FETCHING_WASTEMANAGEMENT,
    };
  }
  
  export function getWasteManagementsSuccess(wasteManagements) {
    return {
      type: FETCHING_WASTEMANAGEMENTS_SUCCESS,
      wasteManagements,
    };
  }

  export function getWasteManagementFetchSuccess(wasteManagements) {
    return {
      type: FETCHING_WASTEMANAGEMENT_SUCCESS,
      wasteManagements,
    };
  }
  
  export function getWasteManagementsFailure(err) {
    return {
      type: FETCHING_WASTEMANAGEMENTS_FAILURE,
      err
    };
  }
  