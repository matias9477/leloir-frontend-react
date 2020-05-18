import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import './../styles.css';
import './cajaStyles.css';

const columns = [
  {
    dataField: 'idDetalleTransaccion',
    text: 'Id',
  },
  {
    dataField: 'detalle',
    text: 'Detalle',
  },
  {
    dataField: 'idAnalisis',
    text: 'Observaciones',
  },
  {
    dataField: 'formaPago',
    text: 'Forma de Pago',
  },
  {
    dataField: 'importe',
    text: 'Importe',
  },
];

class DetalleTransacciones extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BootstrapTable
        keyField='idDetalleTransaccion'
        columns={columns}
        data={this.props.detalleTransacciones}
        headerWrapperClasses='subHeaderStyle'
        rowClasses='expandRowStyle'
      />
    );
  }
}

export default DetalleTransacciones;
