import axios from 'axios'
import { urlAnalisis, urlGetAnalisis } from './../Constants/URLs'

let initialData = {
    fetching: false,
    analisisAll: [],
    upToDateAnalisisAll: false,
    analisisById: '',
}

let GET_ANALISIS = 'GET_ANALISIS'
let GET_ANALISIS_SUCCESS = 'GET_ANALISIS_SUCCESS'
let GET_ANALISIS_ERROR = 'GET_ANALISIS_ERROR'
let GET_ANALISIS_FROM_STORE = 'GET_ANALISIS_FROM_STORE'

let GET_ANALISIS_BY_ID = 'GET_ANALISIS_BY_ID'
let GET_ANALISIS_BY_SUCCESS = 'GET_ANALISIS_BY_SUCCESS'
let GET_ANALISIS_BY_ERROR = 'GET_ANALISIS_BY_ERROR'

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

        case GET_ANALISIS_BY_ID:
            return { ...state, fetching: true }
        case GET_ANALISIS_BY_SUCCESS:
            return { ...state, fetching: false, analisisById: action.payload }
        case GET_ANALISIS_BY_ERROR:
            return { ...state, fetching: false, error: action.payload }

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

export let getAnalisisByIdAction = (id) => (dispatch, getState) => {
   
    dispatch({
        type: GET_ANALISIS_BY_ID,
    })
    return axios.get(urlGetAnalisis + id)
    .then(res=>{
        dispatch({
            type: GET_ANALISIS_BY_SUCCESS,
            payload: res.data,
        })
    })
    .catch(error=>{
        dispatch({
            type: GET_ANALISIS_BY_ERROR,
            payload: error.message
        })
    })

}
