import React from 'react';
import { shallow } from 'enzyme';

import NewSnippetButton from './NewSnippetButton';

describe('NewSnippetButton', () => {

	it('should render without crashing', () => {
		const wrapper = renderNewSnippetButton();
		expect(wrapper).toMatchSnapshot();
	})

	it('should call showModal on click', () => {
		const showModal = jest.fn();
		const wrapper = renderNewSnippetButton({ showModal });
		wrapper.find('[type="button"]').simulate('click');
		expect(showModal).toHaveBeenCalled();
	})

})

// -------
function renderNewSnippetButton(props = {}) {
	const propsToUser = {
		showModal: () => { },
		...props,
	}

	return shallow(<NewSnippetButton {...propsToUser} />)
}