import axios from 'axios'
import { urlPacientes, urlSwitchAltaPaciente, urlAltaPaciente, urlGetPacienteById, urlAlterPaciente, urlPacienteByNombre, urlHistorial  } from '../Constants/URLs'


//constants
let initialData = {
    fetching: false,
    patients: [],
    upToDateAllPatients: false,
    upToDatePatientById: false,
    patient: '',
     history: [],    
    patientLanding: [],
}


let GET_PATIENTS = "GET_PATIENTS"
let GET_PATIENTS_SUCCESS = "GET_PATIENTS_SUCCESS"
let GET_PATIENTS_ERROR = "GET_PATIENTS_ERROR"
let GET_PATIENTS_FROM_STORE = "GET_PATIENTS_FROM_STORE"

let GET_PATIENT_HISTORY = "GET_PATIENT_HISTORY"
let GET_PATIENT_HISTORY_SUCCESS = "GET_PATIENT_HISTORY_SUCCESS"
let GET_PATIENT_HISTORY_ERROR = "GET_PATIENT_HISTORY_ERROR"

let BIT_INVERSE = 'BIT_INVERSE'
let BIT_INVERSE_SUCCESS = 'BIT_INVERSE_SUCCESS'
let BIT_INVERSE_ERROR = 'BIT_INVERSE_ERROR'

let ADD_PATIENT = 'ADD_PATIENT'
let ADD_PATIENT_SUCCESS = 'ADD_PATIENT_SUCCESS'
let ADD_PATIENT_ERROR = 'ADD_PATIENT_ERROR'

let GET_PATIENT_BY_ID = "GET_PATIENT_BY_ID"
let GET_PATIENT_BY_ID_SUCCESS = "GET_PATIENT_BY_ID_SUCCESS"
let GET_PATIENT_BY_ID_ERROR = "GET_PATIENT_BY_ID_ERROR"
let GET_PATIENT_BY_ID_FROM_STORE = "GET_PATIENT_BY_ID_FROM_STORE"

let ALTER_PACIENTE = "ALTER_PACIENTE"
let ALTER_PACIENTE_SUCCESS = "ALTER_PACIENTE_SUCCESS"
let ALTER_PACIENTE_ERROR = "ALTER_PACIENTE_ERROR"

let GET_PATIENT_BY_NOMBRE = "GET_PATIENT_BY_NOMBRE"
let GET_PATIENT_BY_NOMBRE_SUCCESS = "GET_PATIENT_BY_NOMBRE_SUCCESS"
let GET_PATIENT_BY_NOMBRE_ERROR = "GET_PATIENT_BY_NOMBRE_ERROR"



//reducer
export default function reducer(state = initialData, action){
    switch(action.type){
        case GET_PATIENTS:
            return {...state, fetching:true}
        case GET_PATIENTS_ERROR:
            return {...state, fetching:false, error:action.payload}
        case GET_PATIENTS_SUCCESS:
            return {...state, fetching:false, patients: action.payload, upToDateAllPatients:true}
        case GET_PATIENTS_FROM_STORE:
            return {...state, fetching: false, patients: action.payload}

        case BIT_INVERSE:
            return {...state, fetching:true}
        case BIT_INVERSE_ERROR:
            return {...state, fetching:false, error:action.payload, upToDateAllPatients: false}
        case BIT_INVERSE_SUCCESS:
            return {...state, fetching:false, upToDateAllPatients:false, upToDatePatientById:false}

        case ADD_PATIENT:
            return {...state, fetching:true}
        case ADD_PATIENT_ERROR:
            return {...state, fetching:false, error:action.payload, upToDateAllPatients:true}
        case ADD_PATIENT_SUCCESS:
            return {...state, fetching:false, upToDateAllPatients:false}

        case GET_PATIENT_BY_ID:
            return {...state, fetching:true}
        case GET_PATIENT_BY_ID_ERROR:
            return {...state, fetching:false, error:action.payload}
        case GET_PATIENT_BY_ID_SUCCESS:
            return {...state, fetching:false, patient: action.payload, upToDatePatientById:true}
        case GET_PATIENT_BY_ID_FROM_STORE:
            return {...state, fetching: false, patient: action.payload}

        case ALTER_PACIENTE:
            return {...state, fetching: true}
        case ALTER_PACIENTE_SUCCESS:
            return {...state, fetching: false, upToDateAllPatients: false, upToDatePatientById: false}
        case ALTER_PACIENTE_ERROR:
            return {...state, fetching: false, error: action.payload}

        case GET_PATIENT_BY_NOMBRE:
            return {...state, fetching:true}
        case GET_PATIENT_BY_NOMBRE_ERROR:
            return {...state, fetching:false, error:action.payload}
        case GET_PATIENT_BY_NOMBRE_SUCCESS:
            return {...state, fetching:false, patientLanding: action.payload}

        case GET_PATIENT_HISTORY:
            return {...state, fetching: true}
        case GET_PATIENT_HISTORY_SUCCESS:
            return {...state, fetching:false, history:action.payload}
        case GET_PATIENT_HISTORY_ERROR:
            return {...state, fetching:false, error: action.payload}    

        default:
            return state
    }
}


//actions

export let getPatientsAction = () => (dispatch, getState) =>{
    //HOW TO usar el estado para poner una condición para las httprequest
    const state = getState()

    if(state.patients.upToDateAllPatients){
        dispatch({
            type: GET_PATIENTS_FROM_STORE,
            payload: state.patients.patients,
        })
    }else{
        dispatch({
            type: GET_PATIENTS,
        })
        return axios.get(urlPacientes)
        .then(res=>{
            dispatch({
                type: GET_PATIENTS_SUCCESS,
                payload: Object.values(res.data).flat(),
            })
        })
        .catch(err=>{
            dispatch({
                type: GET_PATIENTS_ERROR,
                payload: err.message
            })
        })
    }
}

export let getPatientHistoryAction = (id) => (dispatch, getState) =>{
        dispatch({
            type: GET_PATIENT_HISTORY,
        })
        return axios.get(`${urlHistorial}${id}`)
        .then( res => {
            dispatch({
                type: GET_PATIENT_HISTORY_SUCCESS,
                payload: Object.values(res.data).flat(),
            })
        }
    
        )
        .catch(err=>{
            dispatch({
                type: GET_PATIENT_HISTORY_ERROR,
                payload: err.message
            })
        })
    }

export let switchAltaAction = (id) => (dispatch, getState) =>{
    const url = window.document.location.pathname

    dispatch({
        type: BIT_INVERSE,
    })

    return axios.put(`${urlSwitchAltaPaciente}${id}`)
    .then(res=>{
        dispatch({
            type: BIT_INVERSE_SUCCESS,
        })
        if (url === '/pacientes'){
            return dispatch(getPatientsAction(), alert('La operación se ha realizado con éxito.'))
        }
        else {
            return dispatch(getPatientByIdAction(id), alert('La operación se ha realizado con éxito.'))
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

export let addPatientAction = (data) => (dispatch, getState) =>{
    dispatch({
        type: ADD_PATIENT,
    })

    return axios.post(urlAltaPaciente, data)
    .then(res=>{
        dispatch({
            type: ADD_PATIENT_SUCCESS,
        })
        alert(`Se ha registrado al paciente ${checkName(data)} con éxito.`)
    })
    .catch(err=>{
        dispatch({
            type: ADD_PATIENT_ERROR,
            payload: err.message
        })
        if (err.message === 'Request failed with status code 500') {
            alert(`Ya existe un paciente con número de documento igual a ${data.nroDocumento}.`)
        } else {
            alert(`No se ha podido registrar al paciente ${checkName(data)}. Por favor intente nuevamente.`)
        }
    })
}

export let getPatientByIdAction = (id) => (dispatch, getState) => {

    dispatch({
        type: GET_PATIENT_BY_ID,
    })
    return axios.get(`${urlGetPacienteById}${id}`)
    .then(res=>{
        dispatch({
            type: GET_PATIENT_BY_ID_SUCCESS,
            payload: res.data,
        })
    })
    .catch(err=>{
        dispatch({
            type: GET_PATIENT_BY_ID_ERROR,
            payload: err.message
        })
    })
}

export let alterPatientAction = (id, data) => (dispatch, getState) =>{
    dispatch({
        type: ALTER_PACIENTE,
    })

    return axios.put(`${urlAlterPaciente}${id}`, data)
    .then(res=>{
        dispatch({
            type: ALTER_PACIENTE_SUCCESS,
        })
        return dispatch(getPatientByIdAction(id), alert('Se ha modificado el paciente con éxito.'))
    })
    .catch(err=>{
        dispatch({
            type: ALTER_PACIENTE_ERROR,
            payload: err.message
        })
        return dispatch(getPatientByIdAction(id), alert('No se ha podido modificar el paciente. Por favor intente nuevamente.'))
    })
}

export let getPatientByNombreAction = (nombre) => (dispatch, getState) => {
    dispatch({
        type: GET_PATIENT_BY_NOMBRE,
    })
    return axios.get(`${urlPacienteByNombre}${nombre}`)
        .then(res=>{
            dispatch({
                type: GET_PATIENT_BY_NOMBRE_SUCCESS,
                payload: res.data,
            })
        })
        .catch(err=>{
            dispatch({
                type: GET_PATIENT_BY_NOMBRE_ERROR,
                payload: err.message
            })
        })
}


//funciones de soporte
let checkName = (patient) => {
    let name = patient.nombre
    if(patient.apellido !== undefined){
        name = name + ' ' + patient.apellido
    }
    return name
}

