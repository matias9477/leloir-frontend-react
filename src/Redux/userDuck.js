import axios from "axios";

import AuthenticationService from '../Services/AuthenticationService'
import { urlLoggedUser, urlSignUp } from "../Constants/URLs";

//constant
let initialData = {
    loggedIn:false,
    fetching:false,
    hasLoginFailed:false,
    loggedInUser: [],
    flagLoggedUser: false,
}

let LOGIN = "LOGIN"
let LOGIN_SUCCESS = "LOGIN_SUCCESS"
let LOGIN_ERROR = "LOGIN_ERROR"

let LOGOUT = "LOGOUT"

let GET_LOGGED_IN_USER = "GET_LOGGED_IN_USER"
let GET_LOGGED_IN_USER_SUCCESS = "GET_LOGGED_IN_USER_SUCCESS"
let GET_LOGGED_IN_USER_ERROR = "GET_LOGGED_IN_USER_ERROR"
let GET_LOGGED_IN_USER_FROM_STORE = "GET_LOGGED_IN_USER_FROM_STORE"

let ADD_USER = "ADD_USER"
let ADD_USER_SUCCESS = "ADD_USER_SUCCESS"
let ADD_USER_ERROR = "ADD_USER_ERROR"

//reducer

export default function reducer(state = initialData,action){
    switch(action.type){
        case LOGIN:
            return {...state, fetching:true}
        case LOGIN_ERROR:
            return {...state, fetching: false, error:action.payload, hasLoginFailed:true}
        case LOGIN_SUCCESS:
            return {...state, fetching:false, ...action.payload, loggedIn:true, hasLoginFailed:false}
        
        case LOGOUT:
            return {...initialData}

        case GET_LOGGED_IN_USER:
            return {...state, fetching:true}
        case GET_LOGGED_IN_USER_SUCCESS:
            return {...state, fetching:false, loggedInUser: action.payload, flagLoggedUser:true}
        case GET_LOGGED_IN_USER_ERROR:
            return {...state, fetching:false, error:action.payload}
        case GET_LOGGED_IN_USER_FROM_STORE:
            return {...state, fetching:false, loggedInUser: action.payload}

        case ADD_USER:
            return {...state, fetching:true}
        case ADD_USER_ERROR:
            return {...state, fetching:false, error:action.payload}
        case ADD_USER_SUCCESS:
            return {...state, fetching:false}

        default:   
            return state
    }
}

//aux para guardar cosas en localstorage
//sirve para respaldar el storage de redux, podemos guardar en localstorage todo lo que queremos guardar aunque se f5 la pagina
function saveStorage(name, data){
    localStorage.setItem(name, JSON.stringify(data));
}


//action
export let loginAction = (username, password) => (dispatch, getState) =>{
    dispatch({
        type: LOGIN
    })
    return AuthenticationService.executeJwtAuthenticationService(username, password)
    .then((response) =>{
        AuthenticationService.registerSuccessfulLoginForJwt(username, response.data.tokenType, response.data.accessToken)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        }
    )
    saveStorage("user", response.data)
    }).catch(e=>{
        console.log(e)
        dispatch({
            type:LOGIN_ERROR,
            payload:e.message
        })
    })
}

export let logoutAction = () => (dispatch) =>{

    if (AuthenticationService.isUserLoggedIn()){
        AuthenticationService.logout();
    }
    dispatch({
        type: LOGOUT
    })
    localStorage.clear();
}

export let getLoggedInUserAction = () => (dispatch, getState) =>{

    const state = getState()

    if(state.user.flagLoggedUser){
        dispatch({
            type: GET_LOGGED_IN_USER_FROM_STORE,
            payload: state.user.loggedInUser,
        })
    }else{

        dispatch({
            type: GET_LOGGED_IN_USER,
        })
        return axios.get(urlLoggedUser)
        .then(res=>{
            dispatch({
                type: GET_LOGGED_IN_USER_SUCCESS,
                payload: res.data,
            })
        })
        .catch(err=>{
            dispatch({
                type: GET_LOGGED_IN_USER_ERROR,
                payload: err.message
            })
        })
    }
}

export let addUserAction = (data) => (dispatch, getState) =>{
    dispatch({
        type: ADD_USER,
    })

    return axios.post(urlSignUp, data)
    .then(res=>{
        dispatch({
            type: ADD_USER_SUCCESS,
        })
        alert(`Se ha registrado el usuario con éxito.`)
    })
    .catch(err=>{
        dispatch({
            type: ADD_USER_ERROR,
            payload: err.message
        })
       
        alert(`No se ha podido registrar el usuario. Por favor intente nuevamente.`)
    })
}