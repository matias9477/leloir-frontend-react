import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button, Icon,Input} from 'semantic-ui-react';
import './LPSecretaria.css';

class Afluencia extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            nombre:'',
        })
        this.cambioNombre = this.cambioNombre.bind(this);

    }

    cambioNombre(e) {
        this.setState( {
          nombre: e.target.value
        })
      }

    handleAdd=()=>{
        console.log(this.state.nombre)
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    // shouldComponentUpdate(nextProps, nextState) {

    // }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="afluencia">
                <Button primary icon onClick={this.handleAdd}>
                    <Icon name='add user'/>
                </Button>
                {/* &nbsp;  significa non blank space y se usa como recurso html para agregar espacios*/}
                &nbsp;&nbsp;&nbsp;<label>Nombre</label>&nbsp;&nbsp;&nbsp;
                <Input placeholder="Ingrese nombre..." onChange={this.cambioNombre}></Input>
            </div>

        );
    }
}

Afluencia.propTypes = {

};

export default Afluencia;