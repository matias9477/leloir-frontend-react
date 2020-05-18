import axios from 'axios'
import { urlAnalisis, urlGetAnalisis, urlEmitirAnalisis } from './../Constants/URLs'

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

let EMITIR_ANALISIS = 'EMITIR_ANALISIS'
let EMITIR_ANALISIS_SUCCESS = 'EMITIR_ANALISIS_SUCCESS'
let EMITIR_ANALISIS_ERROR = 'EMITIR_ANALISIS_ERROR'


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

        case EMITIR_ANALISIS:
            return { ...state, fetching: true }
        case EMITIR_ANALISIS_SUCCESS:
            return { ...state, fetching: false }
        case EMITIR_ANALISIS_ERROR:
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

export let emitirAnalisisAction = (id) => (dispatch, getState) => {

    dispatch({
        type: EMITIR_ANALISIS,
    })
    return axios.get(urlEmitirAnalisis + id, {responseType: 'blob',})
    .then(res=>{
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        const index1 = res.headers['content-disposition'].indexOf("name=\"") + 6
        const index2 = res.headers['content-disposition'].indexOf("\"", 18)
        link.href = url
        link.setAttribute('download', res.headers['content-disposition'].substring(index1, index2)) //or any other extension
        document.body.appendChild(link)
        link.click()
        dispatch({
            type: EMITIR_ANALISIS_SUCCESS,
        })
        return dispatch(getAnalisisByIdAction(id))
    })
    .catch(error=>{
        dispatch({
            type: EMITIR_ANALISIS_ERROR,
            payload: error.message
        })
    })

}