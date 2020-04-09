import axios from 'axios'
import {urlPacientes, urlPacienteByNombre} from '../Constants/URLs'


//constants

//
let initialData = {
    fetching: false,
    patients: [],
    patientLanding: [],
}


let GET_PATIENTS = "GET_PATIENTS"
let GET_PATIENTS_SUCCESS = "GET_PATIENTS_SUCCESS"
let GET_PATIENTS_ERROR = "GET_PATIENTS_ERROR"


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
            return {...state, fetching:false, patients: action.payload}

        case GET_PATIENT_BY_NOMBRE:
            return {...state, fetching:true}
        case GET_PATIENT_BY_NOMBRE_ERROR:
            return {...state, fetching:false, error:action.payload}
        case GET_PATIENT_BY_NOMBRE_SUCCESS:
            return {...state, fetching:false, patientLanding: action.payload}

        default:
            return state
    }
}


//actions

export let getPatientsAction = () => (dispatch, getState) =>{
    dispatch({
        type: GET_PATIENTS,
    })
    return axios.get(urlPacientes)
    .then(res=>{
        dispatch({
            type: GET_PATIENTS_SUCCESS,
            payload: res.data,
        })
    })
    .catch(err=>{
        dispatch({
            type: GET_PATIENTS_ERROR,
            payload: err.response.message
        })
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

