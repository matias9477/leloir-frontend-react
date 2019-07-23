import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class FetchPaciente extends React.Component{
    state = {
        loading: true,
        paciente: null,
    }

    async componentDidMount(){
        const url = "https://randomuser.me/api";
        const api = "http://localhost:8080/pacientes/pacienteid?id=1";
        
        const response = await fetch(url);
        const data = await response.json();
        this.setState({paciente:data.results[0], loading: false})
    }

    render(){
        return (
        <div>
            {this.state.loading || !this.state.paciente ? (
             <CircularProgress size = {50}>  </ CircularProgress >
            ) : (
            <div> 
               {`${this.state.paciente.name.first} 
               ${this.state.paciente.name.last} `}
            </div>
            )}
        </div>
        );
}
}