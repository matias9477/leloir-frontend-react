import React, { Component } from "react";
import { connect } from "react-redux";
import { Header } from "semantic-ui-react";
import SyncLoader from "react-spinners/SyncLoader";

import { getTransaccionesAction } from "../../Redux/cajaDuck";
import MenuOpciones from "../MenuOpciones";
import Transacciones from "./Transacciones";
import "./../styles.css";
import "./cajaStyles.css";

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
  componentWillReceiveProps(nextProp) {
    this.setState({ transacciones: nextProp.transacciones });
  }

  render() {
    const { fetching } = this.props;
    console.log(fetching);

    return (
      <div>
        <MenuOpciones />
        {fetching ? (
          <div className="spinner">
            <SyncLoader
              size={10}
              margin={5}
              color={"black"}
              loading={fetching}
            />
          </div>
        ) : (
          <div className="listadoCaja">
            <Header as="h2">Transacciones</Header>
            <Transacciones transacciones={this.state.transacciones} />
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
