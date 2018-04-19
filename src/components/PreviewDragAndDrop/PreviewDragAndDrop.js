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

class PreviewDragAndDrop extends Component {

	render() {

		const { draft, activeItemId } = this.props;

		return (
			<Droppable droppableId="draft">
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						className="rounded"
						style={getListStyle(snapshot.isDraggingOver)}
					>
						{draft.map((item, index) => (
							<Draggable className="draggable" key={item.id} draggableId={item.id} index={index}>
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
		);
	}
}

export default PreviewDragAndDrop;
