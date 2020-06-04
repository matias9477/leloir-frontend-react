import React, { Component } from 'react';

import NavBar from '../../NavBar/NavBar';
import Afluencia from './Afluencia';
import './../../styles.css';

class LPSecretaria extends Component {
    
    render() {
        return (
            
            <div>
                <NavBar/>
                <div className='avoidMenu'>
                    <Afluencia/>
                </div>
            </div>
            
        );
    }
}


export default LPSecretaria;