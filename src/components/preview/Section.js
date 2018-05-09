import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`

	h4 {
		color: var(--secondary);
		text-decoration: underline;
	}
`

// needs to be class for refs!
class Section extends React.Component {

	static propTypes = {
		id: string.isRequired,
		title: string.isRequired,
		text: string.isRequired,
	}

	render() {

		const { id, title, text } = this.props;

		return (
			<Container>
				<h4 data-test="title" id={id}>{title}</h4>
				<p data-test="text" >{text}</p>
			</Container>
		)
	}
}

export default Section;