import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Jumbotron from '../components/Jumbotron';
import Preview from '../components/Preview';
import DragAndDrop from '../components/DragAndDrop';

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;

	& > * {
		max-height: 800px;
		overflow-y: scroll;
	}

`

// fake data generator
const getItems = count =>
	Array.from({ length: count }, (v, k) => k).map(k => ({
		id: `item-${k}`,
		title: `item ${k}`,
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget diam sodales diam mollis egestas. Duis faucibus metus nulla, nec vulputate orci molestie a. Mauris ut blandit erat, non interdum ipsum. Nullam risus nunc, fermentum vulputate feugiat laoreet, consectetur eget libero. Sed vitae rhoncus eros. In hac habitasse platea dictumst. Cras vulputate dapibus pharetra. Mauris pretium metus ac fermentum dictum. Sed consequat auctor eleifend. Maecenas et libero nec ante aliquam condimentum. Aenean non dolor libero. Quisque porta semper lectus vitae suscipit.',
	}));

class Index extends React.Component {

	state = {
		snippets: [],
		preview: getItems(10),
		activeItemId: 'item-0',
	}

	updatePreview = (preview) => {
		this.setState({ preview })
	}

	updateActive = (activeItemId) => {
		// don't bother if it's the same
		if (activeItemId !== this.state.activeItemId) {
			this.setState({ activeItemId })
		}
	}

	render() {

		const { preview, activeItemId } = this.state;

		return (
			<Layout>
				<Jumbotron />
				<Container>
					<DragAndDrop preview={preview} updatePreview={this.updatePreview} activeItemId={activeItemId} />
					<Preview preview={preview} updateActive={this.updateActive} />
				</Container>
			</Layout>
		)
	}
}

export default Index;