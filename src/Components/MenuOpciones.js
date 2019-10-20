import React, {Component, createRef} from 'react'
import {Image, Menu, Icon, Sticky} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import '../App.css';

export default class MenuOpciones extends Component {

    state = {activeItem: ''};
    contextRef = createRef();

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    render() {
        const {activeItem} = this.state;

        return (

            <Sticky context={this.contextRef}>



            <div className="Menu">
                <Menu inverted>
                    <Menu.Item 
                        name='home'
                        as={Link} to='/'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                    >
                        <Image src="/android-chrome-192x192.png" size='mini' centered/>
                    </Menu.Item>


                    <Menu.Item 
                        name='Pacientes'
                        as={Link} to='/pacientes'
                        active={activeItem === 'Pacientes'}
                        onClick={this.handleItemClick}
                    />


                    <Menu.Item
                        name='Analisis'
                        as={Link} to='/analisis'
                        active={activeItem === 'Analisis'}
                        onClick={this.handleItemClick}
                    />


                    <Menu.Item
                        name='Muestras'
                        as={Link} to='/muestras'
                        active={activeItem === 'Muestras'}
                        onClick={this.handleItemClick}
                    />


                    <Menu.Item
                        name='Obras Sociales'
                        as={Link} to='/obras_sociales'
                        active={activeItem === 'Obras Sociales'}
                        onClick={this.handleItemClick}
                    />

                    <Menu.Item
                        name='Determinaciones'
                        as={Link} to='/determinaciones'
                        active={activeItem === 'Determinaciones'}
                        onClick={this.handleItemClick}
                    />

                    <Menu.Item
                        name='Diario Practicas'
                        as={Link} to='/diario-practicas'
                        active={activeItem === 'Diario Practicas'}
                        onClick={this.handleItemClick}
                    />

                    <Menu.Menu position='right'>
                        <Menu.Item
                            as={Link} to='/ajustes'
                            active={activeItem === 'Ajustes'}
                            color={'teal'}
                            onClick={this.handleItemClick}
                        >
                            <Icon inverted name='setting' size='large' />
                        </Menu.Item>
                        <Menu.Item
                            as={Link} to='/logout'
                            active={activeItem === 'Logout'}
                            color={'red'}
                            onClick={this.handleItemClick}
                        >
                            <Icon inverted name='log out' size='large' />
                        </Menu.Item>
                    </Menu.Menu>


                </Menu>


            </div>
            </Sticky>


        )
    }
}