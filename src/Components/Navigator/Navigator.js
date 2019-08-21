import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import FormAlta from '../AltaPaciente/FormAlta';
import FormConsulta from '../ConsultaPaciente/FormConsulta';
import Login from '../Login/Login';
import MenuLateral from '../MenuLateral';
import './../styles.css';
import AuthenticatedRoute from '../Navigator/AuthenticatedRoute';

function Navigator(){
    return(
      <Router>
      <div className="Navigator">
        <MenuLateral/>
        <Switch>
          <Route path="/login" component={Login}/>
          <AuthenticatedRoute path="/" exact component={Home}/>
          <AuthenticatedRoute path="/alta" component={FormAlta}/>
          <AuthenticatedRoute path="/consulta" component={FormConsulta}/>
        </Switch>
      </div>
      </Router>
    );
  }
  
  const Home = () =>(
    <div>
      <h1>Landing Page</h1>
    </div>
  );
  
  export default Navigator;
