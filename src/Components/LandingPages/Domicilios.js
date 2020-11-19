import React, { Component } from 'react';
import { Table, Header } from 'semantic-ui-react'
import { getTomorrowDomicilios } from '../../Redux/domiciliosDuck'
import ClipLoader from 'react-spinners/ClipLoader'
import { connect } from 'react-redux';
import './domicilios.css';


class Domicilios extends Component {

    componentDidMount() {
        this.props.getTomorrowDomicilios()
    }

    createDomicilio = (domicilio) =>{
        if(domicilio === undefined)
        {
            return null
        } else return <Table.Row>
                    <Table.Cell>{domicilio.direccion}</Table.Cell>
                    <Table.Cell>{domicilio.descripcion ? domicilio.descripcion : 'No disponible'}</Table.Cell>
                    <Table.Cell>{domicilio.paciente ? domicilio.paciente : 'No registrado'}</Table.Cell>
                </Table.Row>
    }



    render() {
        const { fetching, domicilios } = this.props
        var listDomicilios
        if(!fetching){
         listDomicilios = domicilios.map(this.createDomicilio)
        }
        return (
            <div style={{display: 'flex', flexDirection:'row', width:'100%'}}>

            <div className='Domicilios'>
                <Header as='h3'>Domicilios del día</Header>
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
                                {listDomicilios}
                            </Table.Body>
                    }
                </Table>
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



