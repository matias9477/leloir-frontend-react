import React, {Component} from 'react';
import MenuLateral from "../MenuOpciones";
import {Button, Card, List} from 'semantic-ui-react'
import axios from "axios";

const CardExampleGroups = (pendientes) => (
    <Card.Group itemsPerRow={2}>

        {pendientes.map((analisis) => (
            <Card fluid>
                <Card.Content>
                    <Card.Header>{analisis.paciente}</Card.Header>
                    <Card.Meta>{analisis.diasPendiente === 0 ? 'Hoy' : analisis.diasPendiente === 1 ? 'Ayer' :
                        <div>Hace {analisis.diasPendiente} dias</div>}</Card.Meta>
                    <Card.Description>
                        Determinacion
                        <List bulleted>
                            {analisis.determinaciones.map(nombre => <List.Item><strong>{nombre}</strong></List.Item>)}
                        </List>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    {
                        analisis.resultadosCargados ? (
                            <div className='ui two buttons'>
                                <Button basic color='green'>
                                    Emitir Analisis
                                </Button>
                                <Button basic color='blue'>
                                    Modificar Resultados
                                </Button>
                            </div>
                        ) : (
                            <div className='ui two buttons'>
                                <Button basic color='blue'>
                                    Cargar Resultados
                                </Button>
                            </div>
                        )
                    }
                </Card.Content>
            </Card>
        ))}
    </Card.Group>
);


class DiarioPracticas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pendientes: [],
        };
    }

    componentDidMount() {
        this.getAllPendientes()
    }

    getAllPendientes = () => {
        axios.get("http://leloir.free.beeceptor.com/analisis/pendientes").then((response) => {
            this.setState({
                pendientes: Object.values(response.data).flat(),
            });
        }, (error) => {
            console.log('Error', error.message);
        })
    };


    render() {
        return (
            <div className='union'>
                <MenuLateral/>
                <div className='tablaListadoHistorico'>
                    {CardExampleGroups(this.state.pendientes)}
                </div>
            </div>
        );
    }
}

export default DiarioPracticas;