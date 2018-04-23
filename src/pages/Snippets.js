import React from 'react';

import Layout from '../components/Layout';
import SnippetWell from '../components/snippets/SnippetWell';
import NewSnippetButton from '../components/snippets/NewSnippetButton';
import NewSnippetModal from '../components/snippets/NewSnippetModal';

import { H4 } from '../styles/components';

class Snippets extends React.PureComponent {

	state = {
		modalOn: true,
		tags: [
			{ label: 'intro', value: 'intro' },
			{ label: 'bio', value: 'bio' },
			{ label: 'genOp', value: 'genOp' },
			{ label: 'statementOfNeed', value: 'statementOfNeed' },
		]
	}

	showModal = () => {
		this.setState({ modalOn: true })
	}

	hideModal = () => {
		this.setState({ modalOn: false })
	}

	addTag = (newTag) => {
		const tags = [...this.state.tags]
		tags.push(newTag)
		this.setState({ tags })
	}

	render() {

		const { location } = this.props;
		const { modalOn, tags } = this.state;

		return (
			<Layout location={location}>
				<SnippetWell />
				<NewSnippetButton showModal={this.showModal} />
				<NewSnippetModal modalOn={modalOn} hideModal={this.hideModal} tags={tags} addTag={this.addTag} />
			</Layout>
		)
	}
}

export default Snippets;