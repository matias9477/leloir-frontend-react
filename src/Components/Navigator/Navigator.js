import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import FormAlta from '../AltaPaciente/FormAlta';
import FormConsulta from '../ConsultaPaciente/FormConsulta';
import LoginForm from '../Login/LoginLayout';
import MenuLateral from '../MenuLateral';
import './../styles.css';
import AuthenticatedRoute from '../Navigator/AuthenticatedRoute';
import {Image} from 'semantic-ui-react';

function Navigator(){
    return(
      <Router>
      <div>
        <Switch>
          <Route path="/login" component={LoginForm}/>
          <AuthenticatedRoute path="/home" exact component={Home}/>
          <AuthenticatedRoute path="/alta" component={FormAlta}/>
          <AuthenticatedRoute path="/consulta" component={FormConsulta}/>
          <AuthenticatedRoute path="/404" component={FeatureInProgress}/>
        </Switch>
      </div>
      </Router>
    );
  }
  
  const Home = () =>(
    <div>
      <MenuLateral/>
      <h1>Landing Page</h1>
    </div>
  );

  const FeatureInProgress = () =>(
    <div>
      <Image
      src="https://bitmovin.com/wp-content/uploads/2018/07/9-missing-main6.jpg"
      centered
      />

    </div>
  );
  
  export default Navigator;
