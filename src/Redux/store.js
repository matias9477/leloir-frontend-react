import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import patientsReducer, {getPatientsAction} from './patientsDuck'
import userReducer, {loginAction} from './userDuck'

import thunk from 'redux-thunk';

//creation of the rootreducer (reducer that is composed of all the other reducers using combinereducers)
let rootReducer = combineReducers({
    patients: patientsReducer,
    user: userReducer,
})



//agregamos las devtools para usar en chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//función para crear la store
export default function generateStore(){
    let store = createStore(rootReducer, 
        composeEnhancers(applyMiddleware(thunk))
    )
     getPatientsAction()(store.dispatch, store.getState)
     loginAction()(store.dispatch, store.getState)
    //aca le pasamos a la función las actions y por parametro a la función que devuelven las actions el dispatch y si es necesario el getState
    //ej
    // getCharactersAction()(store.dispatch, store.getState)
    // restoreSessionAction()(store.dispatch)

    return store;
}










