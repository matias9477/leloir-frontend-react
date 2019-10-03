import React, { Component } from 'react';
import "./../../styles.css";
import MenuOpciones from '../../MenuOpciones';
import Afluencia from './Afluencia';
import Cola from './Cola';

class LPSecretaria extends Component {
    constructor(props) {
        super(props);

    }
    

    render() {
        return (
            <div className="union" >
                <MenuOpciones/>
                <div className="afluence">
                <Afluencia/>
                </div>
            </div>
        );
    }
}


export default LPSecretaria;