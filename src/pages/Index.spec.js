import React from 'react';
import { shallow } from 'enzyme';

import { dropResult, snippets, preview } from '../../sampleData';

import Index from './Index';

describe('Index', () => {

	it('should render without crashing', () => {
		const wrapper = renderIndex();
		expect(wrapper).toMatchSnapshot();
	})

	it('should handleDragEnd', () => {
		const instance = renderIndex().instance();
		instance.state = { preview, snippets }
		instance.dbRef = { set: jest.fn() }
		const result = dropResult;
		instance.handleDragEnd(result);
		expect(instance.dbRef.set).toHaveBeenCalledWith({ preview: instance.state.preview }, { merge: true });
	})

	it('should not handleDragEnd if no destnation given', () => {
		const instance = renderIndex().instance();
		instance.dbRef = { set: jest.fn() }
		const result = {}
		instance.handleDragEnd(result);
		expect(instance.dbRef.set).not.toHaveBeenCalled();
	})

	it('should hideJumbo in firestore when db ref', () => {
		const instance = renderIndex().instance();
		instance.dbRef = { set: jest.fn() }
		instance.hideJumbo();
		expect(instance.dbRef.set).toHaveBeenCalledWith({ shouldDisplayJumbo: false }, { merge: true });
	})

	it('should hideJumbo in state when NO db ref', () => {
		const instance = renderIndex().instance();
		instance.state.shouldDisplayJumbo = true;
		instance.hideJumbo();
		expect(instance.state.shouldDisplayJumbo).toBe(false);
	})

	it('should set blank state if no data available from firestore', () => {
		const instance = renderIndex().instance();
		instance.state.userLoaded = true;
		const expectedInitialState = {
			user: {},
			preview: {
				snippetOrder: [],
				draftOrder: [],
			},
			snippets: {},
			tags: [],
			shouldDisplayJumbo: true,
			userLoaded: true,
			dbLoaded: true,
			windowWidth: window.innerWidth,
		}
		const doc = {
			data: () => ({}),
		}
		instance.setStateFromFirebaseDoc(doc);
		expect(instance.state).toEqual(expectedInitialState);
	})

})


// ---------
function renderIndex() {
	return shallow(<Index />)
}