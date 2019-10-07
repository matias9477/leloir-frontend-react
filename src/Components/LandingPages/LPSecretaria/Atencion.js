import React, { Component } from 'react';
import { Form, Header } from 'semantic-ui-react';

import './LPSecretaria.css';

class Atencion extends Component {

    render() {
        console.log( this.props.next)
        return (
            <div>
                <Header as='h2'>Próximo Paciente</Header>
                <Form className='formAtencion'>
                    <Form.Field label='Paciente' value={this.props.next.text} control='input' />
                </Form>
            </div>
        );
    }
}

export default Atencion;