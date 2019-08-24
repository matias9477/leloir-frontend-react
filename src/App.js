import React from "react";
import "./App.css";
import 'semantic-ui-css/semantic.min.css';
//import Navigator from './Components/Navigator/Navigator';
import LoginForm from './Components/Login/LoginLayout';

function App(){
  return(
    <div className="App">
      <LoginForm/>
    </div>
  );
}

export default App;
