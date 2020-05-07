import React from 'react'
import { Header, Grid, Segment } from 'semantic-ui-react'

const SelectedDeterminaciones = props => {
    return (
        <div>
            {props.determinaciones.length===0 ? null : 
                <Segment>
                    <Header as='h4'>Determinaciones a realizar</Header>
                    <div>
                        {props.determinaciones.map(determinacion=>(
                            <Grid columns='equal'>
                                <Grid.Column>
                                    <div>{determinacion.codigoPractica}</div>
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <div>{determinacion.descripcionPractica}</div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div>$</div>
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