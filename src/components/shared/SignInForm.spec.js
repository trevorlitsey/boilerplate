import React from 'react';
import { shallow } from 'enzyme';

import SignInForm from './SignInForm';

describe('SignInForm', () => {

	it('should render without crashing', () => {
		const wrapper = shallow(<SignInForm />);
		expect(wrapper).toMatchSnapshot();
	})

})