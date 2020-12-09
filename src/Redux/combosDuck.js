import axios from 'axios';
import { urlDocs, urlPaises, urlSexos, urlPlanes, urlTiposAnimales } from './../Constants/URLs';

let initialData = {
    fetching: false,
    documentos: [],
    upToDateAllDocumentos: false,
    sexos: [],
    upToDateAllSexos: false,
    paises: [],
    upToDateAllPaises: false,
    planes: [],
    tiposAnimales: [],
    upToDateAllAnimales: false,
}


let GET_DOCUMENTOS = 'GET_DOCUMENTOS'
let GET_DOCUMENTOS_SUCCESS = 'GET_DOCUMENTOS_SUCCESS'
let GET_DOCUMENTOS_ERROR = 'GET_DOCUMENTOS_ERROR'
let GET_DOCUMENTOS_FROM_STORE = 'GET_DOCUMENTOS_FROM_STORE'

let GET_SEXOS = 'GET_SEXOS'
let GET_SEXOS_SUCCESS = 'GET_SEXOS_SUCCESS'
let GET_SEXOS_ERROR = 'GET_SEXOS_ERROR'
let GET_SEXOS_FROM_STORE = 'GET_SEXOS_FROM_STORE'

let GET_PAISES = 'GET_PAISES'
let GET_PAISES_SUCCESS = 'GET_PAISES_SUCCESS'
let GET_PAISES_ERROR = 'GET_PAISES_ERROR'
let GET_PAISES_FROM_STORE = 'GET_PAISES_FROM_STORE'

let GET_PLANES = 'GET_PLANES'
let GET_PLANES_SUCCESS = 'GET_PLANES_SUCCESS'
let GET_PLANES_ERROR = 'GET_PLANES_ERROR'

let GET_TIPOS_ANIMALES = 'GET_TIPOS_ANIMALES'
let GET_TIPOS_ANIMALES_SUCCESS = 'GET_TIPOS_ANIMALES_SUCCESS'
let GET_TIPOS_ANIMALES_ERROR = 'GET_TIPOS_ANIMALES_ERROR'
let GET_TIPOS_ANIMALES_FROM_STORE = 'GET_TIPOS_ANIMALES_FROM_STORE'


export default function reducer(state = initialData, action) {
    switch(action.type){
        case GET_DOCUMENTOS:
            return {...state, fetching: true}
        case GET_DOCUMENTOS_SUCCESS:
            return {...state, fetching: false, documentos: action.payload, upToDateAllDocumentos:true }
        case GET_DOCUMENTOS_ERROR:
            return {...state, fetching: false, error: action.payload}
        case GET_DOCUMENTOS_FROM_STORE:
            return {...state, fetching:false, documentos: action.payload}

        case GET_SEXOS:
            return {...state, fetching: true}
        case GET_SEXOS_SUCCESS:
            return {...state, fetching: false, sexos: action.payload, upToDateAllSexos:true }
        case GET_SEXOS_ERROR:
            return {...state, fetching: false, error: action.payload}
        case GET_SEXOS_FROM_STORE:
            return {...state, fetching:false, sexos: action.payload}

        case GET_PAISES:
            return {...state, fetching: true}
        case GET_PAISES_SUCCESS:
            return {...state, fetching: false, paises: action.payload, upToDateAllPaises:true }
        case GET_PAISES_ERROR:
            return {...state, fetching: false, error: action.payload}
        case GET_PAISES_FROM_STORE:
            return {...state, fetching:false, paises: action.payload}
        
        case GET_PLANES:
            return {...state, fetching: true}
        case GET_PLANES_SUCCESS:
            return {...state, fetching: false, planes: action.payload, upToDateAllPlanes:true }
        case GET_PLANES_ERROR:
            return {...state, fetching: false, error: action.payload}

        case GET_TIPOS_ANIMALES:
            return {...state, fetching: true}
        case GET_TIPOS_ANIMALES_SUCCESS:
            return {...state, fetching: false, tiposAnimales: action.payload, upToDateAllAnimales:true }
        case GET_TIPOS_ANIMALES_ERROR:
            return {...state, fetching: false, error: action.payload}
        case GET_TIPOS_ANIMALES_FROM_STORE:
            return {...state, fetching:false, tiposAnimales: action.payload}

        default:
            return state
    }
}

export let getDocumentosAction = () => (dispatch, getState) => {
    const state = getState()

    if(state.combos.upToDateAllDomicilios){
        dispatch({
            type: GET_DOCUMENTOS_FROM_STORE,
            payload: state.combos.documentos,
        })
    }else{
    dispatch({
        type: GET_DOCUMENTOS,
    })
    return axios.get(urlDocs)
    .then(res=>{
        dispatch({
            type: GET_DOCUMENTOS_SUCCESS,
            payload: Object.values(res.data).flat(),
        })
    })
    .catch(err=>{
        dispatch({
            type: GET_DOCUMENTOS_ERROR,
            payload: err.message
        })
    })
    }
}

export let getSexosAction = () => (dispatch, getState) => {
    const state = getState()

    if(state.combos.upToDateAllSexos){
        dispatch({
            type: GET_SEXOS_FROM_STORE,
            payload: state.combos.sexos,
        })
    } else{
    dispatch({
        type: GET_SEXOS,
    })
    return axios.get(urlSexos)
    .then(res=>{
        dispatch({
            type: GET_SEXOS_SUCCESS,
            payload: Object.values(res.data).flat(),
        })
    })
    .catch(err=>{
        dispatch({
            type: GET_SEXOS_ERROR,
            payload: err.message
        })
    })
    }
}

export let getPaisesAction = () => (dispatch, getState) => {
    const state = getState()

    if(state.combos.upToDateAllPaises){
        dispatch({
            type: GET_PAISES_FROM_STORE,
            payload: state.combos.paises,
        })
    }else{
    dispatch({
        type: GET_PAISES,
    })
    return axios.get(urlPaises)
    .then(res=>{
        dispatch({
            type: GET_PAISES_SUCCESS,
            payload: Object.values(res.data).flat(),
        })
    })
    .catch(err=>{
        dispatch({
            type: GET_PAISES_ERROR,
            payload: err.message
        })
    })
    }
}

export let getPlanesAction = (id) => (dispatch, getState) => {
    dispatch({
        type: GET_PLANES,
    })
    return axios.get(urlPlanes + id)
    .then(res=>{
        dispatch({
            type: GET_PLANES_SUCCESS,
            payload: Object.values(res.data).flat(),
        })
    })
    .catch(err=>{
        dispatch({
            type: GET_PLANES_ERROR,
            payload: err.message
        })
    })
}

export let getTiposAnimalesAction = () => (dispatch, getState) => {
    const state = getState()

    if(state.combos.upToDateAllAnimales){
        dispatch({
            type: GET_TIPOS_ANIMALES_FROM_STORE,
            payload: state.combos.tiposAnimales,
        })
    } else{
    dispatch({
        type: GET_TIPOS_ANIMALES,
    })
    return axios.get(urlTiposAnimales)
    .then(res=>{
        dispatch({
            type: GET_TIPOS_ANIMALES_SUCCESS,
            payload: Object.values(res.data).flat(),
        })
    })
    .catch(err=>{
        dispatch({
            type: GET_TIPOS_ANIMALES_ERROR,
            payload: err.message
        })
    })
    }
}
