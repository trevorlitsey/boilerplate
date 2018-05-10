import React from 'react';
import { shallow } from 'enzyme';

import Spinner from '../shared/Spinner';
import Card from './Card';
import SnippetWell from './SnippetWell';

describe('SnippetWell', () => {

	it('should render without crashing', () => {
		const wrapper = renderSnippetWell();
		expect(wrapper).toMatchSnapshot();
	})

	it('should render spinner when loading', () => {
		const wrapper = renderSnippetWell({ loading: true });
		expect(wrapper.find(Spinner).length).toBe(1);
	})

	it('should let user know there are no snippets if none provided', () => {
		const wrapper = renderSnippetWell({ snippets: {} });
		expect(wrapper.find('h3').text()).toEqual('No Snippets Yet!');
	})

	it('should render correct number of snippets provided', () => {
		const snippets = getSnippets();
		const wrapper = renderSnippetWell({ snippets });
		expect(wrapper.find(Card).length).toEqual(Object.keys(snippets).length)
	})

	it('should filter snippets according to filterQuery', () => {
		const filterQuery = 'section two';
		const wrapper = renderSnippetWell({ filterQuery });
		expect(wrapper.find(Card).length).toEqual(1)
	})

})

// -------
function renderSnippetWell(props = {}) {
	const propsToUser = {
		snippets: getSnippets(),
		showModal: () => { },
		filterQuery: '',
		loading: false,
		...props,
	}

	return shallow(<SnippetWell {...propsToUser} />)
}

function getSnippets() {
	const snippets = {
		jghgygc9: {
			title: 'Section Two',
			text: 'Praesent aliquet placerat augue in varius. Sed lorem metus, gravida at lectus nec, egestas convallis ex. Suspendisse accumsan quam nec laoreet fermentum. Donec scelerisque in lorem non aliquet. Nunc vestibulum eleifend felis eget dignissim. Integer ullamcorper ipsum ac imperdiet varius. Maecenas cursus egestas neque, quis placerat enim dignissim eu. Integer ultrices aliquam metus eget faucibus. Vivamus lobortis turpis odio, sed sodales odio elementum nec. Mauris facilisis ipsum et ante porta accumsan. Quisque molestie maximus leo, id cursus odio porttitor mattis. Quisque eu porttitor justo. Ut facilisis pretium arcu, eget mollis sem mattis ut.',
			tags: [
				{ id: 'jgtv2988', label: 'lots', value: 'lots' },
				{ id: 'jgtv29wa', label: 'of', value: 'of' },
				{ id: 'jgtv1e21', label: 'tags', value: 'tags' },
			]
		},
		jgux6edn: {
			title: 'Section One',
			text: 'this is the first section',
			tags: [],
		},
		jguxf292: {
			title: 'Section Three',
			text: 'this is the third section',
			tags: [],
		},
		jgxvm7zr: {
			tags: [],
			text: 'this is the fourth section',
			title: 'Section Four!',
		}
	}
	return snippets;
}