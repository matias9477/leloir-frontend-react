import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Col, Row } from 'react-flexbox-grid';
import FetchPaciente from './FetchPaciente';
import Form from './Form';

function ConsultaPaciente() {
  return (
    <Grid>
      <Row>
        <AppBar position='sticky' >
          <Toolbar>
            <Typography variant='title' color='inherit'>
              LELOIR
            </Typography>
          </Toolbar>
        </AppBar>

      </Row>
        <Row>
          <Col xs = {3} md={3} >
            <div><br></br>Menú de opciones</div>
            <br></br>
            <div>1. Registrar Paciente</div>
            <div>2. Consultar Paciente</div>
          </Col>
          <Col xs={9} md={9}>
            <Paper elevation={4}>
             <Form></Form>
            </Paper>
          </Col>
        </Row>
      </Grid>
  );
}

export default ConsultaPaciente;
