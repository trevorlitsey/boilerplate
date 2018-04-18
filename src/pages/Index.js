import React from 'react';
import styled from 'styled-components';
import db from '../firebase';

import Layout from '../components/Layout';
import SnippetWell from '../components/SnippetWell';
import Jumbotron from '../components/Jumbotron';
import Preview from '../components/Preview';
import DragAndDrop from '../components/DragAndDrop/DragAndDrop';

const Container = styled.div`
	display: grid;
	grid-gap: 4px;
	grid-template-columns: 1fr 3fr;
	
	& > * {
		max-height: 90vh;
		overflow-y: scroll;
	}

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


class Index extends React.Component {

	state = {
		snippets: getSnippets(10),
		preview: [],
		activeItemId: '0',
	}

	componentWillMount = () => {
		const that = this;
		db.collection('users').doc('trevor')
			.onSnapshot(function (doc) {
				const preview = Object.values(doc.data())[0];
				that.setState({ preview });
			});
	}

	updatePreview = (preview) => {
		db.collection('users').doc('trevor').set({ preview });
	}

	updateActive = (activeItemId) => {
		// don't bother if it's the same
		if (activeItemId !== this.state.activeItemId) {
			this.setState({ activeItemId })
		}
	}

	render() {

		const { snippets, preview, activeItemId } = this.state;

		return (
			<Layout>
				<Jumbotron />
				<SnippetWell snippets={snippets} />
				<H4>Preview</H4>
				<Container>
					<DragAndDrop preview={preview} updatePreview={this.updatePreview} activeItemId={activeItemId} />
					<Preview preview={preview} updateActive={this.updateActive} />
				</Container>
			</Layout>
		)
	}
}

export default Index;