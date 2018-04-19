import React from 'react';
import styled from 'styled-components';

import { findNewActive } from './helpers';

import Section from './Section';

const Container = styled.div`

	position: relative; // must be position relative for scroll math to work!
	border: 2px solid #f8f9fa;
	padding: 20px;

	.scrollspy {
		padding: 0 20px;
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
			<Container ref="container" onScroll={this.handleScroll} className="scrollspy rounded">
				{draft.map(item =>
					<Section
						ref={item.id}
						key={item.id}
						{...item}
					/>
				)}
			</Container>
		)
	}
}

export default Document;