import axios from 'axios'
import { urlAnalisis, urlNuevoAnalisis } from './../Constants/URLs'

let initialData = {
    fetchingAnalisis: false,
    analisisAll: [],
    upToDateAnalisisAll: false,
}

let GET_ANALISIS = 'GET_ANALISIS'
let GET_ANALISIS_SUCCESS = 'GET_ANALISIS_SUCCESS'
let GET_ANALISIS_ERROR = 'GET_ANALISIS_ERROR'
let GET_ANALISIS_FROM_STORE = 'GET_ANALISIS_FROM_STORE'

let ADD_NUEVO_ANALISIS = 'ADD_NUEVO_ANALISIS'
let ADD_NUEVO_ANALISIS_SUCCESS = 'ADD_NUEVO_ANALISIS_SUCCESS'
let ADD_NUEVO_ANALISIS_ERROR = 'ADD_NUEVO_ANALISIS_ERROR'

export default function reducer(state = initialData, action){
    switch(action.type){
        case GET_ANALISIS:
            return { ...state, fetchingAnalisis: true }
        case GET_ANALISIS_SUCCESS:
            return { ...state, fetchingAnalisis: false, analisisAll: action.payload, upToDateAnalisisAll:true }
        case GET_ANALISIS_ERROR:
            return { ...state, fetchingAnalisis: false, error: action.payload, upToDateAnalisisAll: false }
        case GET_ANALISIS_FROM_STORE:
            return { ...state, fetchingAnalisis:false, analisisAll: action.payload }

        case ADD_NUEVO_ANALISIS:
            return { ...state, fetchingAnalisis: true }
        case ADD_NUEVO_ANALISIS_SUCCESS:
            return { ...state, fetchingAnalisis: false,  upToDateAnalisisAll: false }
        case ADD_NUEVO_ANALISIS_ERROR:
            return { ...state, fetchingAnalisis: false, error: action.payload, upToDateAnalisisAll: true }

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

export let addAnalisisAction = (data) => (dispatch, getState) =>{
    dispatch({
        type: ADD_NUEVO_ANALISIS,
    })

    return axios.post(urlNuevoAnalisis, data)
    .then(res=>{
        dispatch({
            type: ADD_NUEVO_ANALISIS_SUCCESS,
        })
        alert(`Se ha registrado el análisis con éxito.`)
    })
    .catch(err=>{
        dispatch({
            type: ADD_NUEVO_ANALISIS_ERROR,
            payload: err.message
        })
        alert(`No se ha podido registrar el análisis. Por favor intente nuevamente.`)
        
    })
}