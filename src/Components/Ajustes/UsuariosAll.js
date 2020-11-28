import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllUsers, deleteUser } from '../../Redux/userDuck';
import { Table, Button } from 'semantic-ui-react';
import { getHumanDate } from '../../Services/MetodosPaciente';
import ModalCambioPass from './ModalCambioPass';


class UsuariosAll extends Component {
  constructor(props){
    super(props)
    this.state = {
      show: false,
      user: "",
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


  handleModalContent() {
    switch (this.state.currentModal) {
        case 'MODIFICAR':
            return (
                <ModalCambioPass show={this.state.show}
                                 callback={this.hideModalCallback}
                                 user={this.state.user}/>
            )
        default:
            return 
    }
  }

  hideModalCallback = () => {
    this.setState({
        show: false,
        currentModal: null,
    })
}

  showModal = (modal, user) => {
    this.setState({
        show: true,
        currentModal: modal,
        user,
    })
  }

  render() {
    return (
      <div>
        <h1>Usuarios</h1>
        <div className="ui divider"/>
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
                      onClick={() => this.showModal('MODIFICAR', user.username)}>
                  </Button>
                  
                </Table.Cell>
              </Table.Row>
            )}
            </Table.Body>
          </Table>

          {this.handleModalContent()}

        </div>
    );
  }
}


const mapStateToProps = state => ({  
  allUsers: state.user.allUsers,
})

export default connect(mapStateToProps, { getAllUsers, deleteUser })(UsuariosAll)