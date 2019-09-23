import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AuthenticatedRoute from './Services/AuthenticatedRoute';
import LoginForm from './Components/Login/LoginLayout';
import TablaPaciente from './Components/Paciente/TablaPaciente';
import FormAlta from './Components/Paciente/FormAlta';
import FormConsulta from './Components/Paciente/FormConsulta';
import DeterminacionesContainer from './Components/Determinacion/DeterminacionesContainer';

ReactDOM.render(
    //aca va a ir el provider del store de redux, envolviendo el siguiente Router
    <Router>
        <Switch>
        <AuthenticatedRoute exact path="/" component={App}/>
        <Route path="/login" component={LoginForm}/>
        <AuthenticatedRoute exact path="/pacientes" component={TablaPaciente}/>
        <AuthenticatedRoute exact path="/pacientes/add" component={FormAlta}/>
        <AuthenticatedRoute exact path="/pacientes/consulta/:id" component={FormConsulta}/>
        <AuthenticatedRoute exact path="/determinaciones" component={DeterminacionesContainer}/>
        </Switch>
    </Router>




,document.getElementById('root'));
registerServiceWorker();
