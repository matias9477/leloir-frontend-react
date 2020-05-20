import React, { Component } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import { Button, Form, Icon, Container, Divider } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux'
import { validateOnlyNumbersRequired, validateRequiredStringNum } from './../../Services/MetodosDeValidacion';
import {convertStyleString } from '../../Services/MetodosDeterminacion';
import { getDeterminacionByIdAction, alterDeterminacionAction, switchAltaAction } from '../../Redux/determinacionesDuck'
import MenuOpciones from '../MenuOpciones';
import './../styles.css';

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


    renderForm() {
        const { fetching } = this.props
        return (
            <div className='Formularios'>
                <Container className='btnHeader'>
                    <Button className='boton' as= {Link} to='/determinaciones' floated='left' icon labelPosition='left' primary size='small'>
                        <Icon name='arrow alternate circle left' /> Volver
                    </Button>
                </Container>
                
                {fetching ? <CircularProgress size={50}/> : 
                <Container>
                    <Form size='huge'>
                        <Form.Field control='input'
                        value={this.state.descripcionPractica}
                        id='headerConsulta'
                        className={this.state.errorDescripcionPractica===true ? null: 'error'}
                        />
                        <Divider id='divider'/>
                    </Form>

                <Form className='altasYConsultas'>
                    
                    <Form.Group widths='equal'>
                        <Form.Field required label='Código Práctica' control='input' placeholder='Código Práctica' width={5}
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
                    </Form.Group>

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

                            {(!this.state.bitAlta) ? <Button onClick={(e) => {
                                if (window.confirm('¿Esta seguro que quiere dar de alta la determinacion ' + this.state.descripcionPractica + '?')) {
                                    this.alta(e)
                                } else { e.preventDefault() }
                            }}>Dar de Alta</Button> : null}

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
        );
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
    };


    cambioCodigoPractica = (e) =>{
        this.setState({
            codigoPractica: e.target.value
        })
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

const mapStateToProps = state =>({
    determinacion: state.determinaciones.determinacion,
    fetching: state.determinaciones.fetching,
})

export default connect(mapStateToProps, { getDeterminacionByIdAction, switchAltaAction, alterDeterminacionAction })(FormConsulta);