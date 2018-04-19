import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { convertObjToArr } from './helpers';

const Container = styled.div`

	position: relative; // must be position relative for scroll math to work!
	border: 2px solid #f8f9fa;
	padding: 20px;

	.scrollspy {
		padding: 0 20px;
	}
`

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

class PreviewDocument extends React.Component {

	handleScroll = () => {

		const draft = [...this.props.draft];

		const { scrollTop, clientHeight, scrollHeight } = ReactDOM.findDOMNode(this.refs['container']); // container

		let paraFound = false;
		let newActive;

		// we are at the top
		if (scrollTop <= 20) {
			paraFound = true;
			newActive = draft[0].id;
		}

		// we are at the bottom
		if (!newActive && scrollTop + clientHeight >= scrollHeight - 5) {
			paraFound = true;
			newActive = draft[draft.length - 1].id;
		}

		// we are somewhere in the middle
		if (!newActive) {

			draft
				.reverse() // search from bottom up
				.forEach((text) => {

					if (paraFound) return;

					const { id } = text;

					// check if element has reached top of scroll box view
					const el = this.refs[id]
					const { offsetTop } = ReactDOM.findDOMNode(el); // element

					if (offsetTop < scrollTop && !paraFound) {
						newActive = id;
						paraFound = true;
					}
				})
		}

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

export default PreviewDocument;