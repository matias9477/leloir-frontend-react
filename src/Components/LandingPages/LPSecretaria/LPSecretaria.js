import React, { Component } from 'react';
import "./../../styles.css";
import NavBar from '../../NavBar/NavBar'
import Afluencia from './Afluencia';

class LPSecretaria extends Component {
    
    render() {
        return (
            
            <div className="union">
                <NavBar/>
                <div className="avoidMenu">   
                    <Afluencia/>
                </div>
            </div>
            
        );
    }
}


export default LPSecretaria;