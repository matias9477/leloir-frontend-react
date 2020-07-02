import axios from 'axios'
import { urlMuestras, urlSwichAlta, urlTiposMuestras, urlMuestrasAdd, urlGetMuestraById, urlAlterMuestra } from './../Constants/URLs'
import { getAnalisisByIdAction } from './analisisDuck'

const initialData = {
    fetching: false,
    muestras: [],
    upToDateMuestras: false,
    tiposMuestras: [],
    upToDateTipoMuestras: false,
    muestra: '',
}

let GET_MUESTRAS = 'GET_MUESTRAS'
let GET_MUESTRAS_SUCCESS = 'GET_MUESTRAS_SUCCESS'
let GET_MUESTRAS_ERROR = 'GET_MUESTRAS_ERROR'
let GET_MUESTRAS_FROM_STORE = 'GET_MUESTRAS_FROM_STORE'

let BIT_INVERSE = 'BIT_INVERSE'
let BIT_INVERSE_SUCCESS = 'BIT_INVERSE_SUCCESS'
let BIT_INVERSE_ERROR = 'BIT_INVERSE_ERROR'

let GET_TIPOS_MUESTRAS = 'GET_TIPOS_MUESTRAS'
let GET_TIPOS_MUESTRAS_SUCCESS = 'GET_TIPOS_MUESTRAS_SUCCESS'
let GET_TIPOS_MUESTRAS_ERROR = 'GET_TIPOS_MUESTRAS_ERROR'
let GET_TIPOS_MUESTRAS_FROM_STORE = 'GET_TIPOS_MUESTRAS_FROM_STORE'

let ADD_MUESTRA = 'ADD_MUESTRA'
let ADD_MUESTRA_SUCCESS = 'ADD_MUESTRA_SUCCESS'
let ADD_MUESTRA_ERROR = 'ADD_MUESTRA_ERROR'

let GET_MUESTRA_BY_ID = 'GET_MUESTRA_BY_ID'
let GET_MUESTRA_BY_ID_SUCCESS = 'GET_MUESTRA_BY_ID_SUCCESS'
let GET_MUESTRA_BY_ID_ERROR = 'GET_MUESTRA_BY_ID_ERROR'

let ALTER_MUESTRA = 'ALTER_MUESTRA'
let ALTER_MUESTRA_SUCCESS = 'ALTER_MUESTRA_SUCCESS'
let ALTER_MUESTRA_ERROR = 'ALTER_MUESTRA_ERROR'


export default function reducer(state = initialData, action){
    switch(action.type){
        case GET_MUESTRAS:
            return { ...state, fetching: true }
        case GET_MUESTRAS_SUCCESS:
            return { ...state, fetching: false, muestras: action.payload, upToDateMuestras:true }
        case GET_MUESTRAS_ERROR:
            return { ...state, fetching: false, error: action.payload, upToDateMuestras: false }
        case GET_MUESTRAS_FROM_STORE:
            return { ...state, fetching:false, muestras: action.payload }

        case BIT_INVERSE:
            return {...state, fetching:true}
        case BIT_INVERSE_ERROR:
            return {...state, fetching:false, error:action.payload, upToDateMuestras: false }
        case BIT_INVERSE_SUCCESS:
            return {...state, fetching:false, upToDateMuestras:false }

        case GET_TIPOS_MUESTRAS:
            return { ...state, fetching: true }
        case GET_TIPOS_MUESTRAS_SUCCESS:
            return { ...state, fetching: false, tiposMuestras: action.payload, upToDateTipoMuestras: true }
        case GET_TIPOS_MUESTRAS_ERROR:
            return { ...state, fetching: false, error: action.payload, upToDateTipoMuestras: false  }
        case GET_TIPOS_MUESTRAS_FROM_STORE:
            return { ...state, fetching:false, tiposMuestras: action.payload }

        case ADD_MUESTRA:
            return {...state, fetching:true}
        case ADD_MUESTRA_SUCCESS:
            return {...state, fetching:false, upToDateMuestras: false }
        case ADD_MUESTRA_ERROR:
            return {...state, fetching:false, error:action.payload, upToDateMuestras: true }
        
        case GET_MUESTRA_BY_ID:
            return { ...state, fetching: true }
        case GET_MUESTRA_BY_ID_SUCCESS:
            return { ...state, fetching: false, muestra: action.payload }
        case GET_MUESTRA_BY_ID_ERROR:
            return { ...state, fetching: false, error: action.payload }

        case ALTER_MUESTRA:
            return {...state, fetching:true}
        case ALTER_MUESTRA_SUCCESS:
            return {...state, fetching:false, upToDateMuestras:false}
        case ALTER_MUESTRA_ERROR:
            return {...state, fetching:false, error:action.payload}

    
        default:
            return state
    }
}


export let getMuestrasAction = () => (dispatch, getState) => {
    const state = getState()

    if (state.muestras.upToDateMuestras){
        dispatch({
            type: GET_MUESTRAS_FROM_STORE,
            payload: state.muestras.muestras
        })
    } else {
        dispatch({
            type: GET_MUESTRAS,
        })
        return axios.get(urlMuestras)
        .then(res=>{
            dispatch({
                type: GET_MUESTRAS_SUCCESS,
                payload: Object.values(res.data).flat(),
            })
        })
        .catch(error=>{
            dispatch({
                type: GET_MUESTRAS_ERROR,
                payload: error.message
            })
        })
    }
}

export let switchAltaAction = (id) => (dispatch, getState) =>{
    const url = window.document.location.pathname

    dispatch({
        type: BIT_INVERSE,
    })

    return axios.put(`${urlSwichAlta}${id}`)
    .then(res=>{
        dispatch({
            type: BIT_INVERSE_SUCCESS,
        })
        if (url === '/muestras'){
            return dispatch(getMuestrasAction(), alert('La operación se ha realizado con éxito.'))
        }
        else {
            return dispatch(getMuestraByIdAction(id))
        }
    })
    .catch(err=>{
        dispatch({
            type: BIT_INVERSE_ERROR,
            payload: err.message
        })
        alert('No se ha podido realizar la operación. Por favor intente nuevamente.')
    })
}

export let getTiposMuestrasAction = () => (dispatch, getState) => {
    const state = getState()

    if (state.muestras.upToDateTipoMuestras){
        dispatch({
            type: GET_TIPOS_MUESTRAS_FROM_STORE,
            payload: state.muestras.tiposMuestras
        })
    } else {
        dispatch({
            type: GET_TIPOS_MUESTRAS,
        })
        return axios.get(urlTiposMuestras)
        .then(res=>{
            dispatch({
                type: GET_TIPOS_MUESTRAS_SUCCESS,
                payload: Object.values(res.data).flat(),
            })
        })
        .catch(error=>{
            dispatch({
                type: GET_TIPOS_MUESTRAS_ERROR,
                payload: error.message
            })
        })
    }
}

export let addMuestraAction = (data) => (dispatch, getState) => {
    dispatch({
        type: ADD_MUESTRA,
    })
    return axios.post(urlMuestrasAdd, data)
    .then(res=>{
        dispatch({
            type: ADD_MUESTRA_SUCCESS,
        })
        return dispatch(getAnalisisByIdAction(data.analisisId), alert(`Se ha registrado la muestra con éxito.`))
    })
    .catch(error=>{
        dispatch({
            type: ADD_MUESTRA_ERROR,
            payload: error.message
        })
        alert(`No se ha registrado la muestra con éxito. Por favor intente nuevamente.`)
    })
    
}

export let getMuestraByIdAction = (id) => (dispatch, getState) => {

    dispatch({
        type: GET_MUESTRA_BY_ID,
    })
    return axios.get(`${urlGetMuestraById}${id}`)
        .then(res=>{
            dispatch({
                type: GET_MUESTRA_BY_ID_SUCCESS,
                payload: res.data,
            })
        })
        .catch(err=>{
            dispatch({
                type: GET_MUESTRA_BY_ID_ERROR,
                payload: err.message
            })
        })
}

export let alterMuestraAction = (id, data) => (dispatch, getState) => {
    dispatch({
        type: ALTER_MUESTRA,
    })
    return axios.put(`${urlAlterMuestra}${id}`, data)
        .then(res=>{
            dispatch({
                type: ALTER_MUESTRA_SUCCESS
            })
            return dispatch(getMuestraByIdAction(id))
        })
        .catch(err=>{
            dispatch({
                type: ALTER_MUESTRA_ERROR,
                payload: err.message
            })
            return dispatch(getMuestraByIdAction(id), alert('No se ha podido modificar la muestra. Por favor intente nuevamente.'))
        })
}