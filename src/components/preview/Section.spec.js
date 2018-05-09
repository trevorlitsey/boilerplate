import React from 'react';
import { shallow } from 'enzyme';

import Section from './Section';

describe('Section', () => {

	it('should render without crashing', () => {
		const wrapper = renderSection();
		expect(wrapper).toMatchSnapshot();
	})

	it('should render correct title and text', () => {

		const title = 'WHAT A GREAT TITLE';
		const text = 'WHAT A GREAT TEXT';

		const wrapper = renderSection({ title, text });

		expect(wrapper.find('[data-test="title"]').text()).toBe(title);
		expect(wrapper.find('[data-test="text"]').text()).toBe(text);

	})

})


// -------
function renderSection(props = {}) {
	const propsToUser = {
		id: '8779y2hh',
		title: 'this is a title!',
		text: 'this is some text!',
		...props,
	}
	return shallow(<Section {...propsToUser} />)
}