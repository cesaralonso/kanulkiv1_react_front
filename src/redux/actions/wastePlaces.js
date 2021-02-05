import {
    FETCHING_WASTEPLACES, FETCHING_WASTEPLACE, FETCHING_WASTEPLACE_SUCCESS, FETCHING_WASTEPLACES_SUCCESS, FETCHING_WASTEPLACES_FAILURE, 
  } from '../constants';
import '../../env/globals.js';

  export  function obtainWastePlaces() {
    return (dispatch) => {
      dispatch(getWastePlaces());
      const url = `${global.BASE_URL}wastePlaces`;
     return fetch(url, {
        method: 'GET',
      }).then(data => data.json())
        .then((json) => {
            dispatch(getWastePlacesSuccess(json));
        })
        .catch(err => dispatch(getWastePlacesFailure(err)));
    };
  }

  export function fetchWastePlaces(id) {
    return (dispatch) => {
      dispatch(getWastePlace());
      const url = `${global.BASE_URL}wastePlaces/${id}`;
      fetch(url, {
        method: 'GET',
      }).then(data => data.json())
        .then((json) => {
            dispatch(getWastePlaceFetchSuccess(json));
        })
        .catch(err => dispatch(getWastePlacesFailure(err)));
    };
  }

  export function storeWastePlaces(stage, code) {
    return (dispatch) => {
      //dispatch(getWastePlaces());
      const url = `${global.BASE_URL}wastePlaces`;
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


  export function updateWastePlaces(stage, code, id) {
    return (dispatch) => {
      dispatch(getWastePlaces());
      const url = `${global.BASE_URL}wastePlaces/${id}`;
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

  export function deleteWastePlaces(id) {
    return (dispatch) => {
      dispatch(getWastePlaces());
      const url = `${global.BASE_URL}wastePlaces/${id}`;
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
        .catch(err => dispatch(getWastePlacesFailure(err)));
    };
  }
  
  export function getWastePlaces() {
    return {
      type: FETCHING_WASTEPLACES,
    };
  }

  export function getWastePlace() {
    return {
      type: FETCHING_WASTEPLACE,
    };
  }
  
  export function getWastePlacesSuccess(wastePlaces) {
    return {
      type: FETCHING_WASTEPLACES_SUCCESS,
      wastePlaces,
    };
  }

  export function getWastePlaceFetchSuccess(wastePlaces) {
    return {
      type: FETCHING_WASTEPLACE_SUCCESS,
      wastePlaces,
    };
  }
  
  export function getWastePlacesFailure(err) {
    return {
      type: FETCHING_WASTEPLACES_FAILURE,
      err
    };
  }
  