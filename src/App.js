import React from "react";
import "./App.css";
import 'semantic-ui-css/semantic.min.css';
import MenuOpciones from './Components/MenuOpciones';
import LPSecretaria from './Components/LandingPages/LPSecretaria/LPSecretaria'


function App(){
  return(
    <div className="App">
      {/* <MenuOpciones></MenuOpciones> */}
      <LPSecretaria/>
    </div>
  );
}

export default App;
