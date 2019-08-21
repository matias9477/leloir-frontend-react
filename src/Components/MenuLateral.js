import React, { Component } from 'react'
import { Menu , Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import '../App.css';

export default class MenuLateral extends Component {

    state = { activeItem: 'home' }
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
  
      return (
        <nav>
        <Menu pointing vertical>
          <Link to="/">
            <Menu.Item name='home'
              active={activeItem==='home'}
              onClick={this.handleItemClick}>
              <Image src="http://i67.tinypic.com/s1uetl_th.png" size='tiny' centered/>              
            </Menu.Item>
          </Link>

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