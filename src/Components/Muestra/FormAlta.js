import React, { Component } from 'react';
import axios from 'axios'
import { Button, Form} from 'semantic-ui-react'
import {validateDescrip,validateFecha} from './../../Services/MetodosMuestra'
import { NotificationManager} from 'react-notifications';
import MenuOpciones from '../MenuOpciones';
import { titleCase, hasNumbers } from './../../Services/MetodosDeValidacion';
import './../styles.css';
import {getCurrentDate} from "../../Services/MetodosPaciente";

class AltaObraSocial extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            fechaAlta: '',
            descripcion:'asdasd',
            analisisId:'123',
            estado: 'listo',

            errorFechaAlta: true,
            errorDescripcion: true,
            errorAnalisisId: true,
            errorEstado: true,

        });
        this.nuevaMuestra = this.nuevaMuestra.bind(this);
        this.cambioAnalisisId= this.cambioAnalisisId.bind(this);
        this.cambioDescripcion = this.cambioDescripcion.bind(this);
        this.cambioFechaAlta = this.cambioFechaAlta.bind(this);
        this.cambioEstado = this.cambioEstado.bind(this);

    }

    renderForm() {
       return(
           <div>
           <Form>
               <Button primary type="submit" onClick={this.nuevaMuestra} className="boton"> Crear muestra</Button >
           </Form>
           </div>);

            }
    handleUpdateClick = (api) => {
        var data = {
            "analisisId": this.state.analisisId,
            "descripcion": titleCase(this.state.descripcion),
            "fechaAlta": getCurrentDate(),
            "estado": this.state.estado
        };

        axios.post(api, data).then((response) => {
            NotificationManager.success('Se generó código muestra');
        }, (error) => {
            NotificationManager.error('No se ha podido generar código muestra');
        })

    };

    nuevaMuestra(e){
        e.preventDefault();

        const {analisisId, descripcion, fechaAlta, estado} = this.state;

        const errorAnalisisId = true;
        const errorDescripcion = true;
        const errorFechaAlta = true;
        const errorEstado = validateDescrip(estado);

        if (errorAnalisisId && errorDescripcion && errorEstado && errorFechaAlta) {
            const api = '/muestras/add';
            this.handleUpdateClick(api);
        } else {
            alert("Revise los datos ingresados.");
            this.setState({
                errorAnalisisId,
                errorDescripcion,
                errorFechaAlta,
                errorEstado,
            })
        }
    }

    cambioFechaAlta(e) {
        this.setState( {
            fechaAlta: e.target.value
        })
    }

    cambioDescripcion(e) {
        this.setState( {
            descripcion: e.target.value
        })
    }

    cambioAnalisisId(e){
        this.setState( {
            analisisId: e.target.value
        })
    }

    cambioEstado(e){
        this.setState( {
            estado: e.target.value
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


export default AltaObraSocial;