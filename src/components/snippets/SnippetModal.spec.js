import React from 'react';
import { shallow } from 'enzyme';

import { snippet, tags } from '../../../sampleData';

import SnippetModal from './SnippetModal';

describe('SnippetModal', () => {

	it('should render without crashing', () => {
		const wrapper = renderSnippetModal();
		expect(wrapper).toMatchSnapshot();
	})

	it('should handleSelectChange', () => {
		const instance = renderSnippetModal().instance();
		const newSelectedTags = [
			{ id: 'jghfzncs', label: 'one', value: 'one' },
			{ id: '23rdisjh', label: 'two', value: 'two' }
		]
		instance.handleSelectChange(newSelectedTags)
		expect(instance.state.selectedTags).toEqual(newSelectedTags);
	})

	it('should handleSelectCreate', () => {
		const addTag = jest.fn();
		const instance = renderSnippetModal({ addTag }).instance();
		const newTag = {
			label: 'new tag',
			value: 'new tag',
		}
		instance.handleSelectCreate(newTag);
		expect(addTag).toHaveBeenCalledWith(newTag);
	})

	it('should handleDelete', () => {
		const idToDelete = '7678iu2js';
		const snippetToEdit = {
			...snippet,
			id: idToDelete,
		}
		const deleteSnippet = jest.fn();
		const instance = renderSnippetModal({ deleteSnippet, snippetToEdit }).instance();
		instance.handleDelete();
		expect(deleteSnippet).toHaveBeenCalledWith(idToDelete);
	})

	it('should handleSubmit and call updateSnippet if there is a snippet to edit', () => {
		const props = {
			hideModal: jest.fn(),
			updateSnippet: jest.fn(),
			addSnippet: jest.fn(),
			snippetToEdit: {
				title: 'this is a title!',
				text: 'this is some text!',
				tags: [
					{ id: 'jghfzncs', label: 'one', value: 'one' },
					{ id: '23rdisjh', label: 'two', value: 'two' },
				],
			},
		}
		const instance = renderSnippetModal(props).instance();

		const refs = {
			title: {
				value: props.snippetToEdit.title,
			},
			text: {
				value: props.snippetToEdit.text,
			}
		}

		instance.refs = refs;

		const event = { preventDefault: jest.fn() }

		instance.handleSubmit(event);

		expect(event.preventDefault).toHaveBeenCalled();
		expect(props.updateSnippet).toHaveBeenCalledWith(props.snippetToEdit);
		expect(props.addSnippet).not.toHaveBeenCalled();
		expect(props.hideModal).toHaveBeenCalled();

	})

	it('should handleSubmit and call add snippet if no snippetToEdit', () => {
		const props = {
			snippetToEdit: {},
			hideModal: jest.fn(),
			updateSnippet: jest.fn(),
			addSnippet: jest.fn(),
		}
		const instance = renderSnippetModal(props).instance();

		const snippetToAdd = {
			title: 'this is a title!',
			text: 'this is some text!',
			tags: [],
		}

		const refs = {
			title: {
				value: snippetToAdd.title,
			},
			text: {
				value: snippetToAdd.text,
			}
		}

		instance.refs = refs;

		const event = { preventDefault: jest.fn() }

		instance.handleSubmit(event);

		expect(event.preventDefault).toHaveBeenCalled();
		expect(props.addSnippet).toHaveBeenCalledWith(snippetToAdd);
		expect(props.updateSnippet).not.toHaveBeenCalled();
		expect(props.hideModal).toHaveBeenCalled();
	})

	it('should display alertText if missing title', () => {
		const props = {
			snippetToEdit: {},
			hideModal: jest.fn(),
			updateSnippet: jest.fn(),
			addSnippet: jest.fn(),
		}

		const instance = renderSnippetModal(props).instance();

		const refs = {
			title: {
				value: 'this is a title!',
			},
			text: {
				value: '',
			},
		}

		instance.refs = refs;

		instance.handleSubmit({ preventDefault: () => { } });

		expect(instance.state.alertText).toBe('please provide a title and text!')
		expect(props.addSnippet).not.toHaveBeenCalled();
		expect(props.updateSnippet).not.toHaveBeenCalled();
		expect(props.hideModal).not.toHaveBeenCalled();
	})

	it('should display alertText if missing text', () => {
		const props = {
			snippetToEdit: {},
			hideModal: jest.fn(),
			updateSnippet: jest.fn(),
			addSnippet: jest.fn(),
		}

		const instance = renderSnippetModal(props).instance();

		const refs = {
			title: {
				value: '',
			},
			text: {
				value: 'this is some text!',
			},
		}

		instance.refs = refs;

		instance.handleSubmit({ preventDefault: () => { } });

		expect(instance.state.alertText).toBe('please provide a title and text!')
		expect(props.addSnippet).not.toHaveBeenCalled();
		expect(props.updateSnippet).not.toHaveBeenCalled();
		expect(props.hideModal).not.toHaveBeenCalled();
	})

	it('should clearForm', () => {
		const instance = renderSnippetModal().instance();

		const title = 'this is a title!';
		const text = 'this is some text!';
		const alertText = 'I should be deleted!';
		const refs = {
			title: { value: title },
			text: { value: text },
		}
		const tags = [
			{ id: 'jghfzncs', label: 'one', value: 'one' },
			{ id: '23rdisjh', label: 'two', value: 'two' },
		]

		instance.refs = refs;
		instance.state.selectedTags = tags;
		instance.state.alertText = alertText;

		expect(instance.state.selectedTags).toEqual(tags);
		expect(instance.state.alertText).toEqual(alertText);
		expect(instance.refs.title.value).toEqual(title);
		expect(instance.refs.text.value).toEqual(text);

		instance.clearForm(); // g'bye

		expect(instance.state.selectedTags).toEqual([]);
		expect(instance.state.alertText).toEqual('');
		expect(instance.refs.title.value).toEqual('');
		expect(instance.refs.text.value).toEqual('');

	})

})

// ---------
function renderSnippetModal(props = {}) {
	const propsToUser = {
		snippetToEdit: snippet,
		modalOn: true,
		hideModal: () => { },
		tags,
		addTag: () => { },
		addSnippet: () => { },
		updateSnippet: () => { },
		testing: true,
		...props,
	}

	return shallow(<SnippetModal {...propsToUser} />)
}