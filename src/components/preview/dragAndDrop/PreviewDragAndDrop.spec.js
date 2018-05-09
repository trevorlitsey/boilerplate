import React from 'react';
import { shallow } from 'enzyme';

import { snippets, preview } from '../../../../sampleData';

import PreviewDragAndDrop from './PreviewDragAndDrop';

describe('PreviewDragAndDrop', () => {

	it('should display spinner if loading', () => {
		const wrapper = renderPreviewDragAndDrop({ loading: true });
		expect(wrapper.find('[data-test="loading"]').length).toBe(1);
		expect(wrapper).toMatchSnapshot()
	})

	it('should should say DRAG SNIPPETS HERE if no order is given', () => {
		const wrapper = renderPreviewDragAndDrop({ draftOrder: [] })
		expect(wrapper.find('[data-test="no-order"]').length).toBe(1);
		expect(wrapper).toMatchSnapshot()
	})

	it('should render snippet cards when order is given', () => {
		const wrapper = renderPreviewDragAndDrop();
		expect(wrapper.find('[data-test="render-order"]').length).toBe(1);
		expect(wrapper).toMatchSnapshot()
	})

})


// -------
function renderPreviewDragAndDrop(props = {}) {
	const propsToUser = {
		snippets,
		draftOrder: preview.draftOrder,
		loading: false,
		...props,
	}

	return shallow(<PreviewDragAndDrop {...propsToUser} />)
}