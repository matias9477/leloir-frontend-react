import React, { Component } from 'react';
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Container, Form, Divider, Icon, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import { urlTablaDeterminaciones } from '../../Constants/NavUrl';
import { urlUnidadesMedida } from '../../Constants/URLs';
import { addDeterminacionAction, addDeterminacionConUnidadAction } from './../../Redux/determinacionesDuck';
import { validateOnlyNumbersRequired, validateRequiredStringNum } from './../../Services/MetodosDeValidacion';
import { convertStyleString } from '../../Services/MetodosDeterminacion';
import NavBar from '../NavBar/NavBar';
import '../styles.css';

class FormAlta extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            codigoPractica: '',
            descripcionPractica: '',
            unidadBioquimica: '',
            unidadMedida: '',
            metodo: '',
            valorReferencia: '',
            newNombreUnidadMedida: '',
            newUnidadMedida: '',

            unidadesMedida: [],

            errorCodigoPractica: true,
            errorDescripcionPractica: true,
            errorUnidadBioquimica: true,
            errorUnidadMedida: true,
            errorMetodo: true,
            errorValorReferencia: true,
            nuevaUnidad: true,
        });
    }

    componentDidMount() {
        this.comoboUnidadesDeMedida()
      }

    handleUpdateClick = () => {
        var data 
        if (this.state.unidadMedida === null || this.state.unidadMedida === '') {
            data = {
            "bitAlta": true,
            "codigoPractica": this.state.codigoPractica,
            "descripcionPractica": convertStyleString(this.state.descripcionPractica),
            "metodo": this.state.metodo,
            "valorReferencia": this.state.valorReferencia,
            "unidadBioquimica": this.state.unidadBioquimica,
            "unidadMedida": {
                nombre: this.state.newNombreUnidadMedida,
                unidad: this.state.newUnidadMedida
                }
            }
            this.props.addDeterminacionConUnidadAction(data)
        } else {
            data = { "bitAlta": true,
            "codigoPractica": this.state.codigoPractica,
            "descripcionPractica": convertStyleString(this.state.descripcionPractica),
            "unidadBioquimica": this.state.unidadBioquimica,
            "metodo": this.state.metodo,
            "valorReferencia": this.state.valorReferencia,
            "unidadMedida": this.state.unidadMedida
            }
            this.props.addDeterminacionAction(data)
        }
    };

    fetchDeterminacion = (e) => {
        e.preventDefault();

        const {codigoPractica, unidadBioquimica, descripcionPractica} = this.state;

        const errorCodigoPractica= validateOnlyNumbersRequired(codigoPractica);
        const errorUnidadBioquimica = validateOnlyNumbersRequired(unidadBioquimica);
        const errorDescripcionPractica = validateRequiredStringNum(descripcionPractica);

        if (errorCodigoPractica && errorUnidadBioquimica && errorDescripcionPractica) {
            this.handleUpdateClick()
            this.vaciadoCampos()
        } else {
            alert('Verificar datos ingresados.')
            this.setState({
                errorCodigoPractica, 
                errorUnidadBioquimica,
                errorDescripcionPractica,
            })
        }
    }

    comoboUnidadesDeMedida = () =>{
        axios.get(urlUnidadesMedida).then(resolve => {
            this.setState({
                unidadesMedida: Object.values(resolve.data).flat(),
            });
        }, (error) => {
            console.log('Error en carga de unidades medida: ', error.message);
        })
      };

    vaciadoCampos() {
        this.setState({
            codigoPractica: '',
            descripcionPractica: '',
            unidadBioquimica: '',
            unidadMedida: '',
            metodo: '',
            valorReferencia: '',
            newNombreunidadBioquimica: '',
            newUnidadBioquimica: '',
            errorCodigoPractica: true,
            errorUnidadBioquimica: true,
            errorUnidadMedida: true,
        })
    }

    cambioCodigoPractica = (e) => {
        this.setState({
            codigoPractica: e.target.value
        })
    }

    cambioMetodo = (e) => {
        this.setState({
            metodo: e.target.value
        })
    }

    cambioValorReferencia = (e) => {
        this.setState({
            valorReferencia: e.target.value
        })
    }

    cambioDescripcionPractica = (e) => {
        this.setState({
            descripcionPractica: e.target.value
        })
    }

    cambioUnidadBioquimica = (e) => {
        this.setState({
            unidadBioquimica: e.target.value
        })
    }
    
    cambioNewNombreUnidadMedida = (e) => {
        this.setState({
            newNombreUnidadMedida: e.target.value
        })
    }

    cambioNewUnidadMedida = (e) => {
        this.setState({
            newUnidadMedida: e.target.value
        })
    }

    cambioUnidadMedida = (e) => {
        this.setState({
            unidadMedida: e.target.value
        })
    }

    cambioNuevaUnidad = (e) => {
        const value = e.target.checked === true ? false : true;
        this.setState({
            nuevaUnidad: value
          });
        
    }


    render() {
        return (
            <div>
                <NavBar/>
                <div className='avoidMenu'>
                    <Container className='btnHeader'>
                        <Button as={Link} to={urlTablaDeterminaciones} exact='true' floated='left' icon
                                labelPosition='left' primary size='small'>
                            <Icon name='arrow alternate circle left'/> Volver
                        </Button>
                    </Container>

                    <Form size='huge'>
                        <Form.Field control='input'
                        value='Nueva Determinación'
                        id = 'headerConsulta'
                        />
                        <Divider id='divider'/>

                    </Form>

                    <Form onSubmit={this.fetchDeterminacion}>

                        <Form.Group widths='equal'>
                            <Form.Field required label='Código Práctica' control='input' placeholder='Código Práctica' width={5}
                            value={this.state.codigoPractica}
                            onChange={this.cambioCodigoPractica}
                            className={this.state.errorCodigoPractica ? null : 'error'}
                            />

                            <Form.Field required label='Descripción Práctica' control='input'
                            placeholder='Descripción Práctica'
                            value={this.state.descripcionPractica}
                            onChange={this.cambioDescripcionPractica}
                            className={this.state.errorDescripcionPractica ? null : 'error'}/>
                        </Form.Group>

                        <Form.Group widths='equal'>
                        <Form.Field required label='Unidad Bioquímica' control='input' placeholder='Unidad Bioquímica'
                        value={this.state.unidadBioquimica}
                        onChange={this.cambioUnidadBioquimica}
                        className={this.state.errorUnidadBioquimica ? null : 'error'}
                        />

                        <Form.Field required label='Unidad de medida' control='select' placeholder ='Unidad Medida' width={5}
                        value={this.state.unidadMedida} 
                         onChange={this.cambioUnidadMedida} 
                        className= {this.state.errorUnidadMedida ? null : 'error'} 
                        >
                            <option value={null}> </option>
                            {this.state.unidadesMedida.map(item => (
                            <option key={item.unidadDeMedidaId}>{item.unidad}</option>))}
                        </Form.Field>
                        </Form.Group>

                        <Form.Group widths='equal'>
                        <Form.Field label='Método' control='input' placeholder='Método'
                        value={this.state.metodo}
                        onChange={this.cambioMetodo}
                        className={this.state.errorMetodo ? null : 'error'}
                        />

                        <Form.Field label='Valor Referencia' control='input' placeholder='Valor Referencia'
                        value={this.state.valorReferencia}
                        onChange={this.cambioValorReferencia}
                        className={this.state.errorValorReferencia ? null : 'error'}
                        />
                        </Form.Group>

                        <Form>
                        <Divider id='divider'/>
                        <Form.Field label='Seleccione si desea guardar una nueva unidad de medida:' control='input'
                                name="nuevaUnidad"
                                type="checkbox"
                                //checked={this.state.nuevaUnidad}
                                onChange={this.cambioNuevaUnidad} /> 


                        <Form.Field control='input' placeholder='Nombre'
                        disabled={this.state.nuevaUnidad}
                        value={this.state.newNombreUnidadMedida}
                        onChange={this.cambioNewNombreUnidadMedida}/>

                        <Form.Field  control='input' placeholder='Unidad de medida'
                        disabled={this.state.nuevaUnidad}
                        value={this.state.newUnidadMedida}
                        onChange={this.cambioNewUnidadMedida}/>

                        <Divider id='divider'/>

                        </Form>
                        

                        <Button style={{marginTop: '2rem'}} primary type="submit" onClick={this.fetchDeterminacion}> Registrar Determinacion</Button>

                    </Form>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state =>({
    fetching: state.determinaciones.fetching,
})


export default connect(mapStateToProps,{ addDeterminacionAction, addDeterminacionConUnidadAction })(FormAlta);