import React from 'react';
import { object, func } from 'prop-types';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowDown from '@fortawesome/fontawesome-free-solid/faArrowDown';

import Card from './Card';

const Container = styled.div`
	width: 100%;
	min-height: 200px;
	background: var(--light);
	padding: 8px;
	margin-bottom: 10px;
	box-shadow: 0px 0px 2px inset;
	display: grid;
	grid-gap: 8px;
	grid-template-columns: repeat( auto-fill, minmax(200px, 1fr) );
`

const ContainerOff = Container.extend`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: var(--secondary);

	& > .icon {
		font-size: 2rem;
	}

`

const SnippetWell = ({ snippets, showModal }) => {

	if (!Object.keys(snippets).length) {
		return (
			<ContainerOff className="rounded">
				<h3>No Snippets Yet!</h3>
				<p>click the button below to get started</p>
				<FontAwesomeIcon icon={faArrowDown} className="icon" />
			</ContainerOff>
		)
	}

	return (
		<Container className="rounded">
			{Object.entries(snippets).map(([key, snippet]) => <Card key={key} id={key} {...snippet} showModal={showModal} />)}
		</Container>
	)
}

SnippetWell.propTypes = {
	snippets: object.isRequired,
	showModal: func.isRequired,
}

export default SnippetWell;