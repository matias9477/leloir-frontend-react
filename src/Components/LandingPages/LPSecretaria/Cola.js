import React, { Component } from 'react';
import FlipMove from 'react-flip-move';

import './LPSecretaria.css';

class Cola extends Component {

    constructor(props){
        super(props);
        this.state={
        }
        this.createPatient = this.createPatient.bind(this);
    }

    createPatient(patient){
        return <li onClick={() => this.delete(patient.key)}
         key={patient.key}>{patient.text}</li>
    }

    delete(key){
        this.props.delete(key);
    }

    render(){
        var patientEntries = this.props.entries;
        var listPatients = patientEntries.map(this.createPatient);

        return (
            <ul className="List">
                <FlipMove duration={200} easing="ease-out">
                {listPatients}
                </FlipMove>
            </ul>
        );
    }

}


export default Cola;