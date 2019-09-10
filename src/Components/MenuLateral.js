import React, { Component } from 'react'
import { Menu , Image} from 'semantic-ui-react'
//import {BrowserRouter as Router, Link} from 'react-router-dom';
import {Link} from 'react-router-dom'
import '../App.css';

export default class MenuLateral extends Component {

    state = { activeItem: 'home' }
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
  
      return (
        
        //<Router>
        <Menu pointing vertical>
            <Menu.Item name='home'
              as= {Link} to='/'
              active={activeItem==='home'}
              onClick={this.handleItemClick}
              >
              <Image src="/android-chrome-192x192.png" size='tiny' centered/>              
            </Menu.Item>
       

       
            <Menu.Item name='Pacientes' 
            as= {Link} to='/pacientes'
            active={activeItem === 'Pacientes'} 
            onClick={this.handleItemClick} 
          />

        
            <Menu.Item
              name='Analisis'
              as= {Link} to='/'
              active={activeItem === 'Analisis'}
              onClick={this.handleItemClick}
          />

       
            <Menu.Item
              name='Muestras'
              as= {Link} to='/'
              active={activeItem === 'Muestras'}
              onClick={this.handleItemClick}
          />

         
            <Menu.Item
              name='Obras Sociales'
              as= {Link} to='/'
              active={activeItem === 'Obras Sociales'}
              onClick={this.handleItemClick}
            />

        </Menu>
        //</Router>
        
      )
    }
  }