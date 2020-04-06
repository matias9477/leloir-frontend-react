import axios from 'axios'
import { urlPacientes, urlSwitchAltaPaciente, urlAltaPaciente } from '../Constants/URLs'


//constants
let initialData = {
    fetching: false,
    patients: [],
    upToDate: false,
}


let GET_PATIENTS = "GET_PATIENTS"
let GET_PATIENTS_SUCCESS = "GET_PATIENTS_SUCCESS"
let GET_PATIENTS_ERROR = "GET_PATIENTS_ERROR"
let GET_PATIENTS_FROM_STORE = "GET_PATIENTS_FROM_STORE"

let BIT_INVERSE = 'BIT_INVERSE'
let BIT_INVERSE_SUCCESS = 'BIT_INVERSE_SUCCESS'
let BIT_INVERSE_ERROR = 'BIT_INVERSE_ERROR'

let ADD_PATIENT = 'ADD_PATIENT'
let ADD_PATIENT_SUCCESS = 'ADD_PATIENT_SUCCESS'
let ADD_PATIENT_ERROR = 'ADD_PATIENT_ERROR'


//reducer
export default function reducer(state = initialData, action){
    switch(action.type){
        case GET_PATIENTS:
            return {...state, fetching:true}
        case GET_PATIENTS_ERROR:
            return {...state, fetching:false, error:action.payload}
        case GET_PATIENTS_SUCCESS:
            return {...state, fetching:false, patients: action.payload, upToDate:true}
        case GET_PATIENTS_FROM_STORE:
            return {...state, fetching: false, patients: action.payload}

        case BIT_INVERSE:
            return {...state, fetching:true}
        case BIT_INVERSE_ERROR:
            return {...state, fetching:false, error:action.payload, upToDate:true}
        case BIT_INVERSE_SUCCESS:
            return {...state, fetching:false, upToDate:false}

        case ADD_PATIENT:
            return {...state, fetching:true}
        case ADD_PATIENT_ERROR:
            return {...state, fetching:false, error:action.payload, upToDate:true}
        case ADD_PATIENT_SUCCESS:
            return {...state, fetching:false, upToDate:false}

        default:
            return state
    }
}


//actions

export let getPatientsAction = () => (dispatch, getState) =>{
    //HOW TO usar el estado para poner una condición para las httprequest
    const state = getState()

    if(state.patients.upToDate){
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

export let bitInverseAction = (paciente) => (dispatch, getState) =>{
    dispatch({
        type: BIT_INVERSE,
    })

    return axios.put(`${urlSwitchAltaPaciente}${paciente.id}`)
    .then(res=>{
        dispatch({
            type: BIT_INVERSE_SUCCESS,
        })
        return dispatch(getPatientsAction(), alert('La operación se ha realizado con éxito.'))
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
        alert(`No se ha podido registrar al paciente ${checkName(data)}. Por favor intente nuevamente.`)
    })
}

let checkName = (patient) => {
    let name = patient.nombre
    if(patient.apellido !== undefined){
        name = name + ' ' + patient.apellido
    } 
    return name
} 

