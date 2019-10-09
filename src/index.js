import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AuthenticatedRoute from './Services/AuthenticatedRoute';
import LoginForm from './Components/Login/LoginLayout';
import TablaPaciente from './Components/Paciente/TablaPaciente';
import FormAlta from './Components/Paciente/FormAlta';
import FormConsulta from './Components/Paciente/FormConsulta';
import TablaObraSocial from './Components/ObraSocial/TablaObraSocial';
import ConsultaObraSocial from './Components/ObraSocial/ConsultaObraSocial';
import AltaObraSocial from './Components/ObraSocial/AltaObraSocial';
import DeterminacionesContainer from './Components/Determinacion/DeterminacionesContainer';
import FormConsultaDeterminacion from './Components/Determinacion/FormConsulta';
import AltaMuestra from './Components/Muestra/FormAlta';
import FormAltaDeterminacion from './Components/Determinacion/FormAlta';
import TablaMuestra from './Components/Muestra/TablaMuestra';


ReactDOM.render(
    //aca va a ir el provider del store de redux, envolviendo el siguiente Router
    <Router>
        <Switch>
        <AuthenticatedRoute exact path="/" component={App}/>
        <Route path="/login" component={LoginForm}/>
        <AuthenticatedRoute exact path="/pacientes" component={TablaPaciente}/>
        <AuthenticatedRoute exact path="/pacientes/add" component={FormAlta}/>
        <AuthenticatedRoute exact path="/pacientes/consulta/:id" component={FormConsulta}/>
        <AuthenticatedRoute exact path="/obras_sociales" component={TablaObraSocial}/>
        <AuthenticatedRoute exact path="/obras_sociales/consulta/:id" component={ConsultaObraSocial}/>
        <AuthenticatedRoute exact path="/obras_sociales/add" component={AltaObraSocial}/><AuthenticatedRoute exact path="/determinaciones" component={DeterminacionesContainer}/>
        <AuthenticatedRoute exact path="/" component={App}/>
        <Route path="/login" component={LoginForm}/>
        <AuthenticatedRoute exact path="/determinaciones" component={DeterminacionesContainer}/>
        <AuthenticatedRoute exact path="/determinaciones/add" component={FormAltaDeterminacion}/>
        <AuthenticatedRoute exact path="/determinaciones/consulta/:codigoPractica" component={FormConsultaDeterminacion}/>
        <AuthenticatedRoute exact path="/muestras" component={TablaMuestra}/>
        <AuthenticatedRoute exact patj="/muestras" component={AltaMuestra}/>
        </Switch>
    </Router>


    , document.getElementById('root'));
registerServiceWorker();
