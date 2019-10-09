import React, {Component} from 'react';
import {Grid, Menu, Segment} from 'semantic-ui-react'
import MenuLateral from "../MenuOpciones";
import MiPerfil from "./MiPerfil";
import NuevoUsuario from "./NuevoUsuario";

class Ajustes extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            activeItem: '',

        });
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    componentDidMount() {
        this.setState({
            activeItem: 'MiPerfil'
        })
    }

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    getMenuPane(){
        if(this.state.activeItem === 'MiPerfil'){
            return <MiPerfil/>
        } else if ( this.state.activeItem === 'NuevoUsuario') {
            return <NuevoUsuario/>
        }
    }

    render() {
        const {activeItem} = this.state

        return (
            <div className='union'>
                <MenuLateral/>
                <div className='tablaListadoHistorico'>
                    <Grid>
                        <Grid.Column width={4}>
                            <Menu fluid vertical tabular>
                                <Menu.Item
                                    name='MiPerfil'
                                    active={activeItem === 'MiPerfil'}
                                    onClick={this.handleItemClick}
                                />
                                <Menu.Item
                                    name='NuevoUsuario'
                                    active={activeItem === 'NuevoUsuario'}
                                    onClick={this.handleItemClick}
                                />
                            </Menu>
                        </Grid.Column>

                        <Grid.Column stretched width={12}>
                            <Segment>
                                {this.getMenuPane()}
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
        )
    }
}

Ajustes.propTypes = {};

export default Ajustes;
