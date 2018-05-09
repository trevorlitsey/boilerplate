import React from 'react';
import { shallow } from 'enzyme';

import Layout from './Layout';

describe('Layout', () => {

	it('should render without crashing', () => {
		const wrapper = renderLayout();
		expect(wrapper).toMatchSnapshot();
	})

})


// -----------
function renderLayout(props = {}) {
	const propsToUser = {
		location: {
			hash: '',
			key: 'jt5a16',
			pathname: '/snippets',
			search: ''
		}
	}

	return shallow(<Layout {...propsToUser} />);
}