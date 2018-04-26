import React from 'react';
import { string } from 'prop-types';

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
			<div>
				<h4 id={id}>{title}</h4>
				<p>{text}</p>
			</div>
		)
	}
}

export default Section;