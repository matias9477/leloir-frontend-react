import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Form, Icon, Container, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'
import { connect } from 'react-redux'

import { validateOnlyNumbersRequired, validateRequiredStringNum } from './../../Services/MetodosDeValidacion';
import {convertStyleString } from '../../Services/MetodosDeterminacion';
import { getDeterminacionByIdAction, alterDeterminacionAction, switchAltaAction } from '../../Redux/determinacionesDuck'
import NavBar from '../NavBar/NavBar';
import './determinaciones.css';

class FormConsulta extends Component {
    constructor(props) {
        super(props);
        this.state = ({
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
    }

    componentDidMount() {
        this.props.getDeterminacionByIdAction(this.props.match.params.codigoPractica)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            codigoPractica:nextProps.determinacion.codigoPractica,
            descripcionPractica:nextProps.determinacion.descripcionPractica,
            unidadBioquimica:nextProps.determinacion.unidadBioquimica,
            unidadMedida:nextProps.determinacion.unidadMedida,
            bitAlta:nextProps.determinacion.bitAlta,
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
                "unidadMedida": this.state.unidadMedida,
            };

            this.props.alterDeterminacionAction(this.state.codigoPractica, data)

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
    }

    cambioDescripcionPractica = (e) =>{
        this.setState({
            descripcionPractica: e.target.value,
            cambios: true,
        })
    }

    cambioUnidadBioquimica = (e) =>{
        this.setState({
            unidadBioquimica: e.target.value,
            cambios: true
        })
    }

    cambioUnidadMedida = (e) =>{
        this.setState({
            unidadMedida: e.target.value,
            cambios: true,
        })
    }

    cambioBitAlta = (e) =>{
        this.setState({
            bitAlta: e.target.value,
        })
    }

    alta(e){
        this.props.switchAltaAction(this.state.codigoPractica)
    }

    mensajeBtnSwitchAlta(){
        if (this.state.bitAlta) {
          return 'Dar de Baja'
        }
        else {
          return 'Dar de Alta'
        }
    }


    render() {
        const { fetching } = this.props
        return (
            <div className='union'>
                <NavBar/>
                <div className='consulta'>

                    <Container className='btnHeader'>
                        <Button as= {Link} to='/determinaciones' floated='left' icon labelPosition='left' primary size='small'>
                            <Icon name='arrow alternate circle left' /> Volver
                        </Button>
                    </Container>

                    {fetching ? <div className='spinner'>
                        <ClipLoader
                            size={60}
                            color={'black'}
                        />
                        </div> :
                        <Container>
                            <Form size='huge'>
                                <Form.Field control='input'
                                value={this.state.descripcionPractica}
                                id='headerConsulta'
                                className={this.state.errorDescripcionPractica===true ? null: 'error'}
                                />
                                <Divider id='divider'/>
                            </Form>

                            <Form>

                                <Form.Group widths='equal'>
                                    <Form.Field required label='Código Práctica' control='input' placeholder='Código Práctica' width={5}
                                    value={this.state.codigoPractica}
                                    id='disabled'
                                    className={this.state.errorCodigoPractica ? null : 'error'}
                                    />

                                    <Form.Field required label='Descripción Práctica' control='input' placeholder='Descripción Práctica'
                                    value={this.state.descripcionPractica}
                                    onChange={this.cambioDescripcionPractica}
                                    className={this.state.errorDescripcionPractica ? null : 'error'}
                                    />
                                </Form.Group>

                                <Form.Field required label='Unidad Bioquímica' control='input' placeholder='Unidad Bioquímica'
                                value={this.state.unidadBioquimica}
                                onChange={this.cambioUnidadBioquimica}
                                className={this.state.errorUnidadBioquimica ? null : 'error'}
                                />

                                <Form.Field label='Unidad Medida' control='input' placeholder='Unidad Medida'
                                value={this.state.unidadMedida}
                                onChange={this.cambioUnidadMedida}
                                />

                                <Button color={this.state.bitAlta ? 'red' : 'green'}
                                    onClick={(e) => {
                                    if (window.confirm('¿Esta seguro que quiere dar de alta la determinacion ' + this.state.descripcionPractica + '?')) {
                                        this.alta(e)
                                    } else { e.preventDefault()} }}
                                    >{this.mensajeBtnSwitchAlta()}</Button>

                                {(this.state.cambios && this.state.bitAlta) ? <Button primary onClick={(e) => {
                                    if (window.confirm('¿Esta seguro que quiere modificar la determinación ' + this.state.descripcionPractica + '?')) {
                                        this.modificarDeterminacion(e)
                                    } else { window.location.reload(true) }
                                }}>
                                    Modificar Determinación
                                </Button> : null}

                            </Form>
                        </Container>
                    }

                </div>
            </div>
        );
    }

}

const mapStateToProps = state =>({
    determinacion: state.determinaciones.determinacion,
    fetching: state.determinaciones.fetching,
})

export default connect(mapStateToProps, { getDeterminacionByIdAction, switchAltaAction, alterDeterminacionAction })(FormConsulta);