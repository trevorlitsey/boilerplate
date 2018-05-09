import React from 'react';
import { bool, func, string } from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import Spinner from '../shared/Spinner';

const Container = styled.div`

	&.jumbotron {
		padding: 1rem;
	}

	& > .flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		& > p {
			margin: 0 40px 0 0;
		}
	}
	
	
	@media (max-width: 680px) {
		& > .flex {
			display: block;

				& > p {
					margin: 0 0 10px;
				}
			}
		}
`

const Jumbotron = (props) => {

	const { shouldDisplayJumbo, hideJumbo, text, loading } = props;

	const downloadButton = (
		<a
			className="btn btn-primary btn-lg"
			href={'data:text/plain;charset=utf-8,' + encodeURIComponent(text)}
			download="document.txt"
			role="button"
		>
			Download .txt
		</a>

	)

	if (loading) {
		return (
			<div className="jumbotron">
				<Spinner />
			</div>
		)

	}

	if (shouldDisplayJumbo) {
		return (
			<div className="jumbotron">
				<button onClick={hideJumbo} type="button" className="close" aria-label="Close" style={{ marginTop: -50, marginRight: -10 }}>
					<span data-tip="minimize this message" aria-hidden="true">&times;</span>
				</button>
				<h1 style={{ textDecoration: 'underline' }} className="display-4">Welcome To Boilerplate</h1>
				<p className="lead">Drag and drop snippets to draft a new document</p>
				<hr className="my-4" />
				<p>When you're done, click the button to download text as .txt</p>
				{downloadButton}
				<ReactTooltip effect="solid" />
			</div>
		)
	}

	return (
		<Container className="jumbotron">
			<h4 style={{ textDecoration: 'underline' }}>Welcome To Boilerplate</h4>
			<div className="flex">
				<p>Drag and drop snippets to draft a new document. When you're done, click the button to download text as .txt</p>
				{downloadButton}
			</div>
		</Container>
	)

}

Jumbotron.propTypes = {
	shouldDisplayJumbo: bool.isRequired,
	hideJumbo: func.isRequired,
	text: string.isRequired,
	loading: bool,
}

export default Jumbotron;