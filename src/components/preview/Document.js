import React from 'react';
import styled from 'styled-components';

import { findNewActive } from './helpers';

import Section from './Section';

const Container = styled.div`

	position: relative; // must be position relative for scroll math to work!
	border: 1px solid rgba(0,0,0,.2);
	background: rgba(0,0,0,.1);
	height: 100%;
	
	.scrollspy {
		height: 100%;
		background: var(--white);
		margin: 0 20px;
		padding: 40px;

		&.placeholder {
			color: var(--gray);
		}

	}
`

class Document extends React.Component {

	handleScroll = () => {

		const newActive = findNewActive(this);

		this.props.updateActive(newActive)

	}

	render() {

		const { draftOrder, snippets } = this.props;

		if (!draftOrder || draftOrder.length === 0) {
			return (
				<Container ref="container" onScroll={this.handleScroll} className="rounded">
					<div className="scrollspy placeholder">
						<h4>Intro</h4>
						<p>We the People of the United States, in Order to form a more perfect Union ...</p>
					</div>
				</Container>
			)
		}

		return (
			<Container ref="container" onScroll={this.handleScroll} className="rounded">
				<div className="scrollspy">
					{draftOrder.map(id =>
						<Section
							ref={id}
							key={id}
							{...snippets[id]}
						/>
					)}
				</div>
			</Container>
		)
	}
}

export default Document;