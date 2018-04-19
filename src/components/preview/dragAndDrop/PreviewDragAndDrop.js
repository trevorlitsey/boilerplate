import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { getPreviewItemStyle, getPreviewListStyle } from './styles';

class PreviewDragAndDrop extends Component {

	render() {

		const { draft, activeItemId } = this.props;

		return (
			<Droppable droppableId="draft">
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						className="rounded"
						style={getPreviewListStyle(snapshot.isDraggingOver)}
					>
						{draft.map((item, index) => (
							<Draggable className="draggable" key={item.id} draggableId={item.id} index={index}>
								{(provided, snapshot) => (
									<div
										className="card"
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										style={getPreviewItemStyle(
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
