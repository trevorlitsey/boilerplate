import React from 'react';
import { shallow } from 'enzyme';

import Spinner from './Spinner';

describe('Spinner', () => {

	it('should render without crashing', () => {
		const wrapper = shallow(<Spinner />);
		expect(wrapper).toMatchSnapshot();
	})

})