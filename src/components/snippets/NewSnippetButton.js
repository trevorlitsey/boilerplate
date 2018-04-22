import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
	width: 100%;
	background: none;
	border: 1.4px solid var(--gray);
	padding: 10px;
	transition: all .2s;
	cursor: pointer;

	&:hover {
		background: var(--light);
	}
`

const iconStyles = {
	margin: '0 10px',
	color: 'var(--gray)',
}

const NewSnippetButton = ({ showModal }) => (
	<Button onClick={showModal} type="button" className="rounded">
		+ Add New Snippet
	</Button>
)

NewSnippetButton.propTypes = {
	showModal: func.isRequired,
}


export default NewSnippetButton;