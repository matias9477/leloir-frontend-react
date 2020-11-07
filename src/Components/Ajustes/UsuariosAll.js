import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllUsers, deleteUser } from '../../Redux/userDuck';
import { Table, Button, Modal, Form } from 'semantic-ui-react';
import { getHumanDate } from '../../Services/MetodosPaciente';
import ModalCambioPass from './ModalCambioPass';


class UsuariosAll extends Component {
  constructor(props){
    super(props)
    this.state = {
      show: false,
    }
  }
 
  componentDidMount(){
    this.props.getAllUsers();
  }

  hideModal = () => {
    const {callback} = this.props
    if (callback !== undefined) {
        callback()
    }
  }

  modalCambioContra(){
    return ( 
      <ModalCambioPass show={this.state.show}
      callback={this.hideModalCallback}
      />
    )
  }

  hideModalCallback = () => {
    this.setState({
        show: false,
        currentModal: null,
    })
}

  showModal = () => {
    this.setState({
        show: true,
    })
  }

  render() {
    console.log(this.state.show)
    return (
      <div>
        <h1>Usuarios</h1>
        <div className="ui divider"/>
        {this.modalCambioContra()}
        <Table celled fixed singleLine>
          <Table.Header>
            <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Fecha Alta</Table.HeaderCell>
            <Table.HeaderCell>Nombre de Usuario</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
 
          <Table.Body>
          {this.props.allUsers.map((user, index) =>
            <Table.Row key={index}>
              <Table.Cell>{user.id}</Table.Cell>
              <Table.Cell>{getHumanDate(user.createdAt)}</Table.Cell>
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>
                {user.rol==='ROLE_ADMIN' ? null :
                  <Button circular inverted icon='cancel' color='red' onClick={ () => this.props.deleteUser(user.username)}/>
                }              

                <Button circular icon='exchange' color='blue' inverted
                    onClick={() => this.showModal()}>
                </Button>
                
              </Table.Cell>
            </Table.Row>
          )}
          </Table.Body>
        </Table>
      </div>
    );
  }
}


const mapStateToProps = state => ({  
  allUsers: state.user.allUsers,
})

export default connect(mapStateToProps, { getAllUsers, deleteUser })(UsuariosAll)