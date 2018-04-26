import React from 'react';
import styled from 'styled-components';
import uniqid from 'uniqid';

import firebase, { db } from '../firebase';

import Layout from '../components/Layout';
import Spinner from '../components/shared/Spinner';
import SignInForm from '../components/shared/SignInForm';
import SnippetWell from '../components/snippets/SnippetWell';
import NewSnippetButton from '../components/snippets/NewSnippetButton';
import SnippetModal from '../components/snippets/SnippetModal';

import { H4 } from '../styles/components';

class Snippets extends React.PureComponent {

	state = {
		user: {},
		loading: true,
		modalOn: false,
		snippets: {},
		tags: [],
		snippetToEdit: '',
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

						if (doc.data()) {
							this.setState({ ...doc.data(), dbLoaded: true });
						}

					});
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
		this.dbRef.set({ snippets }, { merge: true });
	}

	addTag = (newTag, id = uniqid()) => {
		const tags = [...this.state.tags];
		newTag.id = id;
		tags.push(newTag);
		this.dbRef.set({ tags }, { merge: true });
	}

	render() {

		const { location } = this.props;
		const { loading, modalOn, snippets, tags, snippetToEdit, user, userLoaded, dbLoaded } = this.state;

		if (!userLoaded || (userLoaded && user && !dbLoaded)) {
			return (
				<Layout location={location}>
					<Spinner />
				</Layout>
			)
		}

		if (userLoaded && !user) {
			return (
				<Layout location={location} user={user}>
					<SignInForm />
				</Layout>
			)
		}

		return (
			<Layout location={location} user={user}>
				<SnippetWell
					snippets={snippets}
					showModal={this.showModal}
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