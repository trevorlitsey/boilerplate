import React from 'react';
import { object, func, string, bool } from 'prop-types';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowDown from '@fortawesome/fontawesome-free-solid/faArrowDown';

import Spinner from '../shared/Spinner';
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

const filterFunc = ([key, values], filterQuery) => {

	const isInTags = values.tags.map(tag => {
		if (tag.value.toLowerCase().includes(filterQuery)) return true;
	})

	const isInTitle = values.title.toLowerCase().includes(filterQuery);

	const isInText = values.text.toLowerCase().includes(filterQuery);

	if (isInTags.includes(true) || isInTitle || isInText) {
		return [key, values]
	}

}


const SnippetWell = ({ snippets, showModal, loading, filterQuery }) => {

	if (loading) {
		return (
			<ContainerOff>
				<Spinner />
			</ContainerOff>
		)
	}

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
			{Object.entries(snippets)
				.filter(([key, values]) => filterFunc([key, values], filterQuery))
				.map(([key, snippet]) =>
					<Card key={key} id={key} {...snippet} showModal={showModal} />
				)}
		</Container>
	)
}

SnippetWell.propTypes = {
	snippets: object.isRequired,
	showModal: func.isRequired,
	filterQuery: string.isRequired,
	loading: bool,
}

export default SnippetWell;