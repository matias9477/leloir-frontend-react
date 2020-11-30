import axios from 'axios';
import { urlTransacciones, urlAddTransaccion, urlFormaDePago, urlConceptos, urlTransaccionById } from '../Constants/URLs';

//constants
let initialData = {
  fetching: false,
  transacciones: [],
  upToDateAllTransacciones: false,
  upToDateTransaccionById: false,
  transaction:'',
  formasDePago: [],
  upToDateAllFormasDePago: false,
  conceptos: [],
  upToDateAllConceptos: false,
};

let GET_TRANSACCIONES = "GET_TRANSACCIONES";
let GET_TRANSACCIONES_SUCCESS = "GET_TRANSACCIONES_SUCCESS";
let GET_TRANSACCIONES_ERROR = "GET_TRANSACCIONES_ERROR";
let GET_TRANSACCIONES_FROM_STORE = "GET_TRANSACCIONES_FROM_STORE";

let ADD_TRANSACCION = "ADD_TRANSACCION"
let ADD_TRANSACCION_SUCCESS = "ADD_TRANSACCION_SUCCESS"
let ADD_TRANSACCION_ERROR = "ADD_TRANSACCION_ERROR"

let GET_FORMAS_DE_PAGO = "GET_FORMAS_DE_PAGO";
let GET_FORMAS_DE_PAGO_SUCCESS = "GET_FORMAS_DE_PAGO_SUCCESS";
let GET_FORMAS_DE_PAGO_ERROR = "GET_FORMAS_DE_PAGO_ERROR";
let GET_FORMAS_DE_PAGO_FROM_STORE = "GET_FORMAS_DE_PAGO_FROM_STORE";

let GET_CONCEPTOS = "GET_CONCEPTOS";
let GET_CONCEPTOS_SUCCESS = "GET_CONCEPTOS_SUCCESS";
let GET_CONCEPTOS_ERROR = "GET_CONCEPTOS_ERROR";
let GET_CONCEPTOS_FROM_STORE = "GET_CONCEPTOS_FROM_STORE";

let GET_TRANSACCION_BY_ID = "GET_TRANSACCION_BY_ID"
let GET_TRANSACCION_BY_ID_SUCCESS = "GET_TRANSACCION_BY_ID_SUCCESS"
let GET_TRANSACCION_BY_ID_ERROR = "GET_TRANSACCION_BY_ID_ERROR"


//reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_TRANSACCIONES:
      return { ...state, fetching: true };
    case GET_TRANSACCIONES_SUCCESS:
        return { ...state, fetching: false, transacciones: action.payload, upToDateAllTransacciones: true };
    case GET_TRANSACCIONES_ERROR:
      return { ...state, fetching: false, error: action.payload, upToDateAllTransacciones: false };
    case GET_TRANSACCIONES_FROM_STORE:
      return { ...state, fetching: false, transacciones: action.payload };

    case ADD_TRANSACCION:
      return {...state, fetching:true}
    case ADD_TRANSACCION_SUCCESS:
      return {...state, fetching:false, upToDateAllTransacciones: false }
    case ADD_TRANSACCION_ERROR:
      return {...state, fetching:false, error:action.payload, upToDateAllTransacciones: true }

    case GET_FORMAS_DE_PAGO:
      return { ...state, fetching: true };
    case GET_FORMAS_DE_PAGO_SUCCESS:
        return { ...state, fetching: false, formasDePago: action.payload, upToDateAllFormasDePago:true};
    case GET_FORMAS_DE_PAGO_ERROR:
      return { ...state, fetching: false, error: action.payload, upToDateAllFormasDePago:false};
    case GET_FORMAS_DE_PAGO_FROM_STORE:
      return { ...state, fetching: false, formasDePago: action.payload };

    case GET_CONCEPTOS:
      return { ...state, fetching: true };
    case GET_CONCEPTOS_SUCCESS:
        return { ...state, fetching: false, conceptos: action.payload, upToDateAllConceptos:true};
    case GET_CONCEPTOS_ERROR:
      return { ...state, fetching: false, error: action.payload, upToDateAllConceptos:false};
    case GET_CONCEPTOS_FROM_STORE:
      return { ...state, fetching: false, conceptos: action.payload };

    case GET_TRANSACCION_BY_ID:
      return {...state, fetching: true}
    case GET_TRANSACCION_BY_ID_ERROR:
      return {...state, fetching: false, error: action.payload}

    case GET_TRANSACCION_BY_ID_SUCCESS:
      return {...state, fetching: false, transaction: action.payload, upToDateTransaccionById: true}

    default:
      return state;
  }
}


export let getTransaccionesAction = () => (dispatch, getState) => {
  const state = getState();

  if (state.caja.upToDateAllTransacciones) {
    dispatch({
      type: GET_TRANSACCIONES_FROM_STORE,
      payload: state.caja.transacciones,
    });
  } else {
    dispatch({
      type: GET_TRANSACCIONES,
    });
    return axios
      .get(urlTransacciones)
      .then((res) => {
        dispatch({
          type: GET_TRANSACCIONES_SUCCESS,
          payload: Object.values(res.data.transacciones).flat(),
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_TRANSACCIONES_ERROR,
          payload: err.message,
        });
      });
  }
}

export let addTransaccionAction = (data) => (dispatch, getState) => {
  dispatch({
      type: ADD_TRANSACCION,
  })
  return axios.post(urlAddTransaccion, data)
  .then(res=>{
      dispatch({
          type: ADD_TRANSACCION_SUCCESS,
      })
      alert(`Se ha registrado la transacción con éxito.`)
  })
  .catch(error=>{
      dispatch({
          type: ADD_TRANSACCION_ERROR,
          payload: error.message
      })
      alert(`No se ha podido registrar la transacción. Por favor intente nuevamente.`)
  })
  
}

export let getFormasDePagoAction = () => (dispatch, getState) => {
  const state = getState();

  if (state.caja.upToDateAllFormasDePago) {
    dispatch({
      type: GET_FORMAS_DE_PAGO_FROM_STORE,
      payload: state.caja.transacciones,
    });
  } else {
    dispatch({
      type: GET_FORMAS_DE_PAGO,
    });
    return axios
      .get(urlFormaDePago)
      .then((res) => {
        dispatch({
          type: GET_FORMAS_DE_PAGO_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_FORMAS_DE_PAGO_ERROR,
          payload: err.message,
        });
      });
  }
}

export let getConceptosAction = () => (dispatch, getState) => {
  const state = getState();

  if (state.caja.upToDateAllConceptos) {
    dispatch({
      type: GET_CONCEPTOS_FROM_STORE,
      payload: state.caja.transacciones,
    });
  } else {
    dispatch({
      type: GET_CONCEPTOS,
    });
    return axios
      .get(urlConceptos)
      .then((res) => {
        dispatch({
          type: GET_CONCEPTOS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_CONCEPTOS_ERROR,
          payload: err.message,
        });
      });
  }
}

export let getTransaccionByIdAction = (id) => (dispatch, getState) => {

  dispatch({
      type: GET_TRANSACCION_BY_ID,
  })
  return axios.get(`${urlTransaccionById}${id}`)
  .then(res=>{
      dispatch({
          type: GET_TRANSACCION_BY_ID_SUCCESS,
          payload: res.data,
      })
  })
  .catch(err=>{
      dispatch({
          type: GET_TRANSACCION_BY_ID_ERROR,
          payload: err.message
      })
  })
}