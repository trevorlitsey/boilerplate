import React from 'react';
import { shallow } from 'enzyme';

import SignInMessage from './SignInMessage';

describe('SignInMessage', () => {

	it('should render without crashing', () => {
		const wrapper = shallow(<SignInMessage />);
		expect(wrapper).toMatchSnapshot();
	})

})