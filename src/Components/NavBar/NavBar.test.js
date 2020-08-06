import React from 'react';
import { shallow } from 'enzyme';

import NavBar from './NavBar';

it('should render the NavBar component correctly with no props', ()=>{
    const component = shallow(<NavBar />);

    expect(component).toMatchSnapshot();
});
