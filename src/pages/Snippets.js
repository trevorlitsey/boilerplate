import React from 'react';
import styled from 'styled-components';
import uniqid from 'uniqid';

import firebase, { db } from '../firebase';

import { Layout } from '../components/layout';
import { Spinner } from '../components/shared';
import { SearchBar, SnippetWell, NewSnippetButton, SnippetModal, SignInMessage } from '../components/snippets';

import { H4 } from '../styles/components';

class Snippets extends React.PureComponent {

	state = {
		user: this.props.user || {},
		modalOn: false,
		snippets: {},
		tags: [],
		snippetToEdit: '',
		filterQuery: '',
		userLoaded: this.props.userLoaded || false,
		dbLoaded: false,
	}

	componentDidMount = () => {

		firebase.auth().onAuthStateChanged((user) => {
			this.setState({ user, userLoaded: true });

			if (user) {
				this.dbRef = db.doc(`users/${user.uid}/`)
				this.dbUnsubscribe = this.dbRef
					.onSnapshot((doc) => {
						if (doc.data()) {
							const { snippets, tags } = doc.data();
							this.setState({ snippets, tags });
						}
						this.setState({ dbLoaded: true });
					});
			} else {
				this.dbUnsubscribe && this.dbUnsubscribe();
			}
		})
	}

	componentWillUnmount = () => {
		this.dbUnsubscribe && this.dbUnsubscribe();
		this.dbRef = null;
	}

	showModal = (e, snippetToEdit = '') => {
		this.setState({ modalOn: true, snippetToEdit })
	}

	hideModal = () => {
		this.setState({ modalOn: false, snippetToEdit: '' })
	}

	addSnippet = (newSnippet, id = uniqid()) => {
		const snippets = { ...this.state.snippets }
		snippets[id] = newSnippet;
		this.dbRef.set({ snippets }, { merge: true });
	}

	updateSnippet = (updatedSnippet) => {
		const { snippets, snippetToEdit } = { ...this.state }
		snippets[snippetToEdit] = updatedSnippet;
		this.dbRef.set({ snippets }, { merge: true });
	}

	deleteSnippet = (id) => {
		const snippets = { ...this.state.snippets }
		delete snippets[id];
		this.hideModal();
		this.dbRef.update({ snippets: firebase.firestore.FieldValue.delete() }); // make sure that fucker is gone...

		if (Object.keys(snippets)) {
			this.dbRef.set({ snippets }, { merge: true });
		}
	}

	addTag = (newTag, id = uniqid()) => {
		const tags = [...this.state.tags];
		newTag.id = id;
		tags.push(newTag);
		this.dbRef.set({ tags }, { merge: true });
	}

	handleSearchChange = (e) => {
		this.setState({ filterQuery: e.target.value.toLowerCase() });
	}

	render() {

		const { location } = this.props;
		const {
			modalOn,
			snippets,
			tags,
			snippetToEdit,
			user,
			filterQuery,
			userLoaded,
			dbLoaded } = this.state;

		if (!userLoaded) {
			return (
				<Layout location={location} data-test="loading">
					<Spinner />
				</Layout>
			)
		}

		if (userLoaded && (!user || !Object.keys(user).length)) {
			return (
				<Layout location={location} user={user}>
					<SignInMessage />
				</Layout>
			)
		}

		return (
			<Layout location={location} user={user} data-test="render-page">
				<SearchBar onChange={this.handleSearchChange} />
				<SnippetWell
					snippets={snippets}
					filterQuery={filterQuery}
					showModal={this.showModal}
					loading={!dbLoaded}
				/>
				<NewSnippetButton showModal={this.showModal} />
				<SnippetModal
					snippetToEdit={snippetToEdit && snippets ? { ...snippets[snippetToEdit], id: snippetToEdit } : {}}
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