import axios from 'axios'
import { urlObrasSoc, urlSwitchAltaObraSocial } from './../Constants/URLs'


let initialData = {
    fetching: false,
    obrasSociales: [],
    upToDateObrasSociales: false,
}

let GET_OBRAS_SOCIALES = "GET_OBRAS_SOCIALES"
let GET_OBRAS_SOCIALES_SUCCESS = "GET_OBRAS_SOCIALES_SUCCESS"
let GET_OBRAS_SOCIALES_ERROR = "GET_OBRAS_SOCIALES_ERROR"
let GET_OBRAS_SOCIALES_FROM_STORE = "GET_OBRAS_SOCIALES_FROM_STORE"

let BIT_INVERSE = 'BIT_INVERSE'
let BIT_INVERSE_SUCCESS = 'BIT_INVERSE_SUCCESS'
let BIT_INVERSE_ERROR = 'BIT_INVERSE_ERROR'



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
    dispatch({
        type: BIT_INVERSE,
    })

    return axios.put(`${urlSwitchAltaObraSocial}${id}`)
    .then(res=>{
        dispatch({
            type: BIT_INVERSE_SUCCESS,
        })
            return dispatch(getObrasSocialesAction(), alert('La operación se ha realizado con éxito.'))
    })
    .catch(err=>{
        dispatch({
            type: BIT_INVERSE_ERROR,
            payload: err.message
        })
        alert('No se ha podido realizar la operación. Por favor intente nuevamente.')
    })
}

