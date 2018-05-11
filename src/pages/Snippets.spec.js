import React from 'react';
import { shallow } from 'enzyme';
import uniqId from 'uniqid';

import { tags } from '../../sampleData';

import { SignInMessage, SnippetWell } from '../components/snippets';
import Snippets from './Snippets';

describe('Snippets', () => {

	it('should render show spinner if user is loading', () => {
		const wrapper = renderSnippets({ userLoaded: false });
		expect(wrapper.find('[data-test="loading"]')).toHaveLength(1);
		expect(wrapper).toMatchSnapshot();
	})

	it('should display signIn message if user is not logged in', () => {
		const props = { userLoaded: true, user: null }
		const wrapper = renderSnippets(props);
		expect(wrapper.find(SignInMessage)).toHaveLength(1);
		expect(wrapper).toMatchSnapshot();
	})

	it('should render page if user is signed in', () => {
		const props = {
			userLoaded: true,
			user: { uid: '57uhs2whsjj' },
		}
		const wrapper = renderSnippets(props);
		expect(wrapper.find(SnippetWell)).toHaveLength(1);
		expect(wrapper).toMatchSnapshot();
	})

	it('should showModal', () => {
		const instance = renderSnippets().instance();
		expect(instance.state.modalOn).toBe(false);
		instance.showModal()
		expect(instance.state.modalOn).toBe(true);
	})

	it('should hideModal', () => {
		const instance = renderSnippets().instance();
		instance.setState({ modalOn: true })
		expect(instance.state.modalOn).toBe(true);
		instance.hideModal()
		expect(instance.state.modalOn).toBe(false);
	})

	it('should addSnippet', () => {
		const instance = renderSnippets().instance();
		instance.dbRef = { set: jest.fn() }
		const newSnippet = { title: 'this is a title', text: 'this is some text' }
		const id = uniqId();
		instance.addSnippet(newSnippet, id);

		const expectedSnippets = {
			[id]: newSnippet,
		}
		expect(instance.dbRef.set).toHaveBeenCalledWith({ snippets: expectedSnippets }, { merge: true })
	})

	it('should updateSnippet', () => {
		// setup
		const instance = renderSnippets().instance();
		instance.dbRef = { set: jest.fn() };
		const snippetToEdit = '276tghns'
		const snippets = { [snippetToEdit]: { title: 'what a title', text: 'what a text' } };
		instance.setState({ snippets, snippetToEdit });

		// confirm setup
		expect(instance.state.snippets).toEqual(snippets);

		// update
		const newTitle = 'this is the new title';
		const updatedSnippet = { title: newTitle, text: 'what a text' }
		instance.updateSnippet(updatedSnippet);

		// expect
		const expectedUpdatedSnippets = { [snippetToEdit]: updatedSnippet };
		expect(instance.dbRef.set).toHaveBeenCalledWith({ snippets: expectedUpdatedSnippets }, { merge: true })
	})

	it('should deleteSnippet', () => {
		// setup
		const instance = renderSnippets().instance();
		instance.dbRef = { update: jest.fn(), set: jest.fn() }
		const idToDelete = '87uhsjs';
		const snippets = { [idToDelete]: { title: 'what a title', text: 'what a text' } }
		instance.setState({ snippets });

		// confirm setup
		expect(instance.state.snippets).toEqual(snippets)

		// delete
		instance.deleteSnippet(idToDelete);

		// expect
		expect(instance.dbRef.update).toHaveBeenCalled();
		expect(instance.dbRef.set).toHaveBeenCalledWith({ snippets: {} }, { merge: true });
	})

	it('should addTag', () => {
		// setup
		const instance = renderSnippets().instance();
		instance.dbRef = { set: jest.fn() }
		instance.setState({ tags });
		const id = uniqId();
		const newTag = { id, label: 'new tag!', value: 'new tag!' }

		// add tag
		instance.addTag(newTag, id);

		// expect
		instance.state.tags.push(newTag); // TODO, find a better way to do this
		expect(instance.state.tags).toHaveLength(4);
		expect(instance.dbRef.set).toHaveBeenCalledWith({ tags: instance.state.tags }, { merge: true })
	})

	it('should handleSearchChange', () => {
		// setup
		const instance = renderSnippets().instance();
		const newFilterQuery = 'this is a search query';
		const event = { target: { value: newFilterQuery } }

		// update
		instance.handleSearchChange(event);

		//expect
		expect(instance.state.filterQuery).toBe(newFilterQuery)
	})

})

// ---------
function renderSnippets(props = {}) {
	const propsToUser = {
		user: { uid: '2767ushs' },
		userLoaded: true,
		...props,
	}

	return shallow(<Snippets {...propsToUser} />)
}