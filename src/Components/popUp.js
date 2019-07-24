import React from "react";
import Popup from "reactjs-popup";
 
export default () => (
  <Popup trigger={<button> Trigger</button>} position="right center">
    <div>Paciente registrado con éxito.</div>
  </Popup>
);