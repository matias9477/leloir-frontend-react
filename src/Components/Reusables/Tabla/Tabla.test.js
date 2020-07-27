import React from 'react';
import { shallow } from 'enzyme';

import Tabla from './Tabla';

const pacientes = {}

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