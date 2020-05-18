import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import './../styles.css';
import './cajaStyles.css';
import DettalleTransacciones from './DetalleTransacciones';

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
  },
  {
    dataField: 'efectivo',
    text: 'Efectivo',
  },
];

const expandRow = {
  renderer: (row) => (
    <DettalleTransacciones detalleTransacciones={row.detalleTransacciones} />
  ),
  onlyOneExpanding: true,
  parentClassName: 'reset-expansion-style',
};

class Transacciones extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BootstrapTable
        keyField='idTransaccion'
        columns={columns}
        expandRow={expandRow}
        data={this.props.transacciones}
        rowClasses='rowStyle'
        headerWrapperClasses='headerStyle'
        hover={true}
      />
    );
  }
}

export default Transacciones;
