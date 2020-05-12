import React from 'react';
import '../styles.css';
import {Button, Segment} from 'semantic-ui-react';

export const Modal = ({handleClose, show, children}) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <Segment raised compact className="modal-main">

                <Segment>
                    {children}
                </Segment>

                <Button floated='right' color='red' onClick={handleClose}>Cerrar sin guardar cambios</Button>
            </Segment>
        </div>
    );
};