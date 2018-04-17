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

class Preview extends React.Component {

	handleScroll = () => {

		const preview = [...this.props.preview];

		const { scrollTop, clientHeight, scrollHeight } = ReactDOM.findDOMNode(this.refs['container']); // container

		let paraFound = false;
		let newActive;

		if (scrollTop <= 20) {
			paraFound = true;
			newActive = preview[0].id;
		}

		if (!newActive) {

			preview
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

		const { preview } = this.props;

		return (
			<Container ref="container" onScroll={this.handleScroll} data-spy="scroll" data-target="#list-example" data-offset="0" className="scrollspy rounded">
				{preview.map(item =>
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

export default Preview;