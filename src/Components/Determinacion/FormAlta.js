import React, { Component } from 'react';
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Container, Form, Divider, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import { urlTablaDeterminaciones } from '../../Constants/NavUrl';
import { addDeterminacionAction } from './../../Redux/determinacionesDuck';
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

            errorCodigoPractica: true,
            errorDescripcionPractica: true,
            errorUnidadBioquimica: true,
        });
    }

    handleUpdateClick = () => {
        var data = {
            "bitAlta": true,
            "codigoPractica": this.state.codigoPractica,
            "descripcionPractica": convertStyleString(this.state.descripcionPractica),
            "unidadBioquimica": this.state.unidadBioquimica,
            "unidadMedida": this.state.unidadMedida
        };

        this.props.addDeterminacionAction(data)
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

    vaciadoCampos() {
        this.setState({
            codigoPractica: '',
            descripcionPractica: '',
            unidadBioquimica: '',
            unidadMedida: '',
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

    cambioUnidadMedida = (e) => {
        this.setState({
            unidadMedida: e.target.value
        })
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

                        <Form.Field required label='Unidad Bioquímica' control='input' placeholder='Unidad Bioquímica'
                        value={this.state.unidadBioquimica}
                        onChange={this.cambioUnidadBioquimica}
                        className={this.state.errorUnidadBioquimica ? null : 'error'}
                        />

                        <Form.Field label='Unidad Medida' control='input' placeholder='Unidad Medida'
                        value={this.state.unidadMedida}
                        onChange={this.cambioUnidadMedida}/>

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


export default connect(mapStateToProps,{ addDeterminacionAction })(FormAlta);