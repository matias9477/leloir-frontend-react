import React, { Component } from 'react';
import axios from 'axios'
import {Button, Container, Form, Header, Icon} from 'semantic-ui-react'
import {getIdTipoMuestra} from './../../Services/MetodosMuestra'
import MenuOpciones from '../MenuOpciones';
import { validateOnlyNumbersRequired, validateRequiredCombos} from './../../Services/MetodosDeValidacion';
import './../styles.css';
import {urlTiposMuestras} from "../../Constants/URLs";
import {Link} from "react-router-dom";

class FormAlta extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            analisisId:'',
            tipo: '',
            bitActivo: '',

            tipos:[],

            errorAnalisisId: true,
            errorTipo: true,
            errorBitActivo: true,

        });
        this.fetchMuestra = this.fetchMuestra.bind(this);
        this.cambioAnalisisId= this.cambioAnalisisId.bind(this);
        this.cambioTipo = this.cambioTipo.bind(this);

    }

    renderForm() {
        return (
            <div className='Formularios'>
                <Container className='btnHeader'>
                    <Button className='boton' as={Link} to='/muestras' exact='true' floated='left' icon
                            labelPosition='left' primary size='small'>
                        <Icon name='arrow alternate circle left'/> Volver
                    </Button>

                    <Header as='h3' dividing>Generar nueva Muestra</Header>
                </Container>

                <Form onSubmit={this.fetchMuestra} className='altasYConsultas'>

                    <Form.Group widths='equal'>
                        <Form.Field required label='Id análisis' control='input' placeholder='Id análisis' width={5}
                                    value={this.state.analisisId}
                                    onChange={this.cambioAnalisisId}
                                    className={this.state.errorAnalisisId ? null : 'error'}
                        />

                        <Form.Field required label='Tipo Muestra' control='select'
                                    placeholder = 'Tipo muestra'
                                    value={this.state.tipo}
                                    onChange={this.cambioTipo}
                                    className= {this.state.errorTipo === true ? null : 'error'}
                        >
                            <option value={null}>  </option>
                            {this.state.tipos.map(item => (
                                <option key={item.tipoMuestraId}>{item.nombre}</option>))}
                        </Form.Field>
                    </Form.Group>


                    <Button primary type="submit" onClick={this.fetchMuestra} className="boton">Generar codigo Muestra</Button>

                </Form>
            </div>

        );
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

    componentDidMount() {
        this.comboTipos();

    }

    handleUpdateClick = (api) => {
        var data = {
            "analisisId": this.state.analisisId,
            "bitActivo": true,
            "estado": {
                "descripcion": "string",
                "estadoId": 1,
                "nombre": "EN PROCESO"
            },
            "tipoMuestra": {
                "idMuestra": getIdTipoMuestra(this.state.tipo,this.state.tipos),
                "nombre": this.state.tipo
            }
        };

        axios.post(api, data).then((response) => {
            alert('Se generó código muestra');
        }, (error) => {
            alert('No se ha podido generar código muestra');
        })

    };

    fetchMuestra(e){
        e.preventDefault();

        const {analisisId, tipo} = this.state;

        const errorAnalisisId = validateOnlyNumbersRequired(analisisId);
        const errorTipo = validateRequiredCombos(tipo);

        if (errorAnalisisId && errorTipo) {
            const api = '/muestras/add';
            this.handleUpdateClick(api);
        } else {
            alert("Revise los datos ingresados.");
            this.setState({
                errorAnalisisId,
                errorTipo
            })
        }
    }

    cambioTipo(e) {
        this.setState( {
            tipo: e.target.value
        })
    }


    cambioAnalisisId(e){
        this.setState( {
            analisisId: e.target.value
        })
    }


    render() {
        return (
            <div className='union'>
                <MenuOpciones/>
                <div className="FormAlta">
                    {this.renderForm()}
                </div>
            </div>
        );
    }

}


export default FormAlta;