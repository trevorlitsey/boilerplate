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
		shouldDisplayJumbo: true,
		userLoaded: false,
		dbLoaded: false,
		windowWidth: window.innerWidth,
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
				this.dbUnsubscribe && this.dbUnsubscribe();
				this.setState({
					preview: {
						snippetOrder: [],
						draftOrder: [],
					},
					snippets: {},
					tags: [],
					dbLoaded: true
				})
			}

		});

		// listen for window sizing
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount = () => {
		window.removeEventListener('resize', this.updateWindowDimensions);
		this.dbUnsubscribe && this.dbUnsubscribe();
		this.dbRef = null;
	}

	updateWindowDimensions = () => {
		this.setState({ windowWidth: window.innerWidth })
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

	render() {

		const { location } = this.props;
		const { activeItemId,
			snippets,
			preview,
			loading,
			shouldDisplayJumbo,
			userLoaded,
			user,
			dbLoaded,
			windowWidth } = this.state;

		const { snippetOrder, draftOrder } = preview;

		const textForDownload = generateTextFromDraft(snippets, draftOrder)

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
					shouldDisplayJumbo={shouldDisplayJumbo && windowWidth >= 576}
					hideJumbo={this.hideJumbo}
					text={textForDownload}
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