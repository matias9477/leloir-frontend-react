import axios from 'axios'
import { urlAnalisis } from './../Constants/URLs'

let initialData = {
    fetching: false,
    analisisAll: [],
    upToDateAnalisisAll: false,
}

let GET_ANALISIS = 'GET_ANALISIS'
let GET_ANALISIS_SUCCESS = 'GET_ANALISIS_SUCCESS'
let GET_ANALISIS_ERROR = 'GET_ANALISIS_ERROR'
let GET_ANALISIS_FROM_STORE = 'GET_ANALISIS_FROM_STORE'

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
                payload: res.data
                //payload: Object.values(res.data).flat(),
            })
        })
        .then(error=>{
            dispatch({
                type: GET_ANALISIS_ERROR,
                payload: error.message
            })
        })
    }
}
