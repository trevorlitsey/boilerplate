import React from 'react';
import { shallow } from 'enzyme';
import wait from 'waait';

import { snippets, preview } from '../../../../sampleData';

import SnippetDragAndDrop, { ScrollContainer } from './PreviewDragAndDrop'

describe('SnippetDragAndDrop', () => {

	it('should display spinner if loading', () => {
		const wrapper = renderSnippetDragAndDrop({ loading: true });
		expect(wrapper.find('[data-test="loading"]').length).toBe(1);
		expect(wrapper).toMatchSnapshot()
	})

	it('should should say CLICK HERE TO ADD SNIPPETS if no order is given', () => {
		const wrapper = renderSnippetDragAndDrop({ snippetOrder: [] })
		expect(wrapper).toMatchSnapshot()
		expect(wrapper.find('[data-test="no-order"]').length).toBe(1);
	})

	// TODO: report bug for this test
	xit('should render snippet cards when order is given', async () => {
		const wrapper = renderSnippetDragAndDrop();
		expect(wrapper.find('[data-test="render-order"]').length).toBe(1);
		expect(wrapper).toMatchSnapshot()
	})

})

// -------
function renderSnippetDragAndDrop(props = {}) {
	const propsToUser = {
		snippets,
		snippetOrder: preview.snippetOrder,
		loading: false,
		...props,
	}

	return shallow(<SnippetDragAndDrop {...propsToUser} />)
}