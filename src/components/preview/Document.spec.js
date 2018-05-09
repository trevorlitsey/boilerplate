import React from 'react';
import { shallow } from 'enzyme';

import { snippets, preview } from '../../../sampleData';
import { Spinner } from '../shared';
import Section from './Section';
import Document from './Document';

describe('Document', () => {

	it('should render spinner when loading', () => {
		const wrapper = renderDocument({ loading: true });
		expect(wrapper.find(Spinner).length).toBe(1);
	})

	it('should NOT render spinner when NOT loading', () => {
		const wrapper = renderDocument({ loading: false });
		expect(wrapper.find(Spinner).length).toBe(0);
	})

	it('should render placeholder if no draftOrder given', () => {
		const wrapper = renderDocument({ draftOrder: [] });
		expect(wrapper.find('[data-test="placeholder"]').length).toBe(1);
	})

	it('should render correct sections from draftOrder', () => {
		const wrapper = renderDocument();
		expect(wrapper.find(Section).length).toEqual(preview.draftOrder.length);
	})

})

// -------
function renderDocument(props = {}) {
	const propsToUser = {
		snippets,
		draftOrder: preview.draftOrder,
		loading: false,
		...props,
	}
	return shallow(<Document {...propsToUser} />);
}