import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthenticatedRoute from './Services/AuthenticatedRoute';
import App from './App';

import LandingPages from './Components/LandingPages/LandingPages';

import LoginForm from './Components/Login/LoginLayout';
import LogoutContainer from './Components/Logout/LogoutContainer';
import AjustesContainer from './Components/Ajustes/AjustesContainer';

import TablaPaciente from './Components/Paciente/TablaPaciente';
import FormAlta from './Components/Paciente/FormAlta';
import FormConsulta from './Components/Paciente/FormConsulta';

import TablaObraSocial from './Components/ObraSocial/TablaObraSocial';
import ConsultaObraSocial from './Components/ObraSocial/ConsultaObraSocial';
import AltaObraSocial from './Components/ObraSocial/AltaObraSocial';

import DeterminacionesContainer from './Components/Determinacion/DeterminacionesContainer';
import FormConsultaDeterminacion from './Components/Determinacion/FormConsulta';
import FormAltaDeterminacion from './Components/Determinacion/FormAlta';

import TablaAnalisis from './Components/Analisis/TablaAnalisis';
import FormNuevoAnalisis from './Components/Analisis/FormNuevoAnalisis';
import ConsultaAnalisis from './Components/Analisis/ConsultaAnalisis';

import TablaMuestra from './Components/Muestra/TablaMuestra';
import ConsultaMuestra from './Components/Muestra/ConsultaMuestra';

import DiarioPracticas from './Components/DiarioPracticas/DiarioPracticas';

import iFramePBI from './Components/Reportes/iFramePBI';

import CajaContainer from './Components/Caja/CajaContainer';

import TablaDomicilio from './Components/Domicilio/TablaDomicilio';
import FormNuevoDomicilio from './Components/Domicilio/AltaDomicilio';
import ConsultaDomicilio from './Components/Domicilio/ConsultaDomicilio';


export default function Routes() {
    return (
        <Switch>
            <AuthenticatedRoute exact path='/App' component={App}/>
            <AuthenticatedRoute exact path='/' component={LandingPages}/>

            <Route path='/login' component={LoginForm}/>
            <AuthenticatedRoute exact path='/Logout' component={LogoutContainer}/>
            <AuthenticatedRoute exact path='/ajustes' component={AjustesContainer}/>

            <AuthenticatedRoute exact path='/pacientes' component={TablaPaciente}/>
            <AuthenticatedRoute exact path='/pacientes/add' component={FormAlta}/>
            <AuthenticatedRoute exact path='/pacientes/consulta/:id' component={FormConsulta}/>

            <AuthenticatedRoute exact path='/obras_sociales' component={TablaObraSocial}/>
            <AuthenticatedRoute exact path='/obras_sociales/consulta/:id' component={ConsultaObraSocial}/>
            <AuthenticatedRoute exact path='/obras_sociales/add' component={AltaObraSocial}/>

            <AuthenticatedRoute exact path='/determinaciones' component={DeterminacionesContainer}/>
            <AuthenticatedRoute exact path='/determinaciones/add' component={FormAltaDeterminacion}/>
            <AuthenticatedRoute exact path='/determinaciones/consulta/:codigoPractica' component={FormConsultaDeterminacion}/>

            <AuthenticatedRoute exact path='/analisis' component={TablaAnalisis}/>
            <AuthenticatedRoute exact path='/analisis/add' component={FormNuevoAnalisis}/>
            <AuthenticatedRoute exact path='/analisis/consulta/:id' component={ConsultaAnalisis}/>

            <AuthenticatedRoute exact path='/muestras' component={TablaMuestra}/>
            <AuthenticatedRoute exact path='/muestras/consulta/:id' component={ConsultaMuestra}/>

            <AuthenticatedRoute exact path='/diario-practicas' component={DiarioPracticas}/>
            
            <AuthenticatedRoute exact path='/reportes' component={iFramePBI}/>
            
            <AuthenticatedRoute exact path="/caja" component={CajaContainer} />

            <AuthenticatedRoute exact path="/domicilios" component={TablaDomicilio}/>
            <AuthenticatedRoute exact path="/domicilios/add" component={FormNuevoDomicilio}/>
            <AuthenticatedRoute exact path="/domicilios/consulta/:id" component={ConsultaDomicilio}/>

        </Switch>
    )
}