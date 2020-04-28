import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import patientsReducer from './patientsDuck'
import userReducer from './userDuck'
import obrasSocialesReducer from './obrasSocialesDuck'
import determinacionesReducer from './determinacionesDuck'

import thunk from 'redux-thunk';

//creation of the rootreducer (reducer that is composed of all the other reducers using combinereducers)
let rootReducer = combineReducers({
    patients: patientsReducer,
    user: userReducer,
    obrasSociales: obrasSocialesReducer,
    determinaciones: determinacionesReducer,
})



//agregamos las devtools para usar en chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//función para crear la store
export default function generateStore(){
    let store = createStore(rootReducer, 
        composeEnhancers(applyMiddleware(thunk))
    )

    return store;
}










