import React from 'react';
import styled from 'styled-components';
import { db } from '../firebase';
import { DragDropContext } from 'react-beautiful-dnd';

import { reorder, processPreview, generateTextFromDraft, downloadDocument } from './helpers';
import { H4 } from '../styles/components';

import Layout from '../components/Layout';
import Spinner from '../components/shared/Spinner';
import SnippetDragAndDrop from '../components/preview/dragAndDrop/SnippetDragAndDrop';
import Jumbotron from '../components/preview/Jumbotron';
import Document from '../components/preview/Document';
import PreviewDragAndDrop from '../components/preview/dragAndDrop/PreviewDragAndDrop';

const Container = styled.div`
	display: grid;
	grid-gap: 10px;
	grid-template-columns: 1fr 3fr;
	min-height: 500px;
	
	@media (max-width: 600px) {
		display: block;

		& > * {
			margin: 20px 0;
		}

	}

`

class Index extends React.Component {

	state = {
		preview: {
			snippetOrder: [],
			draftOrder: [],
		},
		snippets: {},
		activeItemId: '0',
		shouldDisplayJumbo: true,
		loading: true,
	}

	componentWillMount = () => {
		const that = this;

		this.dbUnsubscribe = db.doc('users/trevor/')
			.onSnapshot((doc) => {
				const { preview, snippets, tags, shouldDisplayJumbo } = doc.data();

				const { snippetOrder, draftOrder } = processPreview(preview, snippets);

				that.setState({
					preview: {
						snippetOrder: snippetOrder || [],
						draftOrder: draftOrder || [],
					},
					snippets,
					tags,
					shouldDisplayJumbo: shouldDisplayJumbo === true,
					loading: false
				});
			});
	}

	componentWillUnmount = () => {
		this.dbUnsubscribe();
	}

	hideJumbo = () => {
		db.doc('/users/trevor').set({ shouldDisplayJumbo: false }, { merge: true });
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

		db.doc('/users/trevor').set({ preview }, { merge: true });
	}

	handleDownLoad = () => {
		const { snippets, preview } = { ...this.state }

		if (!snippets || !preview.draftOrder) return; // just in case

		const text = generateTextFromDraft(snippets, preview.draftOrder);
		downloadDocument('document.txt', text)
	}

	render() {

		const { location, user } = this.props;
		const { activeItemId, snippets, preview, loading, shouldDisplayJumbo } = this.state;
		const { snippetOrder, draftOrder } = preview;

		if (loading) {
			return (
				<Layout location={location}>
					<Spinner />
				</Layout>
			)
		}

		return (
			<Layout location={location} user={user}>
				<Jumbotron
					shouldDisplayJumbo={shouldDisplayJumbo}
					hideJumbo={this.hideJumbo}
					handleDownLoad={this.handleDownLoad}
				/>
				<DragDropContext onDragEnd={this.handleDragEnd}>
					<H4>Snippets</H4>
					<SnippetDragAndDrop snippets={snippets} snippetOrder={snippetOrder} />
					<H4>Preview</H4>
					<Container>
						<PreviewDragAndDrop snippets={snippets} draftOrder={draftOrder} activeItemId={activeItemId} />
						<Document snippets={snippets} draftOrder={draftOrder} updateActive={this.updateActive} />
					</Container>
				</DragDropContext>
			</Layout>
		)
	}
}

export default Index;