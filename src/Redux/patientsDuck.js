import axios from 'axios'

import {urlPacientes} from '../Constants/URLs'


//constants

//
let initialData = {
    fetching: false,
    patients: [],
}


let GET_PATIENTS = "GET_PATIENTS"
let GET_PATIENTS_SUCCESS = "GET_PATIENTS_SUCCESS"
let GET_PATIENTS_ERROR = "GET_PATIENTS_ERROR"





//reducer
export default function reducer(state = initialData, action){
    switch(action.type){
        case GET_PATIENTS:
            return {...state, fetching:true}
        case GET_PATIENTS_ERROR:
            return {...state, fetching:false, error:action.payload}
        case GET_PATIENTS_SUCCESS:
            return {...state, fetching:false, patients: action.payload}

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
