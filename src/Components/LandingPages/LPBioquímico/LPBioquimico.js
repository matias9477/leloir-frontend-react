import React, { Component } from 'react';

import NavBar from '../../NavBar/NavBar';
import Domicilios from '../Domicilios';
import AnalisisPendientes from './AnalisisPendientes';
import Charts from '../Charts';

import './../../styles.css';
import './LPBioquimico.css';

class LPBioquimico extends Component {
    
    render() {
        return (
            
            <div>
                <NavBar/>
                <div className='avoidMenu'>
                    <div className='LPBio'>
                        <AnalisisPendientes />
                        <div className='domicilios'>
                            <Domicilios />
                        </div>

                    </div>
                    <br/>
                        <div className="charts"> 
                            <Charts />
                        </div>
                </div>
            </div>
            
        );
    }
}


export default LPBioquimico;