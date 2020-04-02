import axios from 'axios'
import {urlPacientes} from '../Constants/URLs'



//constants

//
let initialData = {
    fetching: false,
    patients: [],
    upToDate: false,
}


let GET_PATIENTS = "GET_PATIENTS"
let GET_PATIENTS_SUCCESS = "GET_PATIENTS_SUCCESS"
let GET_PATIENTS_ERROR = "GET_PATIENTS_ERROR"
let GET_PATIENTS_FROM_STORE = "GET_PATIENTS_FROM_STORE"





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
