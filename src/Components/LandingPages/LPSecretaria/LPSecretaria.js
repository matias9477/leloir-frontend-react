import React, { Component } from 'react';

import MenuOpciones from '../../MenuOpciones';
import Afluencia from './Afluencia';
import Cola from './Cola';

class LPSecretaria extends Component {
    constructor(props) {
        super(props);

    }
    

    render() {
        return (
            <div className="LPSecretaria" >
                <Afluencia/>
            </div>
        );
    }
}


export default LPSecretaria;