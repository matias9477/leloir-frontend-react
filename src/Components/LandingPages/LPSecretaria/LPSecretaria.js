import React, { Component } from 'react';

import NavBar from '../../NavBar/NavBar';
import Afluencia from './Afluencia';
import Domicilios from '../Domicilios';
import Extraction from '../LPSecretaria/Extraction'
import './../../styles.css';
import './LPSecretaria.css';

class LPSecretaria extends Component {
    
    render() {
        return (
            
            <div>
                <NavBar/>
                <div className='avoidMenu'>
                    <div className='LPSecre'>
                        <div style={{display: 'flex', flexDirection:'row', width:'100%'  }}>
                        <Afluencia/>
                        <Extraction/>
                        </div>
                    <div className="ui divider"/>
                    <Domicilios/>
                    </div>
                </div>
            </div>
            
        );
    }
}


export default LPSecretaria;