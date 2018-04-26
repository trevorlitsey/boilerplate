import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom'

import firebase from '../firebase';

import Layout from '../components/Layout';

const Wrapper = styled.div`
	margin: 50px auto;
	max-width: 500px;
	padding: 20px;
	border: 1px solid rgba(0,0,0,.22);

	& > h3 {
		text-decoration: underline;
	}

`

class Admin extends React.PureComponent {

	handleSubmit = (e) => {
		e.preventDefault();

		const { email, password } = this.refs;
		console.log({ email, password });


		firebase.auth().signInWithEmailAndPassword(email.value, password.value).catch((err) => {
			return console.error(err)
		});

		this.props.history.push('/')
	}

	render() {
		return (
			<Wrapper className="rounded">
				<h3>Admin</h3>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="email">Email address</label>
						<input ref="email" id="email" type="email" className="form-control" aria-describedby="email" placeholder="Enter email" />
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input ref="password" id="password" type="password" className="form-control" placeholder="Password" />
					</div>
					<button type="submit" className="btn btn-primary">Sign in</button>
				</form>
			</Wrapper>
		)
	}
}

export default Admin;