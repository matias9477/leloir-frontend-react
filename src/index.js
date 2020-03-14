import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import Routes from './Routes';

import { BrowserRouter } from 'react-router-dom';
import './index.css';


import {Provider} from 'react-redux'
import generateStore from './Redux/store'


//se crea el store con los reducers indicados
let store = generateStore();

let WithRouter = () => <BrowserRouter> <Routes /> </BrowserRouter>
let WithStore = () => <Provider store={store}> <WithRouter/> </Provider>



ReactDOM.render(<WithStore /> , document.getElementById('root'));
registerServiceWorker();
