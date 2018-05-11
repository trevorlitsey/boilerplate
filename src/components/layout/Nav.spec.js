import React from 'react';
import { shallow } from 'enzyme';

import Nav from './Nav';

describe('Nav', () => {

	it('should say Sign in with Google if user is NOT logged in', () => {
		const wrapper = renderNav();
		expect(wrapper.find('button').text()).toContain('Sign in')
		expect(wrapper).toMatchSnapshot();
	})

	it('should say Sign Out if user IS logged in', () => {
		const wrapper = renderNav({ user: { uid: '5suhsjs' } });
		expect(wrapper.find('button').text()).toContain('Sign out')
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
		},
		user: null,
		...props,
	}

	return shallow(<Nav {...propsToUser} />);
}