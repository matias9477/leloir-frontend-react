import React from "react";
import MenuLateral from '../MenuLateral';
import FormAlta from '../AltaPaciente/FormAlta';
import FormConsulta from '../ConsultaPaciente/FormConsulta';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function Navigator(){
    return(
      <Router>
      <div className="Navigator">
        <MenuLateral/>
        <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/alta" component={FormAlta}/>
        <Route path="/consulta" component={FormConsulta}/>
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
