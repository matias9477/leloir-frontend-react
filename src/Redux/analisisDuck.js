import axios from 'axios'
import { urlAnalisis, urlGetAnalisis, urlEmitirAnalisis, urlAnalisisPendientes, urlCargarResultados, urlAprobarResultados, urlAnalisisByIdPendientes, urlAddAnalisis } from './../Constants/URLs'

let initialData = {
    fetching: false,
    fetchingAnalisis: false,
    analisisAll: [],
    upToDateAnalisisAll: false,
    analisisById: '',
    analisisPendientes: [],
    upToDatePendientes: false,
    fetchingAnalisisPendientes: false,
    fetchingAnalisisById: false,
    analisisPendientesById: [],
    registroAnalisis: [],
}

let GET_ANALISIS = 'GET_ANALISIS'
let GET_ANALISIS_SUCCESS = 'GET_ANALISIS_SUCCESS'
let GET_ANALISIS_ERROR = 'GET_ANALISIS_ERROR'
let GET_ANALISIS_FROM_STORE = 'GET_ANALISIS_FROM_STORE'

let ADD_NUEVO_ANALISIS = 'ADD_NUEVO_ANALISIS'
let ADD_NUEVO_ANALISIS_SUCCESS = 'ADD_NUEVO_ANALISIS_SUCCESS'
let ADD_NUEVO_ANALISIS_ERROR = 'ADD_NUEVO_ANALISIS_ERROR'

let GET_ANALISIS_BY_ID = 'GET_ANALISIS_BY_ID'
let GET_ANALISIS_BY_SUCCESS = 'GET_ANALISIS_BY_SUCCESS'
let GET_ANALISIS_BY_ERROR = 'GET_ANALISIS_BY_ERROR'

let EMITIR_ANALISIS = 'EMITIR_ANALISIS'
let EMITIR_ANALISIS_SUCCESS = 'EMITIR_ANALISIS_SUCCESS'
let EMITIR_ANALISIS_ERROR = 'EMITIR_ANALISIS_ERROR'

let GET_ANALISIS_PENDIENTES = 'GET_ANALISIS_PENDIENTES'
let GET_ANALISIS_PENDIENTES_SUCCESS = 'GET_ANALISIS_PENDIENTES_SUCCESS'
let GET_ANALISIS_PENDIENTES_ERROR = 'GET_ANALISIS_PENDIENTES_ERROR'
let GET_ANALISIS_PENDIENTES_FROM_STORE = 'GET_ANALISIS_PENDIENTES_FROM_STORE'

let CARGAR_RESULTADO = 'CARGAR_RESULTADO'
let CARGAR_RESULTADO_SUCCESS = 'CARGAR_RESULTADO_SUCCESS'
let CARGAR_RESULTADO_ERROR = 'CARGAR_RESULTADO_ERROR'

let REVISAR_RESULTADO = 'REVISAR_RESULTADO'
let REVISAR_RESULTADO_SUCCESS = 'REVISAR_RESULTADO_SUCCESS'
let REVISAR_RESULTADO_ERROR = 'REVISAR_RESULTADO_ERROR'

let GET_ANALISIS_PENDIENTES_BY_ID = 'GET_ANALISIS_PENDIENTES_BY_ID'
let GET_ANALISIS_PENDIENTES_BY_ID_SUCCESS = 'GET_ANALISIS_PENDIENTES_BY_ID_SUCCESS'
let GET_ANALISIS_PENDIENTES_BY_ID_ERROR = 'GET_ANALISIS_PENDIENTES_BY_ID_ERROR'


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
            return { ...state, fetchingAnalisis: false, registroAnalisis:action.payload, upToDateAnalisisAll: false }
        case ADD_NUEVO_ANALISIS_ERROR:
            return { ...state, fetchingAnalisis: false, error: action.payload, upToDateAnalisisAll: true }

        case GET_ANALISIS_BY_ID:
            return { ...state, fetchingAnalisisById: true }
        case GET_ANALISIS_BY_SUCCESS:
            return { ...state, fetchingAnalisisById: false, analisisById: action.payload }
        case GET_ANALISIS_BY_ERROR:
            return { ...state, fetchingAnalisisById: false, error: action.payload }

        case EMITIR_ANALISIS:
            return { ...state, fetchingAnalisis: true }
        case EMITIR_ANALISIS_SUCCESS:
            return { ...state, fetchingAnalisis: false, upToDatePendientes: false }
        case EMITIR_ANALISIS_ERROR:
            return { ...state, fetchingAnalisis: false, error: action.payload, upToDatePendientes: true }

        case GET_ANALISIS_PENDIENTES:
            return { ...state, fetchingAnalisisPendientes: true }
        case GET_ANALISIS_PENDIENTES_SUCCESS:
            return { ...state, fetchingAnalisisPendientes: false, analisisPendientes: action.payload, upToDatePendientes:true }
        case GET_ANALISIS_PENDIENTES_ERROR:
            return { ...state, fetchingAnalisisPendientes: false, error: action.payload, upToDatePendientes: false }
        case GET_ANALISIS_PENDIENTES_FROM_STORE:
            return { ...state, fetchingAnalisisPendientes:false, analisisPendientes: action.payload }

        case CARGAR_RESULTADO:
            return { ...state, fetching: true }
        case CARGAR_RESULTADO_SUCCESS:
            return { ...state, fetching: false, upToDatePendientes: false }
        case CARGAR_RESULTADO_ERROR:
            return { ...state, fetching: false, error: action.payload, upToDatePendientes: true }

        case REVISAR_RESULTADO:
            return { ...state, fetching: true }
        case REVISAR_RESULTADO_SUCCESS:
            return { ...state, fetching: false, upToDatePendientes: false }
        case REVISAR_RESULTADO_ERROR:
            return { ...state, fetching: false, error: action.payload, upToDatePendientes: true }

        case GET_ANALISIS_PENDIENTES_BY_ID:
            return { ...state, fetching: true }
        case GET_ANALISIS_PENDIENTES_BY_ID_SUCCESS:
            return { ...state, fetching: false, analisisPendientesById: action.payload }
        case GET_ANALISIS_PENDIENTES_BY_ID_ERROR:
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
    const urlBase = window.document.location.pathname

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
        if( urlBase === '/diario-practicas'){
            return dispatch(getAnalisisPendientesAction())
        } else
            return dispatch(getAnalisisByIdAction(id))

    })
    .catch(error=>{
        dispatch({
            type: EMITIR_ANALISIS_ERROR,
            payload: error.message
        })
    })

}

export let addAnalisisAction = (data) => (dispatch, getState) =>{
    dispatch({
        type: ADD_NUEVO_ANALISIS,
    })

    return axios.post(urlAddAnalisis, data)
    .then(res=>{
        dispatch({
            type: ADD_NUEVO_ANALISIS_SUCCESS,
            payload: res.data
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

export let getAnalisisPendientesAction = () => (dispatch, getState) => {
    const state = getState()

    if (state.analisis.upToDatePendientes){
        dispatch({
            type: GET_ANALISIS_PENDIENTES_FROM_STORE,
            payload: state.analisis.analisisPendientes
        })
    } else {
        dispatch({
            type: GET_ANALISIS_PENDIENTES
        })
        return axios.get(urlAnalisisPendientes)
        .then(res=>{
            dispatch({
                type: GET_ANALISIS_PENDIENTES_SUCCESS,
                payload: Object.values(res.data).flat()
            })
        })
        .catch(error=>{
            dispatch({
                type: GET_ANALISIS_PENDIENTES_ERROR,
                payload: error.message
            })
        })
    }
}

export let cargarResultadosAction = (id, data) => (dispatch, getState) => {
    const urlBase = window.document.location.pathname

    dispatch({
        type: CARGAR_RESULTADO,
    })
    return axios.post(urlCargarResultados + id, data)
    .then(res=>{
        dispatch({
            type: CARGAR_RESULTADO_SUCCESS,
        })
        if( urlBase === '/diario-practicas'){
            return dispatch(getAnalisisPendientesAction())
        } else
            return dispatch(getAnalisisByIdAction(id))
    })
    .catch(error=>{
        dispatch({
            type: CARGAR_RESULTADO_ERROR,
            payload: error.message
        })
        alert('No se pudo cargar el resultado, intente nuevamente.')
    })


}

export let revisarResultadosAction = (id, data) => (dispatch, getState) => {
    const urlBase = window.document.location.pathname

    dispatch({
        type: REVISAR_RESULTADO,
    })
    return axios.post(urlAprobarResultados + id, data)
    .then(res=>{
        dispatch({
            type: REVISAR_RESULTADO_SUCCESS,
        })
        if( urlBase === '/diario-practicas'){
            return dispatch(getAnalisisPendientesAction())
        } else
            return dispatch(getAnalisisByIdAction(id))
    })
    .catch(error=>{
        dispatch({
            type: REVISAR_RESULTADO_ERROR,
            payload: error.message
        })
        alert('No se pudo cargar la revisión del resultado, intente nuevamente.')
    })
}

export let getAnalisisPendientesByIdAction = (id) => (dispatch, getState) => {

    dispatch({
        type: GET_ANALISIS_PENDIENTES_BY_ID
    })
    return axios.get(urlAnalisisByIdPendientes + id)
    .then(res=>{
        dispatch({
            type: GET_ANALISIS_PENDIENTES_BY_ID_SUCCESS,
            payload: Object.values(res.data).flat()
        })
    })
    .catch(error=>{
        dispatch({
            type: GET_ANALISIS_PENDIENTES_BY_ID_ERROR,
            payload: error.message
        })
    })
}