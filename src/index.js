import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AuthenticatedRoute from './Services/AuthenticatedRoute';
import LoginForm from './Components/Login/LoginLayout';
import TablaPaciente from './Components/Paciente/TablaPaciente';
import FormAlta from './Components/Paciente/FormAlta';
import FormConsulta from './Components/Paciente/FormConsulta';
import DeterminacionesContainer from './Components/Determinacion/DeterminacionesContainer';
import FormConsultaDeterminacion from './Components/Determinacion/FormConsulta';
import TablaObraSocial from './Components/ObraSocial/TablaObraSocial';
import ConsultaObraSocial from './Components/ObraSocial/ConsultaObraSocial';
import AltaObraSocial from './Components/ObraSocial/AltaObraSocial';
import LogoutContainer from "./Components/Logout/LogoutContainer";

import FormAltaDeterminacion from './Components/Determinacion/FormAlta';
import FormNuevoAnalisis from './Components/Analisis/FormNuevoAnalisis';
import AjustesContainer from "./Components/Ajustes/AjustesContainer";
import TablaMuestra from './Components/Muestra/TablaMuestra';
import DiarioPracticasContainer from "./Components/DiarioPracticas/DiarioPracticasContainer";
import TablaAnalisis from './Components/Analisis/TablaAnalisis';
import ConsultaAnalisis from './Components/Analisis/ConsultaAnalisis';


ReactDOM.render(
    //aca va a ir el provider del store de redux, envolviendo el siguiente Router
    <Router>
        <Switch>
            <AuthenticatedRoute exact path="/" component={App} />
            <Route path="/login" component={LoginForm} />
            <AuthenticatedRoute exact path="/pacientes" component={TablaPaciente} />
            <AuthenticatedRoute exact path="/pacientes/add" component={FormAlta} />
            <AuthenticatedRoute exact path="/pacientes/consulta/:id" component={FormConsulta} />
            <AuthenticatedRoute exact path="/obras_sociales" component={TablaObraSocial} />
            <AuthenticatedRoute exact path="/obras_sociales/consulta/:id" component={ConsultaObraSocial} />
            <AuthenticatedRoute exact path="/obras_sociales/add" component={AltaObraSocial} />
            <AuthenticatedRoute exact path="/determinaciones" component={DeterminacionesContainer} />
            <AuthenticatedRoute exact path="/determinaciones/add" component={FormAltaDeterminacion} />
            <AuthenticatedRoute exact path="/determinaciones/consulta/:codigoPractica"
                component={FormConsultaDeterminacion} />
            <AuthenticatedRoute exact path="/analisis" component={TablaAnalisis} />
            <AuthenticatedRoute exact path="/analisis/add" component={FormNuevoAnalisis} />
            <AuthenticatedRoute exact path="/muestras" component={TablaMuestra} />
            <AuthenticatedRoute exact path="/Logout" component={LogoutContainer} />
            <AuthenticatedRoute exact path="/ajustes" component={AjustesContainer} />
            <AuthenticatedRoute exact path="/diario-practicas" component={DiarioPracticasContainer} />
            <AuthenticatedRoute exact path="/" component={App} />
            <Route path="/login" component={LoginForm} />
            <AuthenticatedRoute exact path="/pacientes" component={TablaPaciente} />
            <AuthenticatedRoute exact path="/pacientes/add" component={FormAlta} />
            <AuthenticatedRoute exact path="/pacientes/consulta/:id" component={FormConsulta} />
            <AuthenticatedRoute exact path="/obras_sociales" component={TablaObraSocial} />
            <AuthenticatedRoute exact path="/obras_sociales/consulta/:id" component={ConsultaObraSocial} />
            <AuthenticatedRoute exact path="/obras_sociales/add" component={AltaObraSocial} />
            <AuthenticatedRoute exact path="/determinaciones" component={DeterminacionesContainer} />
            <AuthenticatedRoute exact path="/determinaciones/add" component={FormAltaDeterminacion} />
            <AuthenticatedRoute exact path="/determinaciones/consulta/:codigoPractica" component={FormConsultaDeterminacion} />
            <AuthenticatedRoute exact path="/analisis" component={TablaAnalisis} />
            <AuthenticatedRoute exact path="/analisis/add" component={FormNuevoAnalisis} />
            <AuthenticatedRoute exact path="/analisis/consulta/:id" component={ConsultaAnalisis} />
            <AuthenticatedRoute exact path="/muestras" component={TablaMuestra} />
            <AuthenticatedRoute exact path="/Logout" component={LogoutContainer} />
            <AuthenticatedRoute exact path="/ajustes" component={AjustesContainer} />
        </Switch>
    </Router>


    , document.getElementById('root'));
registerServiceWorker();
