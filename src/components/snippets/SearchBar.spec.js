import React from 'react';
import { shallow } from 'enzyme';

import SearchBar from './SearchBar';

describe('SearchBar', () => {

	it('should render without crashing', () => {
		const wrapper = renderSearchBar();
		expect(wrapper).toMatchSnapshot();
	})

	it('should call onChange when user types', () => {
		const onChange = jest.fn();
		const wrapper = renderSearchBar({ onChange });
		const event = {
			target: {
				value: 'Hello'
			}
		};
		wrapper.find('input').simulate('change', event)
		expect(onChange).toHaveBeenCalledWith(event);
	})

})

// ---------
function renderSearchBar(props = {}) {
	const propsToUser = {
		onChange: () => { },
		...props,
	}

	return shallow(<SearchBar {...propsToUser} />)
}