import React from 'react';
import { shallow } from 'enzyme';

import Card, { Tag } from './Card';

describe('Card', () => {

	it('should render without crashing', () => {
		const wrapper = renderCard({ isActive: false });
		expect(wrapper).toMatchSnapshot();
	})

	it('should display title', () => {
		const title = 'this is the title';
		const wrapper = renderCard({ title });
		expect(wrapper.find('.card-title').text()).toBe(title);
	})

	it('should ellipsize text if > 80 characters', () => {
		const longText = Array.from({ length: 81 }, item => 'a').join('');
		const wrapper = renderCard({ text: longText });
		expect(wrapper.find('.card-text').text()).toContain('...');
	})

	it('should display all text if <= 80 characters', () => {
		const almostLongText = Array.from({ length: 80 }, item => 'a').join('');
		const wrapper = renderCard({ text: almostLongText });
		expect(wrapper.find('.card-text').text()).toEqual(almostLongText);
		expect(wrapper.find('.card-text').text()).not.toContain('...');
	})

	it('should display correct number of tags given', () => {
		const tags = [
			{ id: 'jgtv2988', label: 'so', value: 'so' },
			{ id: 'jgtv29wa', label: 'many', value: 'many' },
			{ id: 'jgtv1e21', label: 'tagz', value: 'tagz' },
		]
		const wrapper = renderCard({ tags });
		expect(wrapper.find(Tag).length).toEqual(tags.length)
	})

	it('should call showModal on edit click', () => {
		const showModal = jest.fn();
		const id = 'id'
		const wrapper = renderCard({ showModal, id });
		wrapper.find('a').simulate('click');
		expect(showModal).toHaveBeenCalledWith(null, id);
	})

})

describe('Tag', () => {

	it('should display value given', () => {
		const value = 'what a value!';
		const wrapper = renderTag({ value });
		expect(wrapper.text()).toEqual(value);
	})

})

// -------
function renderCard(props = {}) {
	const propsToUser = {
		title: 'TITLE!',
		text: 'TEXT!',
		tags: [
			{ id: 'jgtv2988', label: 'lots', value: 'lots' },
			{ id: 'jgtv29wa', label: 'of', value: 'of' },
			{ id: 'jgtv1e21', label: 'tags', value: 'tags' },
		],
		id: '567y2hs7',
		overrideStyles: {},
		isActive: false,
		showModal: () => { },
		...props,
	}

	return shallow(<Card {...propsToUser} />)
}

function renderTag(props = {}) {
	const propsToUser = {
		value: 'this is the value',
		...props,
	}

	return shallow(<Tag {...propsToUser} />)
}