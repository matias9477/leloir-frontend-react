import React from 'react';
import './styles.css';
import { Button } from 'semantic-ui-react';

export const Modal = ({ handleClose, show, children }) => {
    
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <Button  color='red' onClick={handleClose}>Cerrar sin guardar cambios</Button>
        </section>
      </div>
    );
  };