import React from 'react';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowDown from '@fortawesome/fontawesome-free-solid/faArrowDown';

const Container = styled.div`
	width: 100%;
	min-height: 200px;
	background: var(--light);
	margin-bottom: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: var(--secondary);
	box-shadow: 0px 0px 2px inset;
`

const SnippetWell = ({ snippets }) => {

	if (!snippets) {
		return (
			<Container className="rounded">
				<h3>No Snippets Yet!</h3>
				<p>click the button below to get started</p>
				<FontAwesomeIcon icon={faArrowDown} />
			</Container>
		)
	}

	return (
		<div className="container-fluid">

		</div>
	)
}

export default SnippetWell;