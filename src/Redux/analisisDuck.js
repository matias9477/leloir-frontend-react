import axios from 'axios'
import { urlAnalisis, urlTiposMuestras } from './../Constants/URLs'

let initialData = {
    fetching: false,
    analisisAll: [],
    upToDateAnalisisAll: false,
    tiposMuestras: [],
    upToDateTiposMuestras: false,
}

let GET_ANALISIS = 'GET_ANALISIS'
let GET_ANALISIS_SUCCESS = 'GET_ANALISIS_SUCCESS'
let GET_ANALISIS_ERROR = 'GET_ANALISIS_ERROR'
let GET_ANALISIS_FROM_STORE = 'GET_ANALISIS_FROM_STORE'

let GET_TIPOS_MUESTRAS = 'GET_TIPOS_MUESTRAS'
let GET_TIPOS_MUESTRAS_SUCCESS = 'GET_TIPOS_MUESTRAS_SUCCESS'
let GET_TIPOS_MUESTRAS_ERROR = 'GET_TIPOS_MUESTRAS_ERROR'
let GET_TIPOS_MUESTRAS_FROM_STORE = 'GET_TIPOS_MUESTRAS_FROM_STORE'

export default function reducer(state = initialData, action){
    switch(action.type){
        case GET_ANALISIS:
            return { ...state, fetching: true }
        case GET_ANALISIS_SUCCESS:
            return { ...state, fetching: false, analisisAll: action.payload, upToDateAnalisisAll:true }
        case GET_ANALISIS_ERROR:
            return { ...state, fetching: false, error: action.payload, upToDateAnalisisAll: false }
        case GET_ANALISIS_FROM_STORE:
            return { ...state, fetching:false, analisisAll: action.payload }

        case GET_TIPOS_MUESTRAS:
            return { ...state, fetching: true }
        case GET_TIPOS_MUESTRAS_SUCCESS:
            return { ...state, fetching: false, tiposMuestras: action.payload, upToDateTiposMuestras:true }
        case GET_TIPOS_MUESTRAS_ERROR:
            return { ...state, fetching: false, error: action.payload, upToDateTiposMuestras: false }
        case GET_TIPOS_MUESTRAS_FROM_STORE:
            return { ...state, fetching:false, tiposMuestras: action.payload }

        default:
            return state
    }
}


export let getAnalisisAction = () => (dispatch, getState) => {
    const state = getState()

    if (state.analisis.upToDateAnalisisAll){
        dispatch({
            type: GET_ANALISIS_FROM_STORE,
            payload: state.analisis.analisisAll
        })
    } else {
        dispatch({
            type: GET_ANALISIS,
        })
        return axios.get(urlAnalisis)
        .then(res=>{
            dispatch({
                type: GET_ANALISIS_SUCCESS,
                payload: Object.values(res.data).flat(),
            })
        })
        .catch(error=>{
            dispatch({
                type: GET_ANALISIS_ERROR,
                payload: error.message
            })
        })
    }
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
