import React from 'react';
import styled from 'styled-components';

import { findNewActive } from './helpers';

import Section from './Section';

const Container = styled.div`

	position: relative; // must be position relative for scroll math to work!
	border: 1px solid rgba(0,0,0,.2);
	background: rgba(0,0,0,.1);
	
	.scrollspy {
		background: var(--white);
		margin: 0 20px;
		padding: 20px;
	}
`

class Document extends React.Component {

	handleScroll = () => {

		const newActive = findNewActive(this);

		this.props.updateActive(newActive)

	}

	render() {

		const { draft } = this.props;

		return (
			<Container ref="container" onScroll={this.handleScroll} className="rounded">
				<div className="scrollspy">
					{draft.map(item =>
						<Section
							ref={item.id}
							key={item.id}
							{...item}
						/>
					)}
				</div>
			</Container>
		)
	}
}

export default Document;