import {AuthenticationService} from '../Services/AuthenticationService'
import {Redirect} from 'react-router-dom';

//constant
let initialData = {
    loggedIn:false,
    fetching:false
}
let LOGIN = "LOGIN"
let LOGIN_SUCCESS = "LOGIN_SUCCESS"
let LOGIN_ERROR = "LOGIN_ERROR"
let LOGOUT = "LOGOUT"

//reducer

export default function reducer(state = initialData,action){
    switch(action.type){
        case LOGIN:
            return {...state, fetching:true}
        case LOGIN_ERROR:
            return {...state, fetching: false, error:action.payload}
        case LOGIN_SUCCESS:
            return {...state, fetching:false, ...action.payload, loggedIn:true}
        case LOGOUT:
            return {...initialData}
        default:   
            return state

    }
}

//aux para guardar cosas en localstorage
//sirve para respaldar el storage de redux, podemos guardar en localstorage todo lo que queremos guardar aunque se f5 la pagina
function saveStorage(storage){
    localStorage.storage = JSON.stringify(storage); //esto se hace porque no puedo pasar objetos jeje

}


//action

export let logoutAction = () => (dispatch) =>{

    if (AuthenticationService.isUserLoggedIn()){
        AuthenticationService.logout();
        <Redirect to="/login" />
    }
    dispatch({
        type: LOGOUT
    })
    localStorage.removeItem('storage')
}