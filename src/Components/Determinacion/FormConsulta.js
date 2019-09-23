import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Header, Form, Icon, Container } from 'semantic-ui-react'
import './../styles.css';
import {
    validateCodigoPractica,
    validateDescripcionPractica,
    validateUnidadBioquimica,
} from './../../Services/MetodosDeterminacion';
import MenuOpciones from '../MenuOpciones';
import {Link} from 'react-router-dom';
import axios from 'axios';

class FormConsulta extends Component {
    constructor(props) {
        super(props);
        this.state = ({

            isbottonPressed:true,
            modificacion: true,
            cancelar: true,
            valor:true,

            cambios: false,

            codigoPractica: '',
            descripcionPractica: '',
            unidadBioquimica: '',
            unidadMedida: '',
            bitAlta: '',
            estado:'',


            errorCodigoPractica: true,
            errorDescripcionPractica: true,
            errorUnidadBioquimica: true,
            errorUnidadMedida: true,

        });
        this.cambioCodigoPractica = this.cambioCodigoPractica.bind(this);
        this.cambioDescripcionPractica = this.cambioDescripcionPractica.bind(this);
        this.cambioUnidadBioquimica = this.cambioUnidadBioquimica.bind(this);
        this.cambioUnidadMedida = this.cambioUnidadMedida.bind(this);
        this.cambioBitAlta = this.cambioBitAlta.bind(this);
    }

    componentWillMount() {
        const api = "/determinaciones/id/" + this.props.match.params.codigoPractica;
        this.handleUpdateClick(api);
    }

    renderForm() {
        return (
            <div className='Formularios'>
                <Container className='btnHeader'>
                    <Button className='boton' as= {Link} to='/determinaciones' floated='left' icon labelPosition='left' primary size='small'>
                        <Icon name='arrow alternate circle left' /> Volver
                    </Button>
                    <br></br>
                    <Header as='h3' dividing>Búsqueda y modificación</Header>
                </Container>
                <Form>
                    <Form.Field required label='Código Práctica' control='input' placeholder='Código Práctica'
                                value={this.state.codigoPractica} onChange={this.cambioCodigoPractica}
                                className={this.state.errorCodigoPractica ? null : 'error'}/>

                    <Form.Field label='Descripción Práctica' control='input' placeholder='Descripción Práctica'
                                value={this.state.descripcionPractica} onChange={this.cambioDescripcionPractica}
                                className={this.state.errorDescripcionPractica ? null : 'error'}/>

                    <Form.Field required label='Unidad Bioquímica' control='input' placeholder='Unidad Bioquímica'
                                value={this.state.unidadBioquimica} onChange={this.cambioUnidadBioquimica}/>

                    <Form.Field label='Unidad Medida' control='input' placeholder='Unidad Medida'
                                value={this.state.unidadMedida} onChange={this.cambioUnidadMedida}/>

                    {( this.state.modificacion && !this.state.estado) ? <Button  onClick={(e) => {
                        this.habilitarModificacion(e)} }>Modificar</Button>  : null}

                    {(!this.state.modificacion) ? <Button disabled={this.state.isbottonPressed}  onClick={(e) => {
                        if (window.confirm('¿Esta seguro que quiere modificar la determinación ' + this.state.descripcionPractica + '?')) {
                            this.modificarDeterminacion(e)
                        } else {e.preventDefault()} } }>Aceptar</Button> : null}

                    {(!this.state.modificacion) ? <Button disabled={this.state.cancelar} onClick={(e) => {
                        this.cancelar(e)} }> Cancelar </Button> : null }

                </Form>
            </div>
        );
    }

    cancelar(e){
        e.preventDefault();
        this.setState({
            modificacion: true,
            cambios: false,
            errorCodigoPractica: true,
            errorDescripcionPractica: true,
            errorUnidadBioquimica: true,
            errorUnidadMedida: true,
        });
        if (this.state.cambios){
            const api = "/determinaciones/id/" + this.props.match.params.codigoPractica ;
            this.handleUpdateClick(api);
        }
    }

    habilitarModificacion(e){
        e.preventDefault();
        this.setState ({
            modificacion: false,
            cancelar: false,
        })
    }


    modificarDeterminacion = (e) => {
        e.preventDefault();
        var data;
        const { codigoPractica, descripcionPractica, unidadBioquimica} = this.state;
        const errorCodigoPractica= validateCodigoPractica(codigoPractica);
        const errorDescripcionPractica = validateDescripcionPractica(descripcionPractica);
        const errorUnidadBioquimica = validateUnidadBioquimica(unidadBioquimica);


        if ( errorCodigoPractica && errorDescripcionPractica && errorUnidadBioquimica) {
            data = {"codigoPractica": this.state.codigoPractica,
                "descripcionPractica": this.state.descripcionPractica,
                "unidadBioquimica:": this.state.unidadBioquimica,
                "unidadMedida:": this.state.unidadMedida
            };
            const api = '/determinaciones/modificar/' + this.props.match.params.codigoPractica;
            axios.put(api,data)
                .then((response) => {
                    if (response.status === 200) {
                        alert('Se ha modificado la determinación con éxito.');
                        this.setState({estado: true});
                        const api = "/determinaciones/id/" + this.props.match.params.codigoPractica ;
                        this.handleUpdateClick(api);
                        return response.statusText;
                    } else {
                        alert('No se ha podido modificar la determinación.');
                        return Promise.reject({status: response.status, statusText: response.statusText});
                    }
                });
            this.setState({
                modificacion: true,
                cancelar: true,
                cambios: false,
                errorCodigoPractica: true,
                errorDescripcionPractica: true,
                errorUnidadBioquimica: true,
                errorUnidadMedida: true,
            })

            } else {
            alert("Revise los datos ingresados.")
            this.setState ({
               errorCodigoPractica,errorDescripcionPractica,errorUnidadBioquimica,
            });
        }
    };


    handleUpdateClick = (api) => {
        axios.get(api).then(
            (response) => {
                if(response.status === 200){
                    return response.data;
                } else {
                    Error(response.statusText);
                    alert('No se encontró la determinacion. Revise la información e intente nuevamente.');
                }
            }
        ).then(determinacion => {
            this.setState({
                codigoPractica: determinacion.codigoPractica,
                descripcionPractica: determinacion.descripcionPractica,
                unidadBioquimica: determinacion.unidadBioquimica,
                unidadMedida: determinacion.unidadMedida,
                bitAlta: determinacion.bitAlta,
                isbottonPressed:false,
            })});
    };


    cambioCodigoPractica(e) {
        this.setState({
            codigoPractica: e.target.value
        })
    }

    cambioDescripcionPractica(e) {
        this.setState({
            descripcionPractica: e.target.value
        })
    }

    cambioUnidadBioquimica(e) {
        this.setState({
            unidadBioquimica: e.target.value
        })
    }

    cambioUnidadMedida(e) {
        this.setState({
            unidadMedida: e.target.value
        })
    }

    cambioBitAlta(e){
        this.setState({
            bitAlta: e.target.value,
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

export default FormConsulta;