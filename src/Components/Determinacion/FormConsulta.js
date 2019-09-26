import React, { Component } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Header, Form, Icon, Container } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import { validateOnlyNumbersRequired, validateRequiredStringNum } from './../../Services/MetodosDeValidacion';
import {convertStyleString } from '../../Services/MetodosDeterminacion';
import MenuOpciones from '../MenuOpciones';
import './../styles.css';

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

        });
        this.cambioCodigoPractica = this.cambioCodigoPractica.bind(this);
        this.cambioDescripcionPractica = this.cambioDescripcionPractica.bind(this);
        this.cambioUnidadBioquimica = this.cambioUnidadBioquimica.bind(this);
        this.cambioUnidadMedida = this.cambioUnidadMedida.bind(this);
        this.cambioBitAlta = this.cambioBitAlta.bind(this);
    }

    componentDidMount() {
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
                
                <Form className='altasYConsultas'>
                    <Form.Field required label='Código Práctica' control='input' placeholder='Código Práctica'
                    value={this.state.codigoPractica} 
                    disabled={this.state.modificacion}
                    onChange={this.cambioCodigoPractica}
                    className={this.state.errorCodigoPractica ? null : 'error'}
                    />

                    <Form.Field label='Descripción Práctica' control='input' placeholder='Descripción Práctica'
                    value={this.state.descripcionPractica} 
                    disabled={this.state.modificacion}
                    onChange={this.cambioDescripcionPractica}
                    className={this.state.errorDescripcionPractica ? null : 'error'}
                    />

                    <Form.Field required label='Unidad Bioquímica' control='input' placeholder='Unidad Bioquímica'
                    value={this.state.unidadBioquimica}
                    disabled={this.state.modificacion} 
                    onChange={this.cambioUnidadBioquimica}
                    className={this.state.errorUnidadBioquimica ? null : 'error'}
                    />

                    <Form.Field label='Unidad Medida' control='input' placeholder='Unidad Medida'
                    value={this.state.unidadMedida} 
                    disabled={this.state.modificacion}
                    onChange={this.cambioUnidadMedida}
                    />

                    {( !this.state.isbottonPressed && this.state.modificacion && this.state.estado) ? <Button  onClick={(e) => {
                        this.habilitarModificacion(e)} }>Modificar</Button>  : null}

                    {(!this.state.estado) ? <Button onClick={(e) => { 
                        if (window.confirm('¿Esta seguro que quiere dar de alta la determinación ' + this.state.descripcionPractica + '?')) {  
                        this.alta(e)
                        } else {e.preventDefault()}} }>Dar de Alta</Button> : null}
            
                    {(!this.state.modificacion) ? <Button disabled={this.state.isbottonPressed}  onClick={(e) => {
                        if (window.confirm('¿Esta seguro que quiere modificar la determinación ' + this.state.descripcionPractica + '?')) {
                            this.modificarDeterminacion(e)
                        } else {e.preventDefault()} } } primary>Aceptar</Button> : null}

                    {(!this.state.modificacion) ? <Button disabled={this.state.cancelar} onClick={(e) => {
                        this.cancelar(e)} } color='red'> Cancelar </Button> : null }

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
        });
        if (this.state.cambios){
            const api = "/determinaciones/id/" + this.state.codigoPractica;
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
        
        const {codigoPractica, unidadBioquimica, descripcionPractica} = this.state;

        const errorCodigoPractica= validateOnlyNumbersRequired(codigoPractica);
        const errorUnidadBioquimica = validateOnlyNumbersRequired(unidadBioquimica);
        const errorDescripcionPractica = validateRequiredStringNum(descripcionPractica);


        if ( errorCodigoPractica && errorDescripcionPractica && errorUnidadBioquimica) {
            var data = {
                "codigoPractica": this.state.codigoPractica,
                "descripcionPractica": convertStyleString(this.state.descripcionPractica),
                "unidadBioquimica": this.state.unidadBioquimica,
                "unidadMedida": this.state.unidadMedida
            };

            const api = '/determinaciones/modificar/' + this.props.match.params.codigoPractica;

            axios.put(api,data)
                .then((response) => {
                    alert('Se ha modificado la determinación con éxito.');
                }, (error)=> {
                    alert('No se ha podido modificar la determinación.');
                    const api = "/determinaciones/id/" + this.props.match.params.codigoPractica ;
                    this.handleUpdateClick(api);
                });

            this.setState({
                modificacion: true,
                cancelar: true,
                cambios: false,
                errorCodigoPractica, 
                errorUnidadBioquimica,
                errorDescripcionPractica,
            })

        } else {
            alert("Revise los datos ingresados.")
            this.setState ({
                errorCodigoPractica, 
                errorUnidadBioquimica,
                errorDescripcionPractica,
            });
        }
    };

    handleUpdateClick = (api) => {
        axios.get(api).then(determinacion => {
          this.setState({
            codigoPractica: determinacion.data.codigoPractica,
            descripcionPractica: determinacion.data.descripcionPractica,
            unidadBioquimica: determinacion.data.unidadBioquimica,
            unidadMedida: determinacion.data.unidadMedida,
            
            bitAlta: determinacion.data.bitAlta,
            isbottonPressed:false,
            estado: determinacion.data.bitAlta,
          });
        }, (error) => {
            console.log('Error fetch: ', error.message);
        })
    
    }

    cambioCodigoPractica(e) {
        this.setState({
            codigoPractica: e.target.value
        })
    }

    cambioDescripcionPractica(e) {
        this.setState({
            descripcionPractica: e.target.value,
            cambios: true,
        })
    }

    cambioUnidadBioquimica(e) {
        this.setState({
            unidadBioquimica: e.target.value,
            cambios: true
        })
    }

    cambioUnidadMedida(e) {
        this.setState({
            unidadMedida: e.target.value,
            cambios: true,
        })
    }

    cambioBitAlta(e){
        this.setState({
            bitAlta: e.target.value,
        })
    }

    alta(e){
        axios.put(`/determinaciones/switch-alta/${this.props.id}`).then(response => {
            alert("Se ha dado de alta la determinación con éxito.");
              this.setState({estado: true})
             
              const api = "/determinaciones/id/" + this.props.id ;
              this.handleUpdateClick(api); 
        }, (error) => {
            if(this.state.bitAlta) {
                alert(`No se ha podido dar de alta la determinación. Intentelo nuevamente.`)
              }
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