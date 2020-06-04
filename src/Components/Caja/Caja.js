import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import ClipLoader from 'react-spinners/ClipLoader';

import { getTransaccionesAction } from '../../Redux/cajaDuck';
import NavBar from '../NavBar/NavBar'
import Transacciones from './Transacciones';
import './cajaStyles.css';

class Caja extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transacciones: [],
    };
  }
  componentDidMount() {
    this.props.getTransaccionesAction();
  }

  render() {
    const { fetching } = this.props;

    return (
      <div>
        <NavBar />
        {fetching ? (
          <div className='spinner'>
            <ClipLoader
                size={60}
                color={'black'}
            />
          </div>
        ) : (
          <div className='avoidMenu'>
            <Header as='h2'>Transacciones</Header>
            <Transacciones transacciones={this.props.transacciones} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  transacciones: state.caja.transacciones,
  fetching: state.caja.fetching,
});

export default connect(mapStateToProps, { getTransaccionesAction })(Caja);
