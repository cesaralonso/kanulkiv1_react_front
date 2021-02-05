import {
    FETCHING_DRIVERS, FETCHING_DRIVERS_SUCCESS, FETCHING_DRIVERS_FAILURE,
  } from '../constants';
  
  export function obtainDrivers() {
    return (dispatch) => {
      dispatch(getDrivers());
      const url = `${GLOBAL.BASE_URL}drivers`;
      fetch(url, {
        method: 'GET',
      }).then(data => data.json())
        .then((json) => {
            dispatch(getDriversSuccess(json));
        })
        .catch(err => dispatch(getDriversFailure(err)));
    };
  }

  export function storeDriver(user,token,typecard) {
    return (dispatch) => {
      dispatch(getTarjetas());
      const url = `${GLOBAL.BASE_URL}add-card`;
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          user_id: user,
          card_token:token,
          type:typecard
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(data => data.json())
        .then((json) => {
          if(json.data)
          {
            alert("Tarjeta agregada correctamente");
            obtenerTarjetas(user);
          }else{
              alert("La tarjeta no pudo ser agregada");
          }
          
        })
        .catch(err => JSON.stringify(err));
    };
  }

  export function eliminarTarjeta(cardId,userId) {
    return (dispatch) => {
      dispatch(getTarjetas());
      const url = `${GLOBAL.BASE_URL}remove-card`;
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          card_id: cardId,
          user_id:userId
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(data => data.json())
        .then((json) => {
          alert("Tarjeta eliminada correctamente");
        })
        .catch(err => dispatch(getTarjetasFailure(err)));
    };
  }
  
  export function getTarjetas() {
    return {
      type: FETCHING_TARJETAS,
    };
  }
  
  export function getTarjetasSuccess(data) {
    return {
      type: FETCHING_TARJETAS_SUCCESS,
      data,
    };
  }
  
  export function getTarjetasFailure(err) {
    return {
      type: FETCHING_TARJETAS_FAILURE,
    };
  }
  