import React, { Component } from 'react';
import axios from "axios";
import { Form } from 'semantic-ui-react';

import { urlLoggedUser } from "../../Constants/URLs";
import { titleCase } from '../../Services/MetodosDeValidacion';

class MiPerfil extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            loggedUser: [],
            id: '',
            username: '',
            name: '',
            lastName: '',
            role: '',
            date: '',
        });
    }

    componentDidMount(){
        this.getLoggedUser();
        
    }
    

    getLoggedUser = () => {
        axios.get(urlLoggedUser).then(resolve => {
            this.setState({
              loggedUser: Object.values(resolve.data).flat(),
              id: resolve.data.id,
              username: resolve.data.username,
              name: resolve.data.name,
            });
          }, (error) => {
              console.log('Error carga usuario logeado: ', error.message);
          })
    };


    render() {
        return (
            <div>
                <h1>Mi Perfil</h1>
                <div className="ui divider"/>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field label='id' control='input' placeholder='id' value={this.state.id}
                        />
                        <Form.Field label='Usuario' control='input' placeholder='Usuario' value={this.state.username}
                        />
                    </Form.Group>
                   
                    <Form.Field label='Nombre' control='input' placeholder='Nombre' value={titleCase(this.state.name)}
                    />
                        
                </Form>
            </div>
        );
    }
}

export default MiPerfil;