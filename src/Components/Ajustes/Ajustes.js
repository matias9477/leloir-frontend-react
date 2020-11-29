import React, {Component} from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';

import NavBar from '../NavBar/NavBar'
import MiPerfil from './MiPerfil';
import NuevoUsuario from './NuevoUsuario';
import UsuariosAll from './UsuariosAll';

class Ajustes extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            activeItem: '',
        });
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
        } else if ( this.state.activeItem === 'Usuarios') {
            return <UsuariosAll/>
        }
    }

    renderAdmin(activeItem){
        return (
            <div>
                <NavBar/>
                <div className='avoidMenu'>
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
                                <Menu.Item
                                    name='Usuarios'
                                    active={activeItem === 'Usuarios'}
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

    renderOtrosUsers(activeItem){
        return (
            <div>
                <NavBar/>
                <div className='avoidMenu'>
                    <Grid>
                        <Grid.Column width={4}>
                            <Menu fluid vertical tabular>
                                <Menu.Item
                                    name='MiPerfil'
                                    active={activeItem === 'MiPerfil'}
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

    getRenderByRole = (rol, activeItem) => {
        if (rol==="ROLE_ADMIN") {
          return this.renderAdmin(activeItem);
        } else {
          return this.renderOtrosUsers(activeItem);
        }
    
    }

    render() {
        const {activeItem} = this.state

        return (
            this.getRenderByRole(this.props.userRole, activeItem)
        )
    }
}


function mapStateToProps(state){
    return {
      userRole: state.user.loggedInUser.rol,
      fetchingLoggedInUser: state.user.fetchingLoggedInUser,
    }
  }
  
  export default connect(mapStateToProps, {  })(Ajustes);