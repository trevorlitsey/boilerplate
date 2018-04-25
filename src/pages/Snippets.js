import React from 'react';
import styled from 'styled-components';
import uniqid from 'uniqid';

import { db } from '../firebase';

import Layout from '../components/Layout';
import Spinner from '../components/shared/Spinner';
import SnippetWell from '../components/snippets/SnippetWell';
import NewSnippetButton from '../components/snippets/NewSnippetButton';
import SnippetModal from '../components/snippets/SnippetModal';

import { H4 } from '../styles/components';

class Snippets extends React.PureComponent {

	state = {
		loading: true,
		modalOn: false,
		snippets: {},
		tags: {},
		snippetToEdit: '',
	}

	componentWillMount = () => {
		const that = this;

		this.dbUnsubscribe = db.doc('users/trevor/')
			.onSnapshot((doc) => {
				const { snippets, tags } = doc.data();

				that.setState({
					snippets,
					tags,
					loading: false
				});
			});
	}

	componentWillUnmount = () => {
		this.dbUnsubscribe();
	}

	showModal = (e, snippetToEdit = '') => {
		this.setState({ snippetToEdit });
		this.setState({ modalOn: true })
	}

	hideModal = () => {
		this.setState({ modalOn: false })
	}

	addSnippet = (newSnippet, id = uniqid()) => {
		const snippets = { ...this.state.snippets }
		snippets[id] = newSnippet;
		db.doc('/users/trevor').set({ snippets }, { merge: true });
	}

	updateSnippet = (updatedSnippet) => {
		const { snippets, snippetToEdit } = { ...this.state }
		snippets[snippetToEdit] = updatedSnippet;
		db.doc('/users/trevor').set({ snippets }, { merge: true });
	}

	deleteSnippet = (id) => {
		const snippets = { ...this.state.snippets }
		delete snippets[id];
		db.doc('/users/trevor').set({ snippets }, { merge: true });
	}

	addTag = (newTag) => {
		const tags = [...this.state.tags];
		tags.push(newTag);
		db.doc('/users/trevor').set({ tags }, { merge: true });
	}

	render() {

		const { location } = this.props;
		const { loading, modalOn, snippets, tags, snippetToEdit } = this.state;

		if (loading) {
			return (
				<Layout location={location}>
					<Spinner />
				</Layout>
			)
		}

		return (
			<Layout location={location}>
				<SnippetWell
					snippets={snippets}
					showModal={this.showModal}
				/>
				<NewSnippetButton showModal={this.showModal} />
				<SnippetModal
					snippetToEdit={{ ...snippets[snippetToEdit], id: snippetToEdit } || {}}
					modalOn={modalOn}
					hideModal={this.hideModal}
					tags={tags}
					addTag={this.addTag}
					addSnippet={this.addSnippet}
					updateSnippet={this.updateSnippet}
					deleteSnippet={this.deleteSnippet}
				/>
			</Layout>
		)
	}
}

export default Snippets;