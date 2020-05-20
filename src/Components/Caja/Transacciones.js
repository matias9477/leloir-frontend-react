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
    formatter: importeNegativo,
  },
  {
    dataField: 'efectivo',
    text: 'Efectivo',
    formatter: importeNegativo,
  },
];

const expandRow = {
  renderer: (row) => (
    <DettalleTransacciones detalleTransacciones={row.detalleTransacciones} />
  ),
  onlyOneExpanding: true,
  parentClassName: 'reset-expansion-style',
};

function importeNegativo(cell, row) {
  if (cell < 0) {
    return (
      <span style={{ color: 'red' }}>
        {cell}
      </span>
    );
  }

  return (
    <span> {cell} </span>
  );
}


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
