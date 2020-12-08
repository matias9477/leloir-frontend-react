import axios from 'axios'
import { urlObrasSoc, urlSwitchAltaObraSocial, urlAltaObraSocial, urlAlterObraSocial, urlObraSocialById, urlTiposPlanes } from './../Constants/URLs'


let initialData = {
    fetching: false,
    obrasSociales: [],
    upToDateObrasSociales: false,
    obraSocial: '',
    upToDateObraSocialById: false,
    tiposPlanes: [],
}

let GET_OBRAS_SOCIALES = "GET_OBRAS_SOCIALES"
let GET_OBRAS_SOCIALES_SUCCESS = "GET_OBRAS_SOCIALES_SUCCESS"
let GET_OBRAS_SOCIALES_ERROR = "GET_OBRAS_SOCIALES_ERROR"
let GET_OBRAS_SOCIALES_FROM_STORE = "GET_OBRAS_SOCIALES_FROM_STORE"

let BIT_INVERSE = 'BIT_INVERSE'
let BIT_INVERSE_SUCCESS = 'BIT_INVERSE_SUCCESS'
let BIT_INVERSE_ERROR = 'BIT_INVERSE_ERROR'

let ADD_OBRA_SOCIAL = "ADD_OBRA_SOCIAL"
let ADD_OBRA_SOCIAL_SUCCESS = "ADD_OBRA_SOCIAL_SUCCESS"
let ADD_OBRA_SOCIAL_ERROR = "ADD_OBRA_SOCIAL_ERROR"

let ALTER_OBRA_SOCIAL = 'ALTER_OBRA_SOCIAL'
let ALTER_OBRA_SOCIAL_SUCCESS = 'ALTER_OBRA_SOCIAL_SUCCESS'
let ALTER_OBRA_SOCIAL_ERROR = 'ALTER_OBRA_SOCIAL_ERROR'

let GET_OBRA_SOCIAL_BY_ID = 'GET_OBRA_SOCIAL_BY_ID'
let GET_OBRA_SOCIAL_BY_ID_ERROR = 'GET_OBRA_SOCIAL_BY_ID_ERROR'
let GET_OBRA_SOCIAL_BY_ID_SUCCESS = 'GET_OBRA_SOCIAL_BY_ID_SUCCESS'

let TIPOS_PLANES = "TIPOS_PLANES"
let TIPOS_PLANES_SUCCESS = "TIPOS_PLANES_SUCCESS"
let TIPOS_PLANES_ERROR = "TIPOS_PLANES_ERROR"
let TIPOS_PLANES_FROM_STORE = "TIPOS_PLANES_FROM_STORE"


export default function reducer(state = initialData, action){
    switch(action.type){
        case GET_OBRAS_SOCIALES:
            return {...state, fetching: true}
        case GET_OBRAS_SOCIALES_ERROR:
            return {...state, fetching:false, error:action.payload, upToDateObrasSociales:false}
        case GET_OBRAS_SOCIALES_SUCCESS:
            return {...state, fetching:false, obrasSociales: action.payload, upToDateObrasSociales:true}
        case GET_OBRAS_SOCIALES_FROM_STORE:
            return {...state, fetching: false, obrasSociales: action.payload}

        case BIT_INVERSE:
            return {...state, fetching:true}
        case BIT_INVERSE_ERROR:
            return {...state, fetching:false, error:action.payload, upToDateObrasSociales:true}
        case BIT_INVERSE_SUCCESS:
            return {...state, fetching:false, upToDateObrasSociales:false}

        case ADD_OBRA_SOCIAL:
            return {...state, fetching:true}
        case ADD_OBRA_SOCIAL_SUCCESS:
            return {...state, fetching:false, upToDateObrasSociales:false}
        case ADD_OBRA_SOCIAL_ERROR:
            return {...state, fetching:false, error:action.payload, upToDateObrasSociales:true}

        case GET_OBRA_SOCIAL_BY_ID:
            return {...state, fetching:true}
        case GET_OBRA_SOCIAL_BY_ID_ERROR:
            return {...state, fetching:false, error:action.payload}
        case GET_OBRA_SOCIAL_BY_ID_SUCCESS:
            return {...state, fetching:false, obraSocial: action.payload}

        case ALTER_OBRA_SOCIAL:
            return {...state, fetching:true}
        case ALTER_OBRA_SOCIAL_SUCCESS:
            return {...state, fetching:false, upToDateObrasSociales:false, upToDateObraSocialById:false}
        case ALTER_OBRA_SOCIAL_ERROR:
            return {...state, fetching:false, error:action.payload}

        case TIPOS_PLANES:
            return {...state, fetching: true}
        case TIPOS_PLANES_ERROR:
            return {...state, fetching:false, error:action.payload}
        case TIPOS_PLANES_SUCCESS:
            return {...state, fetching:false, tiposPlanes: action.payload}
        case TIPOS_PLANES_FROM_STORE:
            return {...state, fetching: false, tiposPlanes: action.payload}

        default:
            return state
    }
}


export let getObrasSocialesAction = () => (dispatch, getState) =>{
    const state = getState()

    if(state.obrasSociales.upToDateObrasSociales){
        dispatch({
            type: GET_OBRAS_SOCIALES_FROM_STORE,
            payload: state.obrasSociales.obrasSociales,
        })
    }else{
        dispatch({
            type: GET_OBRAS_SOCIALES,
        })
        return axios.get(urlObrasSoc)
        .then(res=>{
            dispatch({
                type: GET_OBRAS_SOCIALES_SUCCESS,
                payload: Object.values(res.data).flat(),
            })
        })
        .catch(err=>{
            dispatch({
                type: GET_OBRAS_SOCIALES_ERROR,
                payload: err.message
            })
        })
    }
}

export let switchAltaAction = (id) => (dispatch, getState) =>{
    const url = window.document.location.pathname

    dispatch({
        type: BIT_INVERSE,
    })

    return axios.put(`${urlSwitchAltaObraSocial}${id}`)
    .then(res=>{
        dispatch({
            type: BIT_INVERSE_SUCCESS,
        })
        if (url === '/obras_sociales'){
            return dispatch(getObrasSocialesAction(), alert('La operación se ha realizado con éxito.'))
        }
        else {
            return dispatch(getObraSocialByIdAction(id), alert('La operación se ha realizado con éxito.'))
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

export let addObraSocialAction = (data) => (dispatch, getState) =>{
    dispatch({
        type: ADD_OBRA_SOCIAL,
    })
    return axios.post(urlAltaObraSocial, data)
    .then(res =>{
        dispatch({
            type: ADD_OBRA_SOCIAL_SUCCESS,

        })
        alert(`Se ha registrado la obra social ${data.razonSocial} con exito`)
    })
    .catch(err=>{
        dispatch({
            type: ADD_OBRA_SOCIAL_ERROR,
            payload: err.message
        })
        alert(`No se ha podido registrar la obra social ${data.razonSocial}. Por favor intente nuevamente.`)

    })

}


export let getObraSocialByIdAction = (id) => (dispatch, getState) => {

    dispatch({
        type: GET_OBRA_SOCIAL_BY_ID,
    })
    return axios.get(`${urlObraSocialById}${id}`)
        .then(res=>{
            dispatch({
                type: GET_OBRA_SOCIAL_BY_ID_SUCCESS,
                payload: res.data,
            })
        })
        .catch(err=>{
            dispatch({
                type: GET_OBRA_SOCIAL_BY_ID_ERROR,
                payload: err.message
            })
        })
}

export let alterObraSocialAction = (id, data) =>(dispatch, getState) =>{
    dispatch({
        type: ALTER_OBRA_SOCIAL,
    })
    return axios.put(`${urlAlterObraSocial}${id}`, data)
        .then(res=>{
            dispatch({
                type: ALTER_OBRA_SOCIAL_SUCCESS
            })
            return dispatch(getObraSocialByIdAction(id), alert('Se ha modificado la obra social con éxito.'))
        })
        .catch(err=>{
            dispatch({
                type: ALTER_OBRA_SOCIAL_ERROR,
                payload: err.message
            })
            return dispatch(getObraSocialByIdAction(id), alert('No se ha podido modificar la obra social. Por favor intente nuevamente.'))
        })
}

export let getTiposPlanesAction = () => (dispatch, getState) =>{
    const state = getState()

    if(state.obrasSociales.upToDateObrasSociales){
        dispatch({
            type: TIPOS_PLANES_FROM_STORE,
            payload: state.obrasSociales.obrasSociales,
        })
    }else{
        dispatch({
            type: TIPOS_PLANES,
        })
        return axios.get(urlTiposPlanes)
        .then(res=>{
            dispatch({
                type: TIPOS_PLANES_SUCCESS,
                payload: Object.values(res.data).flat(),
            })
        })
        .catch(err=>{
            dispatch({
                type: TIPOS_PLANES_ERROR,
                payload: err.message
            })
        })
    }
}