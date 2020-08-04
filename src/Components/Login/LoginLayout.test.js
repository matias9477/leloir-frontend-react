import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from './LoginLayout';

describe('LoginForm', () => {
    it('should render correctly in "debug" mode', () =>{
        const component = shallow(<LoginForm debug />);

        expect(component).toMatchSnapshot();
    });
});
