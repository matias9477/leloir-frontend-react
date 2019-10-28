import React from 'react';
import './styles.css';
import {Button, Segment, Divider} from 'semantic-ui-react';

export const Modal = ({handleClose, show, children}) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <Segment className="modal-main">
                <br/>
                <h2>Complete los resultados de las siguientes determinaciones:</h2>

                <Divider section/>
                <Segment>
                    {children}
                </Segment>

                <br/>
                <Button color='red' onClick={handleClose}>Cerrar sin guardar cambios</Button>
            </Segment>
        </div>
    );
};