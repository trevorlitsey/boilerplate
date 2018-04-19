import ReactDOM from 'react-dom';

export const findNewActive = (that) => {
	const draft = [...that.props.draft];

	const { scrollTop, clientHeight: scrollportHeight, scrollHeight } = ReactDOM.findDOMNode(that.refs['container']); // container

	let newActive;

	// we are at the top
	if (scrollTop <= 20) {
		newActive = draft[0].id;
	}

	// we are at the bottom
	if (!newActive && scrollTop + scrollportHeight >= scrollHeight - 5) {
		newActive = draft[draft.length - 1].id;
	}

	// we are somewhere in the middle
	if (!newActive) {

		draft
			.reverse() // search from bottom up
			.forEach((text) => {

				if (newActive) return;

				const { id } = text;
				const { offsetTop } = ReactDOM.findDOMNode(that.refs[id]); // paragraph

				if (offsetTop < scrollTop) {
					newActive = id;
				}
			})
	}

	return newActive;
}