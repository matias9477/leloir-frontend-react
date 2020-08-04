import React from 'react';
import { shallow } from 'enzyme';

import Tabla from './Tabla';

const pacientes = []

const columns = [
    {
        dataField: 'fechaAlta',
        text: 'Fecha Alta',
    },
    {
        dataField: 'tipoPaciente',
        text: 'Tipo',
        type: 'icon',
    },
    {
        dataField: 'nombre',
        text: 'Paciente',
    },
    {
        dataField: 'nroDocumento',
        text: 'Documento',
    }
];



it('should render the component correctly with the given mocked props', ()=>{
    const component = shallow(<Tabla
                                data={pacientes}
                                param={'id'}
                                columns={columns}
                                title='Pacientes'
                                options={true}
                                path={'/pacientes/consulta/'}
                                dataConsulta={"tipoPaciente"}/>)

    expect(component).toMatchSnapshot();
});