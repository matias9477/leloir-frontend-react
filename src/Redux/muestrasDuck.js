import axios from 'axios'
import { urlMuestras, urlSwichAlta, urlTiposMuestras, urlMuestrasAdd } from './../Constants/URLs'
import { getAnalisisByIdAction } from './analisisDuck'

const initialData = {
    fetching: false,
    muestras: [],
    upToDateMuestras: false,
    tiposMuestras: [],
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
            return { ...state, fetching: false, tiposMuestras: action.payload }
        case GET_TIPOS_MUESTRAS_ERROR:
            return { ...state, fetching: false, error: action.payload  }
        case GET_TIPOS_MUESTRAS_FROM_STORE:
            return { ...state, fetching:false, tiposMuestras: action.payload }

        case ADD_MUESTRA:
            return {...state, fetching:true}
        case ADD_MUESTRA_SUCCESS:
            return {...state, fetching:false, upToDateMuestras: false }
        case ADD_MUESTRA_ERROR:
            return {...state, fetching:false, error:action.payload, upToDateMuestras: true }

        default:
            return state
    }
}


export let getMuestrasAction = () => (dispatch, getState) => {
    const state = getState()

    if (state.analisis.upToDateAnalisisAll){
        dispatch({
            type: GET_MUESTRAS_FROM_STORE,
            payload: state.analisis.analisisAll
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

    if (state.analisis.upToDateTiposMuestras){
        dispatch({
            type: GET_TIPOS_MUESTRAS_FROM_STORE,
            payload: state.analisis.tiposMuestras
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