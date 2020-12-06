import React from 'react'
import { Header, Grid, Segment, Divider } from 'semantic-ui-react'

import './analisisStyle.css';

function checkUnidadMedida(unidad) {
    if(unidad==='' || unidad===undefined || unidad===null){
        return "Unidad no especificada"
    }
    return unidad
}

const SelectedDeterminaciones = props => {

    return (
        <div>
            {props.determinaciones.length===0 ? null : 
                <Segment>
                    <Header as='h4'>Determinaciones a realizar</Header>
                    <Divider/>
                    <div className='determinacionesARealizar'>
                        {props.determinaciones.map((determinacion, index)=>(
                            <Grid columns='equal' key={index}>
                                <Grid.Column>
                                    <div>{determinacion.codigoPractica}</div>
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <div>{determinacion.descripcionPractica}</div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div>{checkUnidadMedida(determinacion.unidadMedida)}</div>
                                </Grid.Column>
                            </Grid>
                        ))}
                    </div>
                </Segment>
            }
           
    </div>    
    )
}

export default SelectedDeterminaciones