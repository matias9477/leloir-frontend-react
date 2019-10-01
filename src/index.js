import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AuthenticatedRoute from './Services/AuthenticatedRoute';
import LoginForm from './Components/Login/LoginLayout';
import Tabla2 from './Components/TablaPaciente/Tabla2';
import FormAlta from './Components/AltaPaciente/FormAlta';
import FormConsulta from './Components/ConsultaPaciente/FormConsulta';
import TablaObraSocial from './Components/ObraSocial/TablaObraSocial';
import ConsultaObraSocial from './Components/ObraSocial/ConsultaObraSocial';
import AltaObraSocial from './Components/ObraSocial/AltaObraSocial';
import DeterminacionesContainer from './Components/Determinacion/DeterminacionesContainer';
import FormConsultaDeterminacion from './Components/Determinacion/FormConsulta';

import FormAltaDeterminacion from './Components/Determinacion/FormAlta';

import FormNuevoAnalisis from './Components/Analisis/FormNuevoAnalisis';


ReactDOM.render(
    //aca va a ir el provider del store de redux, envolviendo el siguiente Router
    <Router>
        <Switch>
        <AuthenticatedRoute exact path="/" component={App}/>
        <Route path="/login" component={LoginForm}/>
        <AuthenticatedRoute exact path="/pacientes" component={Tabla2}/>
        <AuthenticatedRoute exact path="/pacientes/add" component={FormAlta}/>
        <AuthenticatedRoute exact path="/pacientes/consulta/:id" component={FormConsulta}/>
        <AuthenticatedRoute exact path="/obras_sociales" component={TablaObraSocial}/>
        <AuthenticatedRoute exact path="/obras_sociales/consulta/:id" component={ConsultaObraSocial}/>
        <AuthenticatedRoute exact path="/obras_sociales/add" component={AltaObraSocial}/>
        <AuthenticatedRoute exact path="/" component={App}/>
        <Route path="/login" component={LoginForm}/>
        <AuthenticatedRoute exact path="/pacientes" component={Tabla2}/>
        <AuthenticatedRoute exact path="/pacientes/add" component={FormAlta}/>
        <AuthenticatedRoute exact path="/pacientes/consulta/:id" component={FormConsulta}/>
        <AuthenticatedRoute exact path="/determinaciones" component={DeterminacionesContainer}/>
        <AuthenticatedRoute exact path="/determinaciones/add" component={FormAltaDeterminacion}/>
        <AuthenticatedRoute exact path="/determinaciones/consulta/:codigoPractica" component={FormConsultaDeterminacion}/>
        <AuthenticatedRoute exact path="/analisis" component={FormNuevoAnalisis}/>
        </Switch>
    </Router>




,document.getElementById('root'));
registerServiceWorker();
