import React, { Component } from 'react';

import NavBar from '../../NavBar/NavBar';
import Domicilios from '../Domicilios';
import './../../styles.css';
import './LPBioquimico.css';

class LPSecretaria extends Component {
    
    render() {
        return (
            
            <div>
                <NavBar/>
                <div className='avoidMenu'>
                    <div className='LPBio'>
                        aca iria algo para rellenar xd xd
                         <div className="ui divider"/>
                        <Domicilios/>
                    </div>
                </div>
            </div>
            
        );
    }
}


export default LPSecretaria;