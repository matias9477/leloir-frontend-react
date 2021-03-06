import axios from 'axios'
import {urlDeterminaciones,urlAlterDeterminacionConUnidad, urlAlterDeterminacion, urlAltaDeterminacion, urlAltaDeterminacionConUnidad, urlSwitchAltaDeterminacion, urlGetDeterminacionById} from '../Constants/URLs'

let initialData = {
    fetching: false,
    determinaciones: [],
    upToDateAllDeterminaciones: false,
    determinacion: '',
    upToDateDeterminacionById: false,
}

let GET_DETERMINACIONES = "GET_DETERMINACIONES"
let GET_DETERMINACIONES_SUCCESS = "GET_DETERMINACIONES_SUCCESS"
let GET_DETERMINACIONES_ERROR = "GET_DETERMINACIONES_ERROR" 
let GET_DETERMINACIONES_FROM_STORE = "GET_DETERMINACIONES_FROM_STORE"

let ADD_DETERMINACION = 'ADD_DETERMINACION'
let ADD_DETERMINACION_SUCCESS = 'ADD_DETERMINACION_SUCCESS'
let ADD_DETERMINACION_ERROR = 'ADD_DETERMINACION_ERROR'

let ADD_DETERMINACION_CON_UNIDAD = 'ADD_DETERMINACION_CON_UNIDAD'
let ADD_DETERMINACION_CON_UNIDAD_SUCCESS = 'ADD_DETERMINACION_CON_UNIDAD_SUCCESS'
let ADD_DETERMINACION_CON_UNIDAD_ERROR = 'ADD_DETERMINACION_CON_UNIDAD_ERROR'

let GET_DETERMINACION_BY_ID = 'GET_DETERMINACION_BY_ID'
let GET_DETERMINACION_BY_ID_ERROR = 'GET_DETERMINACION_BY_ID_ERROR'
let GET_DETERMINACION_BY_ID_SUCCESS = 'GET_DETERMINACION_BY_ID_SUCCESS'

let BIT_INVERSE = 'BIT_INVERSE'
let BIT_INVERSE_SUCCESS = 'BIT_INVERSE_SUCCESS'
let BIT_INVERSE_ERROR = 'BIT_INVERSE_ERROR'

let ALTER_DETERMINACION = 'ALTER_DETERMINACION'
let ALTER_DETERMINACION_SUCCESS = 'ALTER_DETERMINACION_SUCCESS'
let ALTER_DETERMINACION_ERROR = 'ALTER_DETERMINACION_ERROR'

let ALTER_DETERMINACION_CON_UNIDAD = 'ALTER_DETERMINACION_CON_UNIDAD'
let ALTER_DETERMINACION_CON_UNIDAD_SUCCESS = 'ALTER_DETERMINACION_CON_UNIDAD_SUCCESS'
let ALTER_DETERMINACION_CON_UNIDAD_ERROR = 'ALTER_DETERMINACION_CON_UNIDAD_ERROR'

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

    case GET_DETERMINACION_BY_ID:
        return {...state, fetching:true}
    case GET_DETERMINACION_BY_ID_ERROR:
        return {...state, fetching:false, error:action.payload}
    case GET_DETERMINACION_BY_ID_SUCCESS:
        return {...state, fetching:false, determinacion: action.payload}

    case BIT_INVERSE:
        return {...state, fetching:true}
    case BIT_INVERSE_ERROR:
        return {...state, fetching:false, error:action.payload, upToDateAllDeterminaciones:true}
    case BIT_INVERSE_SUCCESS:
        return {...state, fetching:false, upToDateAllDeterminaciones:false}

    case ALTER_DETERMINACION:
        return {...state, fetching:true}
    case ALTER_DETERMINACION_SUCCESS:
        return {...state, fetching:false, upToDateAllDeterminaciones:false, upToDateDeterminacionById:false}
    case ALTER_DETERMINACION_ERROR:
        return {...state, fetching:false, error:action.payload}
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
        alert(`Se ha registrado la determinacion ${data.descripcionPractica} con ??xito`)
    })
    .catch(err=>{
        dispatch({
            type: ADD_DETERMINACION_ERROR,
            payload: err.message
        })
        alert(`No se ha podido registrar la determinaci??n ${data.descripcionPractica}. Por favor intente nuevamente`)
    })
}

export let addDeterminacionConUnidadAction = (data) => (dispatch, getState) =>{
    dispatch({
        type: ADD_DETERMINACION_CON_UNIDAD
    })
    return axios.post(urlAltaDeterminacionConUnidad, data)
    .then(res =>{
        dispatch({
            type: ADD_DETERMINACION_CON_UNIDAD_SUCCESS
        })
        alert(`Se ha registrado la determinacion ${data.descripcionPractica} con ??xito`)
    })
    .catch(err=>{
        dispatch({
            type: ADD_DETERMINACION_CON_UNIDAD_ERROR,
            payload: err.message
        })
        alert(`No se ha podido registrar la determinaci??n ${data.descripcionPractica}. Por favor intente nuevamente`)
    })
}

export let modDeterminacionConUnidadAction = (id, data) => (dispatch, getState) =>{
    dispatch({
        type: ALTER_DETERMINACION_CON_UNIDAD
    })
    return axios.put(`${urlAlterDeterminacionConUnidad}${id}`, data)
    .then(res=>{
        dispatch({
            type: ALTER_DETERMINACION_CON_UNIDAD_SUCCESS
        })
        return dispatch(getDeterminacionByIdAction(id), alert('Se ha modificado la determinaci??n con ??xito.'))
    })
    .catch(err=>{
        dispatch({
            type: ALTER_DETERMINACION_CON_UNIDAD_ERROR,
            payload: err.message
        })
        return dispatch(getDeterminacionByIdAction(id), alert('No se ha podido modificar la determinaci??nl. Por favor intente nuevamente.'))
    })
}

export let modDeterminacionAction = (id, data) => (dispatch, getState) =>{
    dispatch({
        type: ALTER_DETERMINACION
    })
    return axios.put(`${urlAlterDeterminacion}${id}`, data)
    .then(res=>{
        dispatch({
            type: ALTER_DETERMINACION_SUCCESS
        })
        return dispatch(getDeterminacionByIdAction(id), alert('Se ha modificado la determinaci??n con ??xito.'))
    })
    .catch(err=>{
        dispatch({
            type: ALTER_DETERMINACION_ERROR,
            payload: err.message
        })
        return dispatch(getDeterminacionByIdAction(id), alert('No se ha podido modificar la determinaci??nl. Por favor intente nuevamente.'))
    })
}

export let getDeterminacionByIdAction = (id) => (dispatch, getState) =>{
    dispatch({
        type: GET_DETERMINACION_BY_ID,
    })
    return axios.get(`${urlGetDeterminacionById}${id}`)
        .then(res=>{
            dispatch({
                type: GET_DETERMINACION_BY_ID_SUCCESS,
                payload: res.data,
            })
        })
        .catch(err=>{
            dispatch({
                type: GET_DETERMINACION_BY_ID_ERROR,
                payload: err.message
            })
        })
}


export let switchAltaAction = (id) => (dispatch, getState) =>{
    const url = window.document.location.pathname

    dispatch({
        type: BIT_INVERSE,
    })

    return axios.put(`${urlSwitchAltaDeterminacion}${id}`)
    .then(res=>{
        dispatch({
            type: BIT_INVERSE_SUCCESS,
        })
        if (url === '/determinaciones'){
            return dispatch(getDeterminacionesAction(), alert('La operaci??n se ha realizado con ??xito.'))
        }
        else {
            return dispatch(getDeterminacionByIdAction(id), alert('La operaci??n se ha realizado con ??xito.'))
        }
    })
    .catch(err=>{
        dispatch({
            type: BIT_INVERSE_ERROR,
            payload: err.message
        })
        alert('No se ha podido realizar la operaci??n. Por favor intente nuevamente.')
    })
}