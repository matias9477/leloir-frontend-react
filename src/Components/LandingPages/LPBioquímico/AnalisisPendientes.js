import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import { getAnalisisPendientesAction } from '../../../Redux/analisisDuck';
import { urlConsultaAnalisis } from '../../../Constants/NavUrl';

import { Link } from 'react-router-dom';
import { Button, List, Label, Icon, Header } from 'semantic-ui-react'


class AnalisisPendientes extends Component {

    componentDidMount() {
        this.props.getAnalisisPendientesAction();
    }

    
    renderList = (analisisList) =>(
        <List divided verticalAlign='middle'>
            {analisisList.map( analisis => (
                 <List.Item>
                    <List.Content floated='right'>
                        <Button as={Link} to={{pathname: urlConsultaAnalisis+analisis.idAnalisis, state: { prevPath: window.location.pathname }}} color='blue'>Ir</Button>
                    </List.Content>
                    <List.Content floated='left'>
                        
                        <Label color='blue' horizontal><Icon name='clipboard outline'/>  ID  <Label.Detail>{analisis.idAnalisis}</Label.Detail></Label>
                        <Label color='blue' horizontal><Icon name='user circle'/>  Paciente  <Label.Detail>{analisis.paciente}</Label.Detail></Label>
                    </List.Content>
                </List.Item>
            ))}
        
        </List>
    )

    render() {
        const { analisisPendientes, fetching } = this.props;
        console.log(analisisPendientes)
        return (
            <div className="analisis-pendientes"> 
                {fetching ? 
                    <div className='spinner'>
                        <ClipLoader
                            size={60}
                            color={'black'}
                        />
                    </div> :
                    <div>
                        <Header as='h3' dividing>Análisis para revisar</Header>

                        {this.renderList(analisisPendientes)}
                    </div>
                }
            </div>
        );
    }
}


const mapStateToProps = state => ({  
    analisisPendientes: state.analisis.analisisPendientes.filter(function(analisis){
        return analisis.estadoAnalisis === "EN_PROCESO";
    }),
    fetching: state.analisis.fetchingAnalisisPendientes,
})

export default connect(mapStateToProps, { getAnalisisPendientesAction })(AnalisisPendientes)