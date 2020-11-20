import axios from "axios";

import AuthenticationService from '../Services/AuthenticationService'
import { urlLoggedUser, urlSignUp, urlAllUsers, urlDeleteUser, urlChangePass } from "../Constants/URLs";

//constant
let initialData = {
    loggedIn:false,
    fetching:false,
    hasLoginFailed:false,
    loggedInUser: [],
    flagLoggedUser: false,
    allUsers: [],
    flagAllUsers: false,
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

let GET_ALL_USERS = "GET_ALL_USERS"
let GET_ALL_USERS_SUCCESS = "GET_ALL_USERS_SUCCESS"
let GET_ALL_USERS_ERROR = "GET_ALL_USERS_ERROR"
let GET_ALL_USERS_FROM_STORE = "GET_ALL_USERS_FROM_STORE"

let DELETE_USER = "DELETE_USER"
let DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS"
let DELETE_USER_ERROR = "DELETE_USER_ERROR"

let CHANGE_PASSWORD = "CHANGE_PASSWORD"
let CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS"
let CHANGE_PASSWORD_ERROR = "CHANGE_PASSWORD_ERROR"

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
            return {...state, fetching:false, flagAllUsers:false}

        case GET_ALL_USERS:
            return {...state, fetching:true}
        case GET_ALL_USERS_SUCCESS:
            return {...state, fetching:false, allUsers: action.payload, flagAllUsers:true}
        case GET_ALL_USERS_ERROR:
            return {...state, fetching:false, error:action.payload}
        case GET_ALL_USERS_FROM_STORE:
            return {...state, fetching:false, loggedInUser: action.payload}

        case DELETE_USER:
            return {...state, fetching:true}
        case DELETE_USER_SUCCESS:
            return {...state, fetching:false, flagAllUsers:false}            
        case DELETE_USER_ERROR:
            return {...state, fetching:false, error:action.payload}

        case CHANGE_PASSWORD:
            return {...state, fetching:true}
        case CHANGE_PASSWORD_SUCCESS:
            return {...state, fetching:false, flagAllUsers:false}            
        case CHANGE_PASSWORD_ERROR:
            return {...state, fetching:false, error:action.payload}

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

export let getAllUsers = () => (dispatch, getState) =>{

    const state = getState()

    if(state.user.flagAllUsers){
        dispatch({
            type: GET_ALL_USERS_FROM_STORE,
            payload: state.user.loggedInUser,
        })
    }else{

        dispatch({
            type: GET_ALL_USERS,
        })
        return axios.get(urlAllUsers)
        .then(res=>{
            dispatch({
                type: GET_ALL_USERS_SUCCESS,
                payload: Object.values(res.data).flat(),
            })
        })
        .catch(err=>{
            dispatch({
                type: GET_ALL_USERS_ERROR,
                payload: err.message
            })
        })
    }
}

export let deleteUser = (username) => (dispatch, getState) => {
    dispatch({
        type: DELETE_USER
    })
    
    return axios.delete(urlDeleteUser + username)
    .then(res=>{
        dispatch({
            type: DELETE_USER_SUCCESS,
        })
        return dispatch(getAllUsers(), alert("Se ha eliminado el usuario " + username + " con éxito."))
    })
    .catch(err=>{
        dispatch({
            type: DELETE_USER_ERROR,
            payload: err.message
        })
    })
}

export let changePasswordAction = (data) => (dispatch, getState) => {
    dispatch({
        type: CHANGE_PASSWORD
    })
    
    return axios.post(urlChangePass, data)
    .then(res=>{
        dispatch({
            type: CHANGE_PASSWORD_SUCCESS,
        })
        return dispatch(getAllUsers(), alert("Se ha modificado la contraseña con éxito."))
    })
    .catch(err=>{
        dispatch({
            type: CHANGE_PASSWORD_ERROR,
            payload: err.message
        })
    })
}