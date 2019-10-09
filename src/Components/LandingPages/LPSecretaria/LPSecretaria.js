import React, { Component } from 'react';
import "./../../styles.css";
import MenuOpciones from '../../MenuOpciones';
import Afluencia from './Afluencia';

class LPSecretaria extends Component {
    
    render() {
        return (
            
            <div className="union">
                <MenuOpciones/>
                <div className="avoidMenu">   
                    <Afluencia/>
                </div>
            </div>
            
        );
    }
}


export default LPSecretaria;