import React from 'react';
import styled from 'styled-components';
import db from '../firebase';
import { DragDropContext } from 'react-beautiful-dnd';

import { reorder } from './helpers';

import Layout from '../components/Layout';
import SnippetDragAndDrop from '../components/SnippetDragAndDrop';
import Jumbotron from '../components/Jumbotron';
import PreviewDocument from '../components/PreviewDocument';
import PreviewDragAndDrop from '../components/PreviewDragAndDrop/PreviewDragAndDrop';

const Container = styled.div`
	display: grid;
	grid-gap: 4px;
	grid-template-columns: 1fr 3fr;
	
	& > * {
		max-height: 90vh;
		overflow-y: scroll;
	}
	`

const XScroll = styled.div`
	overflow-x: scroll;

`

const H4 = styled.h3`
	text-decoration: underline;
	margin-bottom: .75rem;
`

const getSnippets = (count) =>
	Array.from({ length: count }, (v, k) => k).map(k => ({
		id: `item-${k}`,
		title: `item ${k}`,
		content: 'Ut volutpat faucibus sapien, eget porttitor diam porta nec. Praesent elementum risus eget neque dignissim vehicula. Fusce a lectus sed felis vulputate molestie eget in ante. Vivamus in erat hendrerit, pretium turpis at, rutrum elit. Ut fringilla elementum ligula, non auctor lorem blandit et. Proin nisl leo, suscipit quis congue quis, fringilla vel nisl.',
		tags: ['one', 'two']
	}));

const getDraft = (count) =>
	Array.from({ length: count }, (v, k) => k).map(k => ({
		id: `item-${k + 20}`,
		title: `item ${k + 20}`,
		content: 'Ut volutpat faucibus sapien, eget porttitor diam porta nec. Praesent elementum risus eget neque dignissim vehicula. Fusce a lectus sed felis vulputate molestie eget in ante. Vivamus in erat hendrerit, pretium turpis at, rutrum elit. Ut fringilla elementum ligula, non auctor lorem blandit et. Proin nisl leo, suscipit quis congue quis, fringilla vel nisl.',
		tags: ['one', 'two']
	}));


class Index extends React.Component {

	state = {
		preview: {
			snippets: [],
			draft: [],
		},
		activeItemId: '0',
	}

	componentWillMount = () => {
		const that = this;
		this.dbUnsubscribe = db.collection('users').doc('trevor')
			.onSnapshot(function (doc) {
				const preview = Object.values(doc.data())[0];
				that.setState({ preview });
			});
	}

	componentWillUnmount = () => {
		this.dbUnsubscribe();
	}

	updateActive = (activeItemId) => {
		// don't bother if it's the same
		if (activeItemId !== this.state.activeItemId) {
			this.setState({ activeItemId })
		}
	}

	handleDragEnd = (result) => {
		// dropped outside the list
		if (!result.destination) return;

		const preview = reorder(this.state.preview, result);

		db.collection('users').doc('trevor').set({ preview });
	}

	render() {

		const { activeItemId, preview } = this.state;
		const { snippets, draft } = preview;

		return (
			<Layout>
				<Jumbotron />
				<DragDropContext onDragEnd={this.handleDragEnd}>
					<H4>Snippets</H4>
					<XScroll>
						<SnippetDragAndDrop snippets={snippets} />
					</XScroll>
					<H4>Preview</H4>
					<Container>
						<PreviewDragAndDrop draft={draft} activeItemId={activeItemId} />
						<PreviewDocument draft={draft} updateActive={this.updateActive} />
					</Container>
				</DragDropContext>
			</Layout>
		)
	}
}

export default Index;