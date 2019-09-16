import React from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Col, Row } from 'react-flexbox-grid';
import FormConsulta from './ConsultaPaciente/FormConsulta';
import MenuOpciones from './MenuOpciones';
//import FormAlta from './AltaPaciente/FormAlta';

function ConsultaPaciente() {
  return (
    <Grid>
      <Row>
        <AppBar position='sticky' >
          <Toolbar>
            <Typography variant='inherit' color='inherit'>
              LELOIR
            </Typography>
          </Toolbar>
        </AppBar>

      </Row>
        <Row>
          <Col xs = {2} md={3} className="Menu">
            <MenuOpciones/>
          </Col>
          <Col xs={9} md={9}>
            <Paper elevation={4}>
             <FormConsulta/>
            </Paper>
          </Col>
        </Row>
      </Grid>
  );
}

export default ConsultaPaciente;
