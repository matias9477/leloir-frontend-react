import axios from 'axios'
import {urlDeterminaciones, urlAltaDeterminacion, urlSwitchAltaDeterminacion, urlGetDeterminacionById} from '../Constants/URLs'

let initialData = {
    fetching: false,
    determinaciones: [],
    upToDateAllDeterminaciones: false,
}

let GET_DETERMINACIONES = "GET_DETERMINACIONES"
let GET_DETERMINACIONES_SUCCESS = "GET_DETERMINACIONES_SUCCESS"
let GET_DETERMINACIONES_ERROR = "GET_DETERMINACIONES_ERROR" 
let GET_DETERMINACIONES_FROM_STORE = "GET_DETERMINACIONES_FROM_STORE"

let ADD_DETERMINACION = 'ADD_DETERMINACION'
let ADD_DETERMINACION_SUCCESS = 'ADD_DETERMINACION_SUCCESS'
let ADD_DETERMINACION_ERROR = 'ADD_DETERMINACION_ERROR'


export default function reducer (state=initialData, action){
    switch(action.type){
    case GET_DETERMINACIONES:
        return {...state, fetching:true}
    case GET_DETERMINACIONES_ERROR:
        return {...state, fetching:false, error:action.payload}
    case GET_DETERMINACIONES_SUCCESS:
        return {...state, fetching:false, determinaciones:action.payload, upToDateAllDeterminaciones:true}
    case GET_DETERMINACIONES_FROM_STORE:
        return {...state, fetching:false, determinaciones:action.payload}       
    case ADD_DETERMINACION:
        return {...state, fetching:true}
    case ADD_DETERMINACION_ERROR:
        return {...state, fetching:false, error:action.payload, upToDateAllDeterminaciones:true}
    case ADD_DETERMINACION_SUCCESS:
        return {...state, fetching:false, upToDateAllDeterminaciones:false}     
    default:
        return state
    }
}

export let getDeterminacionesAction = () => (dispatch, getState) =>{
    const state = getState()

    if(state.determinaciones.upToDateAllDeterminaciones){
        dispatch({
            type: GET_DETERMINACIONES_FROM_STORE,
            payload: state.determinaciones.determinaciones,
        })
    }else{
        dispatch({
            type: GET_DETERMINACIONES,
        })
        return axios.get(urlDeterminaciones)
        .then(res=>{
            dispatch({
                type: GET_DETERMINACIONES_SUCCESS,
                payload: Object.values(res.data).flat(),
            })
        })
        .catch(err=>{
            dispatch({
                type: GET_DETERMINACIONES_ERROR,
                payload: err.message
            })
        })
    }
}

export let addDeterminacionAction = (data) => (dispatch, getState) =>{
    dispatch({
        type: ADD_DETERMINACION
    })
    return axios.post(urlAltaDeterminacion, data)
    .then(res =>{
        dispatch({
            type: ADD_DETERMINACION_SUCCESS
        })
        alert(`Se ha registrado la determinacion ${data.descripcionPractica} con éxito`)
    })
    .catch(err=>{
        dispatch({
            type: ADD_DETERMINACION_ERROR,
            payload: err.message
        })
        alert(`No se ha podido registrar la determinación ${data.descripcionPractica}. Por favor intente nuevamente`)
    })
}