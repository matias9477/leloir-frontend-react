import axios from "axios";
import { urlTransacciones } from "../Constants/URLs";

//constants
let initialData = {
  fetching: false,
  transacciones: [],
  upToDateAllTransacciones: false,
};

let GET_TRANSACCIONES = "GET_TRANSACCIONES";
let GET_TRANSACCIONES_SUCCESS = "GET_TRANSACCIONES_SUCCESS";
let GET_TRANSACCIONES_ERROR = "GET_TRANSACCIONES_ERROR";
let GET_TRANSACCIONES_FROM_STORE = "GET_TRANSACCIONES_FROM_STORE";

//reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_TRANSACCIONES:
      return { ...state, fetching: true };
    case GET_TRANSACCIONES_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload,
        upToDateAllTransacciones: false,
      };
    case GET_TRANSACCIONES_SUCCESS:
      return {
        ...state,
        fetching: false,
        transacciones: action.payload,
        upToDateAllTransacciones: true,
      };
    case GET_TRANSACCIONES_FROM_STORE:
      return { ...state, fetching: false, transacciones: action.payload };
    default:
      return state;
  }
}

//actions
export let getTransaccionesAction = () => (dispatch, getState) => {
  //HOW TO usar el estado para poner una condición para las httprequest
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
          payload: Object.values(res.data).flat(),
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_TRANSACCIONES_ERROR,
          payload: err.message,
        });
      });
  }
};
