import AuthenticationService from '../Services/AuthenticationService'

//constant
let initialData = {
    loggedIn:false,
    fetching:false,
    hasLoginFailed:false
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
            return {...state, fetching: false, error:action.payload, hasLoginFailed:true}
        case LOGIN_SUCCESS:
            return {...state, fetching:false, ...action.payload, loggedIn:true, hasLoginFailed:false}
        case LOGOUT:
            return {...initialData}
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