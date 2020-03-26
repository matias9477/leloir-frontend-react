import React, { Component } from 'react';
import axios from 'axios';
import { Button, Header, Form, Icon, Grid, Table, Segment, Card, List, Label } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import Select from 'react-select';

import MenuOpciones from '../MenuOpciones';
import { getHumanDate } from '../../Services/MetodosPaciente';
import { checkAtributo, validateRequiredCombos } from '../../Services/MetodosDeValidacion';
import { urlGetAnalisis, urlTiposMuestras, urlMuestras, urlMuestrasAdd, urlEmitirAnalisis } from "../../Constants/URLs";
import ModificarResultados from '../DiarioPracticas/Modals/ModificarResultados';
import RevisarResultados from '../DiarioPracticas/Modals/ModificarResultados';
import './../styles.css';

class ConsultaAnalisis extends Component {
    constructor(props) {
        super(props);
        this.state = ({  
            idAnalisis: this.props.match.params.id,      
            analisis: '',
            tipos: [],
            muestras: [],

            showMuestra: false,

            tipo: '',

            errorTipo: true,

            show: false,
            currentModal: null,
          })
    }

    componentDidMount() {
        this.getAnalisis();
        this.comboTipos();
        this.getMuestras();
    }

    comboTipos = () =>{
        axios.get(urlTiposMuestras).then(resolve => {
            this.setState({
                tipos: Object.values(resolve.data).flat(),
            });
        }, (error) => {
            console.log('Error combo tipos muestras', error.message);
        })
    }

    getAnalisis = () => {
        axios.get(urlGetAnalisis + this.state.idAnalisis).then(resolve => {
          this.setState({
            analisis: resolve.data,
          });
        }, (error) => {
            console.log('Error fetch analisis: ', error.message);
        })
    
    }

    getMuestras = () => {
        axios.get(urlMuestras).then(resolve => {
          this.setState({
            muestras: Object.values(resolve.data).flat(),
          });
        }, (error) => {
            console.log('Error fetch muestras: ', error.message);
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

    dataMuestra = (api) => {
        var data = {
            "analisisId": this.state.idAnalisis,
            "bitActivo": true,
            "estadoId":  1,
            "tipoMuestraId": this.state.tipo.tipoMuestraId,
        };

        axios.post(api, data).then((response) => {
            alert('Se generó la muestra con éxito.');
            this.setState({tipo: ''});
            this.getMuestras()
        }, (error) => {
            alert('No se ha podido generar la muestra.');
        })
        

    };

    postMuestra = () =>{
        const errorTipo = validateRequiredCombos(this.state.tipo);

        if (errorTipo) {
            this.dataMuestra(urlMuestrasAdd);            
        } else {
            alert("Revise los datos ingresados.");
            this.setState({
                errorTipo
            })
        }
    }

    showMuestras = () => {
       
        const muestras = [];

        for(var i = 0; i<this.state.muestras.length; i++){
            if(this.state.muestras[i].analisisId.toString() === this.state.idAnalisis){
                muestras.push(this.state.muestras[i])
            }
        }

        return muestras;

    }

    getOptionLabelTipoMuestra = option => option.nombre;

    getOptionValueTipoMuestra = option => option.tipoMuestraId;

    handleChangeTipo = tipo => {
        this.setState({ tipo })
    }

    createMuestra = () => {
        return(
            <div>
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


    render() {
        var m = this.showMuestras();
        var prevURL = this.props.location.state.prevPath || '/analisis'
        return (
          <div className='union'>
            <MenuOpciones/>

            {this.state.analisis ?
            
            <Form  className="analisisConsulta">
                <Button className='boton' as= {Link} to={prevURL} exact='true' floated='left' icon labelPosition='left' primary size='small'>
                    <Icon name='arrow alternate circle left' /> Volver
                </Button>
                
                <br/><br/><br/><br/>

                <Segment>
                <Grid width='equal' divided>
                    <Grid.Column width={5}>
                    <Header>Datos del análisis</Header>
                        <Form.Field label='Id Análisis' value={this.state.analisis.analisisId} control='input' />

                        <Form.Field label='Fecha Creación' value={this.state.analisis ? getHumanDate(this.state.analisis.createdAt) : ''} control='input' />

                        <Form.Field label='Estado' value={this.state.analisis ? this.state.analisis.estadoAnalisis.nombre : ''} control='input' />

                        <Form.Input label='Nombre' iconPosition='left' value={this.state.analisis !== undefined ? this.state.analisis.paciente.nombre + ' ' + checkAtributo(this.state.analisis.paciente.apellido) : ''}>
                            <Icon name={this.getIconTipo(this.state.analisis ? this.state.analisis.paciente.type : '')}/>
                            <input/>
                        </Form.Input>

                        {this.state.analisis.paciente.type === 'com.leloir.backend.domain.Persona' ? 
                        <Form.Group widths='equal'>
                            <Form.Field label='Tipo de Documento' value={this.state.analisis ? this.state.analisis.paciente.tipoDocumento.nombre : ''} control='input' />  
                            <Form.Field label='Número' value={this.state.analisis ? this.state.analisis.paciente.nroDocumento : ''} control='input' />  
                        </Form.Group>
                        : null}

                        {this.state.analisis.paciente.type === 'com.leloir.backend.domain.Animal' ? 
                        <div>
                            <Form.Field label='Tipo de Animal' value={this.state.analisis ? this.state.analisis.paciente.tipoAnimal.nombre : ''} control='input' />  
                            <Form.Field label='Propietario' value={this.state.analisis ? this.state.analisis.paciente.propietario : ''} control='input' />  
                        </div>
                        : null}

                    </Grid.Column>

                    <Grid.Column width={5} divided>
                        <Header>Determinaciones</Header>
                        {this.renderCard()}
                        {this.handleModalContent()}
                          
                    </Grid.Column>

                    <Grid.Column width={6} divided>
                    <Header>Muestras</Header>

                        {m.length === 0 ? <div>No existen muestras para este análisis
                            <br/><br/>
                            <Button icon labelPosition='left' primary size='small' onClick={() => this.setState({showModal: true}) }
                            >
                                <Icon name='plus' /> Añadir muestra
                            </Button>
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
                            {m.map(muestra => (
                            <Table.Row>
                                <Table.Cell>{muestra.idMuestra}</Table.Cell>
                                <Table.Cell>{muestra.tipoMuestra}</Table.Cell>
                                <Table.Cell>{muestra.estado}</Table.Cell>
                            </Table.Row>
                            ))}
                            </Table.Body>

                            <Table.Footer fullWidth>
                                <Table.Row>
                                    <Table.HeaderCell />
                                    <Table.HeaderCell colSpan='4'>
                                    <Button floated='right' icon labelPosition='left' primary size='small' onClick={() => this.setState({showModal: true}) }
                                    >
                                        <Icon name='plus' /> Añadir muestra
                                    </Button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                        }                

                        <br/><br/>
                        {this.state.showModal ? this.createMuestra() : null}
                        <br/><br/>
                    </Grid.Column>
                
                </Grid>
                
                </Segment>
                
                <br/>
                
            </Form>
            : null }
            }
     
          </div>
        );
    }

    emitirAnalisis = () => {
        axios.get(urlEmitirAnalisis + this.state.idAnalisis, {responseType: 'blob',}).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            const index1 = response.headers['content-disposition'].indexOf("name=\"") + 6;
            const index2 = response.headers['content-disposition'].indexOf("\"", 18);
            link.href = url;
            link.setAttribute('download', response.headers['content-disposition'].substring(index1, index2)); //or any other extension
            document.body.appendChild(link);
            link.click();
            this.getAllPendientes()
        }, (error) => {
            console.log('Error', error.message);
        })
    };

    showModal = (modal) => {
        this.setState({
            show: true,
            // currentAnalisisID: idAnalisis,
            currentModal: modal

        });
    };

    hideModalCallback = () => {
        this.setState({
            // currentAnalisisID: null,
            show: false,
            currentModal: null,
        });
    };

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
                );
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

                );
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
                );
            default:
                return (
                    <Label as='a' attached='bottom'>
                        {estado}
                    </Label>
                )
        }
    };

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
    );

    handleModalContent() {
        switch (this.state.currentModal) {
            case "MODIFICAR":
                return (
                    <ModificarResultados show={this.state.show}
                                         callback={this.hideModalCallback}
                                         idAnalisis={this.state.idAnalisis}/>
                );
            case "REVISAR":
                return (
                    <RevisarResultados show={this.state.show}
                                       callback={this.hideModalCallback}
                                       idAnalisis={this.state.idAnalisis}/>
                );
            default:
                return null
        }
    };


 
}


export default ConsultaAnalisis;