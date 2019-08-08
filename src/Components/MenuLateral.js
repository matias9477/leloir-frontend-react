import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom';


export default class MenuLateral extends Component {
    state = { activeItem: 'home' }
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
  
      return (
        <nav>
        <Menu inverted vertical>
          <Link to="/alta">
          <Menu.Item name='Registrar Paciente' 
          active={activeItem === 'Registrar Paciente'} 
          onClick={this.handleItemClick} 
          /></Link>
          <Link to="/consulta">
          <Menu.Item
            name='Buscar Paciente'
            active={activeItem === 'Buscar Paciente'}
            onClick={this.handleItemClick}
          /></Link>
          <Link to="/">
          <Menu.Item
            name='Modificar Paciente'
            active={activeItem === 'Modificar Paciente'}
            onClick={this.handleItemClick}
          /></Link>
          <Link to="/">
          <Menu.Item
            name='Eliminar Paciente'
            active={activeItem === 'Eliminar Paciente'}
            onClick={this.handleItemClick}
            /></Link>
        </Menu>
        </nav>
      )
    }
  }