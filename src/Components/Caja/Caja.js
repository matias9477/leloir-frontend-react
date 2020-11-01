import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import Tabla from '../Reusables/Tabla/Tabla';
import { getTransaccionesAction } from '../../Redux/cajaDuck';
import NavBar from '../NavBar/NavBar'
import { urlAddTransaccion } from '../../Constants/NavUrl';
import './cajaStyles.css';

const columns = [
  {
    dataField: 'fecha',
    text: 'Fecha',
  },
  {
    dataField: 'concepto',
    text: 'Concepto',
  },
  {
    dataField: 'descripcion',
    text: 'Descripción',
  },
  {
    dataField: 'importe',
    text: 'Importe',
    style: 'importeNegativo',
  },
  {
    dataField: 'efectivo',
    text: 'Efectivo',
    style: 'importeNegativo',
  },
];

const columnsDetalle = [
  {
    dataField: 'observacion',
    text: 'Descripción',
  },
  {
    dataField: 'formaPago',
    text: 'Forma de Pago',
  },
  {
    dataField: 'importe',
    text: 'Importe',
  }
];


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
          <div>

            <Tabla
                data={this.props.transacciones}
                param='idTransaccion'
                urlAdd={urlAddTransaccion}
                buttonTitleAdd='Nueva Transacción'
                columns={columns}
                title='Caja'
                expansibleRows={true}
                expansibleRowsContent={columnsDetalle}
                detailsValue='detalleTransacciones'
            />
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