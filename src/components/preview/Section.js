import React from 'react';

// needs to be class for refs!
class Section extends React.Component {

	render() {

		const { id, title, content } = this.props;

		return (
			<div>
				<h4 id={id}>{title}</h4>
				<p>{content}</p>
			</div>
		)
	}
}

export default Section;