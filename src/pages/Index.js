import React from 'react';
import styled from 'styled-components';
import db from '../firebase';
import { DragDropContext } from 'react-beautiful-dnd';

import { reorder } from './helpers';
import { H4 } from '../styles/components';

import Layout from '../components/Layout';
import SnippetDragAndDrop from '../components/preview/dragAndDrop/SnippetDragAndDrop';
import Jumbotron from '../components/preview/Jumbotron';
import Document from '../components/preview/Document';
import PreviewDragAndDrop from '../components/preview/dragAndDrop/PreviewDragAndDrop';

const Container = styled.div`
	display: grid;
	grid-gap: 10px;
	grid-template-columns: 1fr 3fr;
	
	& > * {
		height: 90vh;
		overflow-y: scroll;
	}
	`

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
			.onSnapshot((doc) => {
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

		const { location } = this.props;
		const { activeItemId, preview } = this.state;
		const { snippets, draft } = preview;

		return (
			<Layout location={location}>
				<Jumbotron />
				<DragDropContext onDragEnd={this.handleDragEnd}>
					<H4>Snippets</H4>
					<SnippetDragAndDrop snippets={snippets} />
					<H4>Preview</H4>
					<Container>
						<PreviewDragAndDrop draft={draft} activeItemId={activeItemId} />
						<Document draft={draft} updateActive={this.updateActive} />
					</Container>
				</DragDropContext>
			</Layout>
		)
	}
}

export default Index;