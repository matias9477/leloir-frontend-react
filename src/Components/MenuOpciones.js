import React, {Component} from 'react'
import {Image, Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import '../App.css';

export default class MenuOpciones extends Component {

    state = {activeItem: ''};

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    render() {
        const {activeItem} = this.state;

        return (

            //<Router>
            <div className="Menu">
                <Menu inverted>
                    <Menu.Item name='home'
                               as={Link} to='/'
                               active={activeItem === 'home'}
                               onClick={this.handleItemClick}

                    >
                        <Image src="/android-chrome-192x192.png" size='mini' centered/>
                    </Menu.Item>


                    <Menu.Item name='Pacientes'
                               as={Link} to='/pacientes'
                               active={activeItem === 'Pacientes'}
                               onClick={this.handleItemClick}
                    />


                    <Menu.Item
                        name='Analisis'
                        as={Link} to='/'
                        active={activeItem === 'Analisis'}
                        onClick={this.handleItemClick}
                    />


                    <Menu.Item
                        name='Muestras'
                        as={Link} to='/'
                        active={activeItem === 'Muestras'}
                        onClick={this.handleItemClick}
                    />


                    <Menu.Item
                        name='Obras Sociales'
                        as={Link} to='/'
                        active={activeItem === 'Obras Sociales'}
                        onClick={this.handleItemClick}
                    />

                    <Menu.Item
                        name='Determinaciones'
                        as={Link} to='/determinaciones/add'
                        active={activeItem === 'Determinaciones'}
                        onClick={this.handleItemClick}
                    />

                </Menu>

            </div>
            // </Router>

        )
    }
}