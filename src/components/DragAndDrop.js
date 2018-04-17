import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const grid = 6;

const getItemStyle = (isDragging, isActive, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,
	background: isActive ? 'var(--primary)' : '',
	color: isActive ? 'var(--white)' : '',
	lineHeight: 1,

	// styles we need to apply on draggables
	...draggableStyle,
});

const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? 'var(--gray)' : 'var(--light)',
	padding: grid,
	width: 250,
	transition: 'all .3s'
});

class DragAndDrop extends Component {
	constructor(props) {
		super(props);

		this.onDragEnd = this.onDragEnd.bind(this);
	}

	onDragEnd(result) {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const preview = reorder(
			this.props.preview,
			result.source.index,
			result.destination.index
		);

		this.props.updatePreview(preview);
	}

	// Normally you would want to split things out into separate components.
	// But in this example everything is just done in one place for simplicity
	render() {

		const { preview, activeItemId } = this.props;

		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId="droppable">
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
							className="rounded"
							style={getListStyle(snapshot.isDraggingOver)}
						>
							{preview.map((item, index) => (
								<Draggable className="draggable" key={item.id} draggableId={item.id} index={index} internalScroll={true}>
									{(provided, snapshot) => (
										<div
											className="card"
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											style={getItemStyle(
												snapshot.isDragging,
												item.id === activeItemId,
												provided.draggableProps.style,
											)}
										>
											<h5 className="card-title">{item.title}</h5>
											<p className="card-text">{item.content.length > 80 ? item.content.substring(0, 80) + ' ...' : item.content}</p>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		);
	}
}

// Put the thing into the DOM!
export default DragAndDrop;
