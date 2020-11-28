import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import { Button, Card, List, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import ModificarResultados from './Modals/ModificarResultados';
import RevisarResultados from './Modals/RevisarResultados';
import { emitirAnalisisAction, getAnalisisPendientesAction } from '../../Redux/analisisDuck';
import './styles.css';

class DiarioPracticas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            currentAnalisisID: null,
            currentModal: null,
        }
    }

    componentDidMount() {
        this.props.getAnalisisPendientesAction()
    }

    emitirAnalisis = (idAnalisis) => {
        this.props.emitirAnalisisAction(idAnalisis)
    }

    showModal = (idAnalisis, modal) => {
        this.setState({
            show: true,
            currentAnalisisID: idAnalisis,
            currentModal: modal

        })
    }

    hideModalCallback = () => {
        this.setState({
            currentAnalisisID: null,
            show: false,
            currentModal: null,
        })
    }

    renderButtons = (estado, idAnalisis) => {
        switch (estado) {
            case 'EN_PROCESO':
                return (
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green'
                                    onClick={() => this.showModal(idAnalisis, 'REVISAR')}>
                                Revisar Analisis
                            </Button>
                            <Button basic color='blue'
                                    onClick={() => this.showModal(idAnalisis, 'MODIFICAR')}>
                                Modificar Resultados
                            </Button>
                        </div>
                    </Card.Content>
                )
            case 'PREPARADO':
                return (
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button color='green'
                                    onClick={() => this.emitirAnalisis(idAnalisis)}>
                                Emitir Analisis
                            </Button>
                            <Button basic color='blue'
                                    onClick={() => this.showModal(idAnalisis, 'MODIFICAR')}>
                                Modificar Resultados
                            </Button>
                        </div>
                    </Card.Content>

                )
            case 'NUEVO':
                return (
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='blue'
                                    onClick={() => this.showModal(idAnalisis, 'MODIFICAR')}>
                                Cargar Resultados
                            </Button>
                        </div>
                    </Card.Content>
                )
            default:
                return (
                    <Label as='a' attached='bottom'>
                        {estado}
                    </Label>
                )
        }
    }

    renderCards = () => (
        <Card.Group stackable itemsPerRow={2}>
            {this.props.analisisPendientes.map((analisis, index) => (
                <Card fluid raised centered key={index}>
                    <Card.Content>
                        <Card.Header>{analisis.paciente}</Card.Header>
                        <Card.Meta>{analisis.createdAt}</Card.Meta>
                        <Card.Description textAlign='left'>
                            Determinacion
                            <List>
                                {analisis.determinaciones.map((det, index) =>
                                    <List.Item key={index}>
                                        <List.Icon name='lab'/>
                                        <List.Content><strong>{det.nombreDeterminacion}</strong></List.Content>
                                    </List.Item>)}
                            </List>
                        </Card.Description>
                    </Card.Content>

                    {this.renderButtons(analisis.estadoAnalisis, analisis.idAnalisis)}

                </Card>
            ))}
        </Card.Group>
    )

    handleModalContent() {
        switch (this.state.currentModal) {
            case 'MODIFICAR':
                return (
                    <ModificarResultados show={this.state.show}
                                         callback={this.hideModalCallback}
                                         idAnalisis={this.state.currentAnalisisID}/>
                )
            case 'REVISAR':
                return (
                    <RevisarResultados show={this.state.show}
                                       callback={this.hideModalCallback}
                                       idAnalisis={this.state.currentAnalisisID}/>
                )
            default:
                return null
        }
    }

    render() {
        const { fetching } = this.props
        return (
            <div>
                <NavBar/>
                {fetching ? <div className='spinner'>
                        <ClipLoader
                            size={60}
                            color={'black'}
                        />
                    </div> :
                    <div className='avoidMenu'>
                        {this.renderCards()}
                        {this.handleModalContent()}
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({  
    analisisPendientes: state.analisis.analisisPendientes,
    fetching: state.analisis.fetchingAnalisisPendientes,
})

export default connect(mapStateToProps, { emitirAnalisisAction, getAnalisisPendientesAction })(DiarioPracticas)