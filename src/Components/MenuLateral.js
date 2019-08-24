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
        
        
        <Menu pointing vertical>
            <Menu.Item name='home'
              as= {Link} to='/'
              active={activeItem==='home'}
              onClick={this.handleItemClick}
              >
              <Image src="http://i67.tinypic.com/s1uetl_th.png" size='tiny' centered/>              
            </Menu.Item>
       

       
            <Menu.Item name='Pacientes' 
            as= {Link} to='/alta'
            active={activeItem === 'Pacientes'} 
            onClick={this.handleItemClick} 
          />

        
            <Menu.Item
              name='Analisis'
              as= {Link} to='/404'
              active={activeItem === 'Analisis'}
              onClick={this.handleItemClick}
          />

       
            <Menu.Item
              name='Muestras'
              as= {Link} to='/404'
              active={activeItem === 'Muestras'}
              onClick={this.handleItemClick}
          />

         
            <Menu.Item
              name='Obras Sociales'
              as= {Link} to='/404'
              active={activeItem === 'Obras Sociales'}
              onClick={this.handleItemClick}
            />

        </Menu>
        
      )
    }
  }