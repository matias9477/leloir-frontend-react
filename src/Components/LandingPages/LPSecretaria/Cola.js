import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LPSecretaria.css';
import { Item } from 'semantic-ui-react';

class Cola extends Component {

    createPatient(patient){
        return <li key={patient.key}>{patient.text}</li>
    }

    render(){
        var patientEntries = this.props.entries;
        var listPatients = patientEntries.map(this.createPatient);

        return (
            <ul className="List">
                {listPatients}
            </ul>
        );
    }

}


export default Cola;