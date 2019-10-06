import React, { Component } from 'react';
import "./../../styles.css";
import MenuOpciones from '../../MenuOpciones';
import Afluencia from './Afluencia';
import {Grid, Col, Row} from 'semantic-ui-react'
import Cola from './Cola';

class LPSecretaria extends Component {
    constructor(props) {
        super(props);

    }
    

    render() {
        return (
            
            <div className="union">
                <MenuOpciones/>
                <div className="avoidMenu">         
                    <Grid>
                        <Grid.Column width={10}>
                            <h2>hola</h2>

                        </Grid.Column>
                        <Grid.Column width={10}>
                           <div className="afluence">
                               <h2>Cola de Espera</h2>
                               <Afluencia/>
                           </div>
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
            
        );
    }
}


export default LPSecretaria;