import React from 'react';

import Layout from '../components/Layout';
import SnippetWell from '../components/snippets/SnippetWell';
import NewSnippetButton from '../components/snippets/NewSnippetButton';
import NewSnippetModal from '../components/snippets/NewSnippetModal';

import { H4 } from '../styles/components';

class Snippets extends React.PureComponent {

	state = {
		modalOn: false,
	}

	showModal = () => {
		this.setState({ modalOn: true })
	}

	hideModal = () => {
		this.setState({ modalOn: false })
	}

	render() {

		const { location } = this.props;
		const { modalOn } = this.state;

		return (
			<Layout location={location}>
				<SnippetWell />
				<NewSnippetButton showModal={this.showModal} />
				<NewSnippetModal modalOn={modalOn} hideModal={this.hideModal} />
			</Layout>
		)
	}
}

export default Snippets;