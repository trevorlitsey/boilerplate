import React from 'react';

// needs to be class for refs!
class Section extends React.Component {

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