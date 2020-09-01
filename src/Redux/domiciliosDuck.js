import axios from 'axios';
import {urlDomicilios,urlDomicilioById, urlAltaDomicilio, urlAlterDomicilio, urlTomorrowDomicilios} from './../Constants/URLs';

let initialData = {
    fetching: false,
    domicilios: [],
    upToDateAllDomicilios: false,
    tomorrowDomicilios: [],
    domicilioById: [],
}

let ADD_DOMICILIO = "ADD_DOMICILIO"
let ADD_DOMICILIO_SUCCESS = "ADD_DOMICILIO_SUCCESS"
let ADD_DOMICILIO_ERROR = "ADD_DOMICILIO_ERROR"

let GET_DOMICILIOS = 'GET_DOMICILIOS'
let GET_DOMICILIOS_SUCCESS = 'GET_DOMICILIOS_SUCCESS'
let GET_DOMICILIOS_ERROR = 'GET_DOMICILIOS_ERROR'
let GET_DOMICILIOS_FROM_STORE = 'GET_DOMICILIOS_FROM_STORE'

let GET_DOMICILIO_BY_ID = 'GET_DOMICILIO_BY_ID'
let GET_DOMICILIO_BY_ID_ERROR = 'GET_DOMICILIO_BY_ID_ERROR'
let GET_DOMICILIO_BY_ID_SUCCESS = 'GET_DOMICILIO_BY_ID_SUCCESS'

let ALTER_DOMICILIO = 'ALTER_DOMICILIO'
let ALTER_DOMICILIO_SUCCESS = 'ALTER_DOMICILIO_SUCCESS'
let ALTER_DOMICILIO_ERROR = 'ALTER_DOMICILIO_ERROR'

let GET_TOMORROW_DOMICILIOS = 'GET_TOMORROW_DOMICILIOS'
let GET_TOMORROW_DOMICILIOS_SUCCESS = 'GET_TOMORROW_DOMICILIOS_SUCCESS'
let GET_TOMORROW_DOMICILIOS_ERROR = 'GET_TOMORROW_DOMICILIOS_ERROR'


export default function reducer(state = initialData, action) {
    switch(action.type){
        case GET_DOMICILIOS:
            return {...state, fetching: true}
        case GET_DOMICILIOS_SUCCESS:
            return {...state, fetching: false, domicilios: action.payload, upToDateAllDomicilios:true} 
        case GET_DOMICILIOS_ERROR:
            return {...state, fetching: false, error: action.payload}
        case GET_DOMICILIOS_FROM_STORE:
            return {...state, fetching:false, domicilios: action.payload}

        case ADD_DOMICILIO:
            return {...state, fetching: true}
        case ADD_DOMICILIO_SUCCESS:
            return {...state, fetching:false, upToDateAllDomicilios:false }
        case ADD_DOMICILIO_ERROR:
            return {...state, fetching:false}

        case GET_DOMICILIO_BY_ID:
            return {...state, fetching: true}
        case GET_DOMICILIO_BY_ID_SUCCESS:
            return {...state, fetching: false, domicilioById: action.payload} 
        case GET_DOMICILIO_BY_ID_ERROR:
            return {...state, fetching: false, error: action.payload}

        case ALTER_DOMICILIO:
            return {...state, fetching: true}
        case ALTER_DOMICILIO_SUCCESS:
            return {...state, fetching: false, upToDateAllDomicilios: false} 
        case ALTER_DOMICILIO_ERROR:
            return {...state, fetching: false, error: action.payload}

        case GET_TOMORROW_DOMICILIOS:
            return {...state, fetching: true}
        case GET_TOMORROW_DOMICILIOS_SUCCESS:
            return {...state, fetching:false, tomorrowDomicilios: action.payload}
        case GET_TOMORROW_DOMICILIOS_ERROR:
            return {...state, fetching:false, error: action.payload}
        default:
            return state
    }
}


export let getDomiciliosAction = () => (dispatch, getState) => {
    const state = getState()

    if(state.domicilios.upToDateAllDomicilios){
        dispatch({
            type: GET_DOMICILIOS_FROM_STORE,
            payload: state.domicilios.domicilios,
        })
    }else{
    dispatch({
        type: GET_DOMICILIOS,
    })
    return axios.get(urlDomicilios)
    .then(res=>{
        dispatch({
            type: GET_DOMICILIOS_SUCCESS,
            payload: Object.values(res.data).flat(),
        })
    })
    .catch(err=>{
        dispatch({
            type: GET_DOMICILIOS_ERROR,
            payload: err.message
        })
    })
    }
}

export let getTomorrowDomicilios = () => (dispatch, getState) => {
    dispatch({
        type: GET_TOMORROW_DOMICILIOS
    })
    return axios.get(urlTomorrowDomicilios)
    .then(res=>{
        dispatch({
            type: GET_TOMORROW_DOMICILIOS_SUCCESS,
            payload: Object.values(res.data).flat(),
        })
    })
    .catch(err=>{
        dispatch({
            type: GET_TOMORROW_DOMICILIOS_ERROR,
            payload: err.message
        })
    })
}

export let getDomicilioByIdAction = (id) => (dispatch, getState) => {

    dispatch({
        type: GET_DOMICILIO_BY_ID,
    })
    return axios.get(`${urlDomicilioById}${id}`)
        .then(res=>{
            dispatch({
                type: GET_DOMICILIO_BY_ID_SUCCESS,
                payload: res.data,
            })
        })
        .catch(err=>{
            dispatch({
                type: GET_DOMICILIO_BY_ID_ERROR,
                payload: err.message
            })
        })
}

export let addDomicilioAction = (data) => (dispatch, getState) =>{
    dispatch({
        type: ADD_DOMICILIO,
    })
    return axios.post(urlAltaDomicilio, data)
    .then(res =>{
        dispatch({
            type: ADD_DOMICILIO_SUCCESS,

        })
        alert(`Se ha registrado el domicilio a ${data.direccion} con exito`)
    })
    .catch(err=>{
        dispatch({
            type: ADD_DOMICILIO_ERROR,
            payload: err.message
        })
        alert(`No se ha podido registrar el domicilio a ${data.direccion}. Por favor intente nuevamente.`)

    })

}

export let alterDomicilioAction = (id, data) =>(dispatch, getState) =>{
    dispatch({
        type: ALTER_DOMICILIO,
    })
    return axios.put(`${urlAlterDomicilio}${id}`, data)
        .then(res=>{
            dispatch({
                type: ALTER_DOMICILIO_SUCCESS
            })
            return dispatch(getDomicilioByIdAction(id), alert('Se ha modificado el domicilio con éxito.'))
        })
        .catch(err=>{
            dispatch({
                type: ALTER_DOMICILIO_ERROR,
                payload: err.message
            })
            return dispatch(getDomicilioByIdAction(id), alert('No se ha podido modificar el domicilio. Por favor intente nuevamente.'))
        })
}