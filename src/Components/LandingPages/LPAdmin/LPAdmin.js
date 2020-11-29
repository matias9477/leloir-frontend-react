import React, { Component } from 'react';

import NavBar from '../../NavBar/NavBar';
import AnalisisPendientes from '../LPBioquímico/AnalisisPendientes';
import Afluencia from '../LPSecretaria/Afluencia';
import Domicilios from '../Domicilios';
import Charts from '../Charts';
import './../../styles.css';
import './LPAdmin.css';

class LPBioquimico extends Component {
    
    render() {
        return (
            
            <div>
                <NavBar/>
                <div className='avoidMenu'>
                    <div className='LPAdmin'>
                        <Afluencia />
                        <div className="ui divider"/>
                            <div className='LPBio'>
                                <AnalisisPendientes /> 
                                <div className='domicilios'>
                                    <Domicilios />
                                </div>
                            </div>
                        <div className="ui divider"/>
                        <Charts />
                    </div>
                </div>
            </div>
            
        );
    }
}


export default LPBioquimico;