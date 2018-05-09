import React from 'react';
import { shallow } from 'enzyme';

import { Spinner } from '../shared';

import Jumbotron from './Jumbotron';

describe('JumboTron', () => {

	it('should render spinner when loading', () => {
		const wrapper = renderJumbotron({ loading: true });
		expect(wrapper.find(Spinner).length).toBe(1)
	})

	it('should NOT render spinner when NOT loading', () => {
		const wrapper = renderJumbotron({ loading: false });
		expect(wrapper.find(Spinner).length).toBe(0)
	})

	it('should render close button when shouldDisplayJumbo is TRUE', () => {
		const wrapper = renderJumbotron({ shouldDisplayJumbo: true })
		expect(wrapper.find('.close').length).toBe(1)
	})

	it('should NOT render close button when shouldDisplayJumbo is FALSE', () => {
		const wrapper = renderJumbotron({ shouldDisplayJumbo: false })
		expect(wrapper.find('.close').length).toBe(0)
		expect(wrapper.find('.flex').length).toBe(1)
	})

})


// ------
function renderJumbotron(props = {}) {
	const propsToUser = {
		shouldDisplayJumbo: true,
		hideJumbo: jest.fn(),
		text: 'this is the text someone will download',
		loading: false,
		...props,
	}
	return shallow(<Jumbotron {...propsToUser} />)
}