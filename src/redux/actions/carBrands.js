import {
    FETCHING_CARBRANDS, FETCHING_CARBRAND, FETCHING_CARBRAND_SUCCESS, FETCHING_CARBRANDS_SUCCESS, FETCHING_CARBRANDS_FAILURE, 
  } from '../constants';
import '../../env/globals.js';

  export  function obtainCarBrands() {
    return (dispatch) => {
      dispatch(getCarBrands());
      const url = `${global.BASE_URL}carBrands`;
     return fetch(url, {
        method: 'GET',
      }).then(data => data.json())
        .then((json) => {
            dispatch(getCarBrandsSuccess(json));
        })
        .catch(err => dispatch(getCarBrandsFailure(err)));
    };
  }

  export function fetchCarBrands(id) {
    return (dispatch) => {
      dispatch(getCarBrand());
      const url = `${global.BASE_URL}carBrands/${id}`;
      fetch(url, {
        method: 'GET',
      }).then(data => data.json())
        .then((json) => {
            dispatch(getCarBrandFetchSuccess(json));
        })
        .catch(err => dispatch(getCarBrandsFailure(err)));
    };
  }

  export function storeCarBrands(name) {
    return (dispatch) => {
      //dispatch(getCarBrands());
      const url = `${global.BASE_URL}carBrands`;
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


  export function updateCarBrands(type, id) {
    return (dispatch) => {
      dispatch(getCarBrands());
      const url = `${global.BASE_URL}carBrands/${id}`;
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

  export function deleteCarBrands(licenceTypeId) {
    return (dispatch) => {
      dispatch(getCarBrands());
      const url = `${global.BASE_URL}carBrands/${licenceTypeId}`;
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
        .catch(err => dispatch(getCarBrandsFailure(err)));
    };
  }
  
  export function getCarBrands() {
    return {
      type: FETCHING_CARBRANDS,
    };
  }

  export function getCarBrand() {
    return {
      type: FETCHING_CARBRAND,
    };
  }
  
  export function getCarBrandsSuccess(carBrands) {
    return {
      type: FETCHING_CARBRANDS_SUCCESS,
      carBrands,
    };
  }

  export function getCarBrandFetchSuccess(carBrands) {
    return {
      type: FETCHING_CARBRAND_SUCCESS,
      carBrands,
    };
  }
  
  export function getCarBrandsFailure(err) {
    return {
      type: FETCHING_CARBRANDS_FAILURE,
      err
    };
  }
  