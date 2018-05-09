import React from 'react';
import { shallow } from 'enzyme';

import Nav from './Nav';

describe('Nav', () => {

	it('should render without crashing', () => {
		const wrapper = renderNav();
		expect(wrapper).toMatchSnapshot();
	})

})



// -----------
function renderNav(props = {}) {
	const propsToUser = {
		location: {
			hash: '',
			key: 'jt5a16',
			pathname: '/snippets',
			search: ''
		}
	}

	return shallow(<Nav {...propsToUser} />);
}