import React from 'react';
import { shallow } from 'enzyme';

import Snippets from './Snippets';

describe('Snippets', () => {

	it('should render without crashing', () => {
		const wrapper = shallow(<Snippets />);
		expect(wrapper).toMatchSnapshot();
	})

	xit('should showModal', () => {
		// TODO
	})

	xit('should hideModal', () => {
		// TODO
	})

	xit('should addSnippet', () => {
		// TODO
	})

	xit('should updateSnippet', () => {
		// TODO
	})

	xit('should deleteSnippet', () => {
		// TODO
	})

	xit('should addTag', () => {
		// TODO
	})

	xit('should handleSearchChange', () => {
		// TODO
	})

})