import React from "react";
import "./App.css";
import 'semantic-ui-css/semantic.min.css';
import Navigator from './Components/Navigator/Navigator';
//import LoginForm from './Components/Login/LoginLayout';
import LPSecretaria from './Components/LandingPages/LPSecretaria';

function App(){
  return(
    <div className="App">
      <LPSecretaria/>
    </div>
  );
}

export default App;
