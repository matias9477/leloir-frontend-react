import React, { Component } from 'react';

import NavBar from '../../NavBar/NavBar';
import AnalisisPendientes from '../LPBioquímico/AnalisisPendientes';
import Afluencia from '../LPSecretaria/Afluencia';
import Domicilios from '../Domicilios';
import './../../styles.css';
import './LPAdmin.css';

class LPBioquimico extends Component {
    
    render() {
        return (
            
            <div>
                <NavBar/>
                <div className='avoidMenu'>
                    <div className='LPAdmin'>
                        <AnalisisPendientes /> 
                        <div className="ui divider"/>
                        <Afluencia />
                        <div className="ui divider"/>
                        <Domicilios />
                    </div>
                </div>
            </div>
            
        );
    }
}


export default LPBioquimico;