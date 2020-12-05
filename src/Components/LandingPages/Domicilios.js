import React, { Component } from 'react';
import { Table, Header } from 'semantic-ui-react'
import ClipLoader from 'react-spinners/ClipLoader'
import { connect } from 'react-redux';

import { getTomorrowDomicilios } from '../../Redux/domiciliosDuck'
import './domicilios.css';


class Domicilios extends Component {

    componentDidMount() {
        this.props.getTomorrowDomicilios()
    }

    createDomicilio = (domicilio) =>{
        if(domicilio === undefined)
        {
            return null;
        } else return <Table.Row>
                        <Table.Cell>{domicilio.direccion}</Table.Cell>
                        <Table.Cell>{domicilio.descripcion ? domicilio.descripcion : 'No disponible'}</Table.Cell>
                        <Table.Cell>{domicilio.nombrePaciente ? domicilio.nombrePaciente : 'No registrado'}</Table.Cell>
                      </Table.Row>
    }


    messageNoDomicilios = (listDomicilios) =>{
        if(listDomicilios===undefined || listDomicilios.length>0 ){
            return null;
        } else return <Header as='h5' icon='home' textAlign='center' color='red'>No hay domicilios registrados para mañana.</Header>
    }


    render() {
        const { fetching, domicilios } = this.props
        var listDomicilios
        if(!fetching){
         listDomicilios = domicilios.map(this.createDomicilio)
        }

        var date = new Date()

        console.log(date.getDate()+1)
        console.log(date.getMonth()+1)

        return (
            <div style={{display: 'flex', flexDirection:'row', width:'100%'}}>

            <div className='Domicilios'>
            <Header as='h3'>Domicilios del día {date.getDate()+1}/{date.getMonth()+1}/{date.getFullYear()}</Header>
                <Table color="blue" key="blue">
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>Dirección</Table.HeaderCell>
                        <Table.HeaderCell>Descripción</Table.HeaderCell>
                        <Table.HeaderCell>Paciente</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    { fetching ? 
                            <ClipLoader
                            size={60}
                            color={'black'}
                            />
                                :
                            <Table.Body>
                                {this.renderDomicilios(listDomicilios)}
                            </Table.Body>
                    }
                </Table>
                {this.messageNoDomicilios(listDomicilios)}
            </div>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    fetching: state.domicilios.fetching,
    domicilios: state.domicilios.tomorrowDomicilios
})

export default connect(mapStateToProps, { getTomorrowDomicilios })(Domicilios)



