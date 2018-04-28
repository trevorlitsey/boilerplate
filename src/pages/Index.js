import React from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import firebase, { db } from '../firebase';
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

class Index extends React.PureComponent {

	state = {
		user: {},
		preview: {
			snippetOrder: [],
			draftOrder: [],
		},
		snippets: {},
		tags: [],
		activeItemId: '0',
		shouldDisplayJumbo: true,
		userLoaded: false,
		dbLoaded: false,
	}

	componentDidMount = () => {

		firebase.auth().onAuthStateChanged((user) => {

			this.setState({ user, userLoaded: true });

			if (user) {

				this.dbRef = db.doc(`users/${user.uid}/`)

				this.dbUnsubscribe = this.dbRef
					.onSnapshot((doc) => {
						this.setPreviewStateFromFirebaseDoc(doc)
					});
			} else {
				this.setState({ dbLoaded: true })
			}

		});
	}

	componentWillUnmount = () => {
		this.dbUnsubscribe && this.dbUnsubscribe();
		this.dbRef = null;
	}

	setPreviewStateFromFirebaseDoc = (doc) => {
		const { preview, snippets } = doc.data();
		const { snippetOrder, draftOrder } = processPreview(preview, snippets);

		const state = {
			...doc.data(),
			preview: {
				snippetOrder: snippetOrder || [],
				draftOrder: draftOrder || [],
			}
		}
		this.setState({ ...state, dbLoaded: true });
	}

	hideJumbo = () => {
		if (this.dbRef) {
			this.dbRef.set({ shouldDisplayJumbo: false }, { merge: true });
		} else {
			this.setState({ shouldDisplayJumbo: false });
		}
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

		this.dbRef.set({ preview }, { merge: true });
	}

	handleDownLoad = () => {
		const { snippets, preview } = { ...this.state }

		if (!snippets || !preview.draftOrder) return; // just in case

		const text = generateTextFromDraft(snippets, preview.draftOrder);
		downloadDocument('document.txt', text)
	}

	render() {

		const { location } = this.props;
		const { activeItemId, snippets, preview, loading, shouldDisplayJumbo, userLoaded, user, dbLoaded } = this.state;
		const { snippetOrder, draftOrder } = preview;

		if (!userLoaded) {
			return (
				<Layout location={location} user={user}>
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
					loading={!dbLoaded}
				/>
				<DragDropContext onDragEnd={this.handleDragEnd}>
					<H4>Snippets</H4>
					<SnippetDragAndDrop snippets={snippets} snippetOrder={snippetOrder} loading={!dbLoaded} />
					<H4>Preview</H4>
					<Container>
						<PreviewDragAndDrop snippets={snippets} draftOrder={draftOrder} activeItemId={activeItemId} loading={!dbLoaded} />
						<Document snippets={snippets} draftOrder={draftOrder} updateActive={this.updateActive} loading={!dbLoaded} />
					</Container>
				</DragDropContext>
			</Layout>
		)
	}
}

export default Index;