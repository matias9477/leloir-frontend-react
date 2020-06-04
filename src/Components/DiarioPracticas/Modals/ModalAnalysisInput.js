import React from 'react';
import '../styles.css';
import {Button, Segment} from 'semantic-ui-react';

export const Modal = ({handleClose, show, children}) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <Segment raised compact className="modal-main">
                <Button 
                inverted
                color='red'
                floated='right' size='tiny'
                onClick={handleClose}>X</Button>
                
                <Segment>
                    {children}
                </Segment>

            </Segment>
        </div>
    );
};