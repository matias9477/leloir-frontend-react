import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Form, Icon, Container, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'
import { connect } from 'react-redux'
import axios from 'axios';
import { urlUnidadesMedida } from '../../Constants/URLs';
import { urlTablaDeterminaciones } from '../../Constants/NavUrl';
import { validateOnlyNumbersRequired, validateRequiredStringNum } from './../../Services/MetodosDeValidacion';
import {convertStyleString, getUnidadMedida} from '../../Services/MetodosDeterminacion';
import { getDeterminacionByIdAction, modDeterminacionConUnidadAction, modDeterminacionAction, switchAltaAction } from '../../Redux/determinacionesDuck'
import NavBar from '../NavBar/NavBar';
import '../styles.css';

class FormConsulta extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            cambios: false,

            codigoPractica: '',
            descripcionPractica: '',
            metodo: '',
            valorReferencia: '',
            unidadBioquimica: '',
            unidadMedida: '',
            newNombreUnidadMedida: '',
            newUnidadMedida: '',
            bitAlta: '',
            estado:'',

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
        this.props.getDeterminacionByIdAction(this.props.match.params.codigoPractica)
        this.comoboUnidadesDeMedida()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            codigoPractica:nextProps.determinacion.codigoPractica,
            descripcionPractica:nextProps.determinacion.descripcionPractica,
            unidadBioquimica:nextProps.determinacion.unidadBioquimica,
            unidadMedida:nextProps.determinacion.unidadMedida,
            metodo:nextProps.determinacion.metodo,
            valorReferencia:nextProps.determinacion.valorReferencia,
            bitAlta:nextProps.determinacion.bitAlta,
        })
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

    modificarDeterminacion = (e) => {
        e.preventDefault();
        
        const {codigoPractica, unidadBioquimica, descripcionPractica} = this.state;

        const errorCodigoPractica= validateOnlyNumbersRequired(codigoPractica);
        const errorUnidadBioquimica = validateOnlyNumbersRequired(unidadBioquimica);
        const errorDescripcionPractica = validateRequiredStringNum(descripcionPractica);


        if ( errorCodigoPractica && errorDescripcionPractica && errorUnidadBioquimica) {
            var data 
        
            if (this.state.newUnidadMedida != null && this.state.newUnidadMedida != '') {
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
                this.props.modDeterminacionConUnidadAction(this.state.codigoPractica,data)
            } else {
                data = { "bitAlta": true,
                "codigoPractica": this.state.codigoPractica,
                "descripcionPractica": convertStyleString(this.state.descripcionPractica),
                "unidadBioquimica": this.state.unidadBioquimica,
                "metodo": this.state.metodo,
                "valorReferencia": this.state.valorReferencia,
                "unidadMedida": this.state.unidadMedida
                }
                this.props.modDeterminacionAction(this.state.codigoPractica,data)
            }

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

    cambioMetodo = (e) => {
        this.setState({
            metodo: e.target.value,
            cambios: true
        })
    }

    cambioValorReferencia = (e) => {
        this.setState({
            valorReferencia: e.target.value,
            cambios: true
        })
    }

    cambioUnidadMedida = (e) =>{
        this.setState({
            unidadMedida: getUnidadMedida(e.target.value,this.state.unidadesMedida),
            cambios: true,
        })
    }

    cambioBitAlta = (e) =>{
        this.setState({
            bitAlta: e.target.value,
        })
    }

    cambioNuevaUnidad = (e) => {
        const value = e.target.checked === true ? false : true;
        this.setState({
            nuevaUnidad: value,
            newNombreUnidadMedida: '',
            newUnidadMedida: ''
          });
        
    }

    cambioNewNombreUnidadMedida = (e) => {
        this.setState({
            newNombreUnidadMedida: e.target.value,
            cambios: true
        })
    }

    cambioNewUnidadMedida = (e) => {
        this.setState({
            newUnidadMedida: e.target.value,
            cambios: true
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
            <div>
                <NavBar/>
                <div className='avoidMenu'>

                    <Container className='btnHeader'>
                        <Button as= {Link} to={urlTablaDeterminaciones} floated='left' icon labelPosition='left' primary size='small'>
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

                                <Form.Group widths='equal'>
                                <Form.Field required label='Unidad Bioquímica' control='input' placeholder='Unidad Bioquímica'
                                value={this.state.unidadBioquimica}
                                onChange={this.cambioUnidadBioquimica}
                                className={this.state.errorUnidadBioquimica ? null : 'error'}
                                />

                                {this.state.unidadMedida === null ? (
                                    <Form.Field required label='Unidad de medida' control='select' width={5}
                                value={this.state.unidadMedida} 
                                onChange={this.cambioUnidadMedida} 
                                className= {this.state.errorUnidadMedida ? null : 'error'} 
                                >
                                    <option value={null}> </option>
                                    {this.state.unidadesMedida.map(item => (
                                    <option key={item.unidadDeMedidaId}>{item.unidad}</option>))}
                                </Form.Field>
                                ) : (
                                    <Form.Field required label='Unidad de medida' control='select' width={5}
                                value={this.state.unidadMedida.unidad} 
                                onChange={this.cambioUnidadMedida} 
                                className= {this.state.errorUnidadMedida ? null : 'error'} 
                                >
                                    <option value={null}> </option>
                                    {this.state.unidadesMedida.map(item => (
                                    <option key={item.unidadDeMedidaId}>{item.unidad}</option>))}
                                </Form.Field>
                                ) }
                                
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

                                <Divider id='divider'/>
                                <Form.Group widths='equal'>
                                <Form.Field label='Seleccione si desea guardar una nueva unidad de medida:' control='input'
                                name="nuevaUnidad"
                                type="checkbox"
                               // checked={this.state.nuevaUnidad}
                                onChange={this.cambioNuevaUnidad} /> 


                                <Form.Field control='input' placeholder='Nombre'
                                disabled={this.state.nuevaUnidad}
                                value={this.state.newNombreUnidadMedida}
                                onChange={this.cambioNewNombreUnidadMedida}/>

                                <Form.Field  control='input' placeholder='Unidad de medida'
                                disabled={this.state.nuevaUnidad}
                                value={this.state.newUnidadMedida}
                                onChange={this.cambioNewUnidadMedida}/>
                                </Form.Group>
                                <Divider id='divider'/>

                                </Form>
                                <Button color={this.state.bitAlta ? 'red' : 'green'}
                                    onClick={(e) => {
                                    if (window.confirm('¿Esta seguro que quiere cambiar el estado la determinacion ' + this.state.descripcionPractica + '?')) {
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

export default connect(mapStateToProps, { getDeterminacionByIdAction, switchAltaAction, modDeterminacionAction, modDeterminacionConUnidadAction })(FormConsulta);