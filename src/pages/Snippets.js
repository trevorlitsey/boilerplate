import React from 'react';
import styled from 'styled-components';
import uniqid from 'uniqid';

import db from '../firebase';

import Layout from '../components/Layout';
import Spinner from '../components/shared/Spinner';
import SnippetWell from '../components/snippets/SnippetWell';
import NewSnippetButton from '../components/snippets/NewSnippetButton';
import NewSnippetModal from '../components/snippets/NewSnippetModal';

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

		// snippets
		this.snippetUnsubscribe = db.collection('users/trevor/snippets')
			.onSnapshot((snapshot) => {
				const snippets = snapshot.docs.map(snap => (
					{
						...snap.data(),
						id: snap.id,
					}
				));
				that.setState({
					snippets,
					loading: false
				});
			});

		// tags
		this.tagsUnsubscribe = db.collection('users/trevor/tags')
			.onSnapshot((snapshot) => {
				const tags = snapshot.docs.map(snap => (
					{
						...snap.data(),
						id: snap.id
					}
				));
				that.setState({
					tags,
					loading: false
				});
			});
	}

	componentWillUnmount = () => {
		this.snippetUnsubscribe();
		this.tagsUnsubscribe();
	}

	showModal = (snippetToEdit = '') => {
		this.setState({ snippetToEdit });
		this.setState({ modalOn: true })
	}

	hideModal = () => {
		this.setState({ modalOn: false })
	}

	addSnippet = (newSnippet, id = uniqid()) => {
		db.doc(`users/trevor/snippets/${id}`).set(newSnippet);
	}

	updateSnippet = (updatedSnippet) => {
		const { snippetToEdit } = this.state;
		db.doc(`users/trevor/snippets/${snippetToEdit}`).update(updatedSnippet);
	}

	addTag = (newTag) => {
		db.collection('users/trevor/tags').add(newTag);
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
				<NewSnippetModal
					snippetToEdit={snippets.find(snip => snip.id === snippetToEdit) || {}}
					modalOn={modalOn}
					hideModal={this.hideModal}
					tags={tags}
					addTag={this.addTag}
					addSnippet={this.addSnippet}
					updateSnippet={this.updateSnippet}
				/>
			</Layout>
		)
	}
}

export default Snippets;