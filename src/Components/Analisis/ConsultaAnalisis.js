import React, { Component } from 'react'
import axios from 'axios'
import { Button, Header, Form, Icon, Grid, Table, Segment, Card, List, Label } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import Select from 'react-select'
import { connect } from 'react-redux'

import MenuOpciones from '../MenuOpciones'
import { getHumanDate } from '../../Services/MetodosPaciente'
import { checkAtributo, validateRequiredCombos } from '../../Services/MetodosDeValidacion'
import { urlEmitirAnalisis } from "../../Constants/URLs"
import ModificarResultados from '../DiarioPracticas/Modals/ModificarResultados'
import RevisarResultados from '../DiarioPracticas/Modals/ModificarResultados'
import { getAnalisisByIdAction } from '../../Redux/analisisDuck'
import { getTiposMuestrasAction, addMuestraAction } from '../../Redux/muestrasDuck'
import './../styles.css'
import './analisisStyle.css'

class ConsultaAnalisis extends Component {
    constructor(props) {
        super(props)
        this.state = ({  
            idAnalisis: this.props.match.params.id,      
            analisis: '',
            tipos: [],

            showMuestra: false,

            tipo: '',

            errorTipo: true,

            show: false,
            currentModal: null,
          })
    }

    componentDidMount() {
        this.props.getTiposMuestrasAction()
        this.props.getAnalisisByIdAction(this.state.idAnalisis)
    }

    componentWillReceiveProps(nextProp){
        this.setState({
            tipos: nextProp.tiposMuestras,
            analisis: nextProp.analisis,
        })
    }

    getIconTipo(tipo){
        if (tipo === 'com.leloir.backend.domain.Animal'){
            return 'paw'
        } else if(tipo === 'com.leloir.backend.domain.Persona'){
            return 'user'
        } else if(tipo === 'com.leloir.backend.domain.Institucion'){
            return 'building'
        }
    }

    postMuestra = () =>{
        const errorTipo = validateRequiredCombos(this.state.tipo)

        if (errorTipo) {
            var data = {
                "analisisId": this.state.idAnalisis,
                "bitActivo": true,
                "estadoId":  1,
                "tipoMuestraId": this.state.tipo.tipoMuestraId,
            }
    
            this.props.addMuestraAction(data)
            
            
        } else {
            alert("Revise los datos ingresados.")
            this.setState({
                errorTipo
            })
        }
    }
    getOptionLabelTipoMuestra = option => option.nombre

    getOptionValueTipoMuestra = option => option.tipoMuestraId

    handleChangeTipo = tipo => {
        this.setState({ tipo })
    }

    createMuestra = () => {
        return(
            <div className='createMuestra'>
                <Grid width='equal'>
                    <Grid.Column width={10}>
                        <Select
                            name='tipo muestra'
                            value={this.state.tipo}
                            onChange={this.handleChangeTipo}
                            placeholder= "Seleccione tipo muestra..."
                            isClearable={true}
                            options={this.state.tipos}
                            getOptionValue={this.getOptionValueTipoMuestra}
                            getOptionLabel={this.getOptionLabelTipoMuestra}
                        />

                    </Grid.Column>

                    <Grid.Column width={6}>
                        <Button primary size='small' floated='center' onClick={this.postMuestra} >
                            Registrar muestra
                        </Button>  
                    </Grid.Column>
                </Grid>
                
            </div>
        )
    }

    patientRender(){
        return(
            <div>
                <Header>Paciente</Header>
                    <Form.Field label='Id Análisis' value={this.state.analisis.analisisId} control='input' />
                    <Form.Field label='Fecha Creación' value={this.state.analisis ? getHumanDate(this.state.analisis.createdAt) : ''} control='input' />
                    <Form.Field label='Estado' value={this.state.analisis ? this.state.analisis.estadoAnalisis.nombre : ''} control='input' />
                    <Form.Input label='Nombre' iconPosition='left' value={this.state.analisis !== undefined ? this.state.analisis.paciente.nombre + ' ' + checkAtributo(this.state.analisis.paciente.apellido) : ''}>
                        <Icon name={this.getIconTipo(this.state.analisis ? this.state.analisis.paciente.type : '')}/>
                        <input/>
                    </Form.Input>

                    {this.state.analisis.paciente.type === 'com.leloir.backend.domain.Persona' ? 
                        <div>
                            <b>Documento</b>
                            <Form.Group widths='equal'>
                                <Form.Field label='Tipo' value={this.state.analisis ? this.state.analisis.paciente.tipoDocumento.nombre : ''} control='input' />  
                                <Form.Field label='Número' value={this.state.analisis ? this.state.analisis.paciente.nroDocumento : ''} control='input' />  
                            </Form.Group>
                            
                            {(this.state.analisis && this.state.analisis.paciente.obraSocial!==undefined) ?
                                <div>
                                    <b>Obra Social</b>
                                    <Form.Group widths='equal'>
                                        <Form.Field label='Razón Social' value={this.state.analisis.paciente.obraSocial.razonSocial} control='input' />
                                        
                                    {this.state.analisis.paciente.plan!==undefined ?
                                        <Form.Field label='Plan' value={this.state.analisis.paciente.plan.nombre} control='input' />  
                                        : <Form.Field label='Plan' value='Sin plan' control='input' />   }
                                    </Form.Group>
                                </div>
                            : <Form.Field label='Obra Social' value='No posee' control='input' /> }
                        </div>
                    : null}

                    {this.state.analisis.paciente.type === 'com.leloir.backend.domain.Animal' ? 
                    <div>
                        <Form.Field label='Tipo de Animal' value={this.state.analisis ? this.state.analisis.paciente.tipoAnimal.nombre : ''} control='input' />  
                        <Form.Field label='Propietario' value={this.state.analisis ? this.state.analisis.paciente.propietario : ''} control='input' />  
                    </div>
                    : null}
            </div>
        )
    }

    muestrasRender(){
        return(
            <div>
                <Header>Muestras</Header>

                {(this.state.analisis.muestras.length === 0 || this.state.analisis.muestras.length === undefined) ? <div>No existen muestras para este análisis
                   
                    {(!this.state.showMuestra && this.state.analisis.estadoAnalisis.nombre !== "ENTREGADO") ?
                        <Button icon labelPosition='left' primary size='small' onClick={() => this.setState({showMuestra: true})} className='muestras'>
                            <Icon name='plus' /> Añadir muestra
                        </Button>
                    : null }
                </div>: 

                <Table compact>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Tipo</Table.HeaderCell>
                        <Table.HeaderCell>Estado</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    
                    <Table.Body>
                    {this.state.analisis.muestras.map(muestra => (
                    <Table.Row>
                        <Table.Cell>{muestra.idMuestra}</Table.Cell>
                        <Table.Cell>{muestra.tipoMuestra.nombre}</Table.Cell>
                        <Table.Cell>{muestra.estadoMuestra.nombre}</Table.Cell>
                    </Table.Row>
                    ))}
                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell colSpan='4'>
                            {(!this.state.showMuestra && this.state.analisis.estadoAnalisis.nombre !== "ENTREGADO") ?
                                <Button floated='right' icon labelPosition='left' primary size='small' onClick={() => this.setState({showMuestra: true}) }
                                >
                                    <Icon name='plus' /> Añadir muestra
                                </Button> 
                            : null }
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                }                

                {this.state.showMuestra ? this.createMuestra() : null}
            </div>
        )
    }


    render() {
        var prevURL = this.props.location.state.prevPath || '/analisis'
        return (
            <div className='union'>
                <MenuOpciones/>

                {this.state.analisis ?
                    <Form  className='formConsultaAnalisis'>
                        <Button className='boton' as= {Link} to={prevURL} exact='true' floated='left' icon labelPosition='left' primary size='small'>
                            <Icon name='arrow alternate circle left' /> Volver
                        </Button>

                        <Segment>
                            <Grid width='equal' divided>
                                <Grid.Column width={5}>
                                    {this.patientRender()}

                                </Grid.Column>

                                <Grid.Column width={5} divided>
                                    <Header>Determinaciones</Header>
                                    {this.renderCard()}
                                    {this.handleModalContent()}
                                    
                                </Grid.Column>

                                <Grid.Column width={6} divided>
                                    {this.muestrasRender()}
                        
                                </Grid.Column>
                            
                            </Grid>
                        </Segment>
                        
                    </Form>
                : null }
            }
     
          </div>
    )
}

    emitirAnalisis = () => {
        axios.get(urlEmitirAnalisis + this.state.idAnalisis, {responseType: 'blob',}).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            const index1 = response.headers['content-disposition'].indexOf("name=\"") + 6
            const index2 = response.headers['content-disposition'].indexOf("\"", 18)
            link.href = url
            link.setAttribute('download', response.headers['content-disposition'].substring(index1, index2)) //or any other extension
            document.body.appendChild(link)
            link.click()
            this.getAllPendientes()
        }, (error) => {
            console.log('Error', error.message)
        })
    }

    showModal = (modal) => {
        this.setState({
            show: true,
            // currentAnalisisID: idAnalisis,
            currentModal: modal

        })
    }

    hideModalCallback = () => {
        this.setState({
            // currentAnalisisID: null,
            show: false,
            currentModal: null,
        });
    }

    renderButtons = (estado) => {
        switch (estado) {
            case "EN_PROCESO":
                return (
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green'
                                    onClick={() => this.showModal(this.state.idAnalisis, "REVISAR")}>
                                Revisar Analisis
                            </Button>
                            <Button basic color='blue'
                                    onClick={() => this.showModal(this.state.idAnalisis, "MODIFICAR")}>
                                Modificar Resultados
                            </Button>
                        </div>
                    </Card.Content>
                )
            case "PREPARADO":
                return (
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button color='green'
                                    onClick={() => this.emitirAnalisis(this.state.idAnalisis)}>
                                Emitir Analisis
                            </Button>
                            <Button basic color='blue'
                                    onClick={() => this.showModal(this.state.idAnalisis, "MODIFICAR")}>
                                Modificar Resultados
                            </Button>
                        </div>
                    </Card.Content>

                )
            case "NUEVO":
                return (
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='blue'
                                    onClick={() => this.showModal(this.state.idAnalisis, "MODIFICAR")}>
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

    renderCard = () => (
        <Card fluid raised centered>
            <Card.Content>
                <Card.Description textAlign='left'>
                    Determinaciones:

                    <List>
                    {this.state.analisis.determinaciones.map(nombre =>
                        <List.Item>
                            <List.Icon name='lab'/>
                            <List.Content><strong>{nombre.determinacion.descripcionPractica}</strong></List.Content>
                        </List.Item>
                    )}
                    </List>

                </Card.Description>
            </Card.Content>

            {this.renderButtons(this.state.analisis.estadoAnalisis.nombre, this.state.idAnalisis)}

        </Card>
    )

    handleModalContent() {
        switch (this.state.currentModal) {
            case "MODIFICAR":
                return (
                    <ModificarResultados show={this.state.show}
                                         callback={this.hideModalCallback}
                                         idAnalisis={this.state.idAnalisis}/>
                )
            case "REVISAR":
                return (
                    <RevisarResultados show={this.state.show}
                                       callback={this.hideModalCallback}
                                       idAnalisis={this.state.idAnalisis}/>
                )
            default:
                return null
        }
    }

}


const mapStateToProps = state => ({
    fetching: state.analisis.fetching,
    tiposMuestras: state.muestras.tiposMuestras,
    analisis: state.analisis.analisisById,
})

export default connect(mapStateToProps, { getTiposMuestrasAction, getAnalisisByIdAction, addMuestraAction })(ConsultaAnalisis)