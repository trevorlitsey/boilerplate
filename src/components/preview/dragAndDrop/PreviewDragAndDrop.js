import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { GrayH4 } from '../../../styles/components';

import { getPreviewItemStyle, getPreviewListStyle } from './styles';

const NoneYetStyles = {
	display: 'flex',
	alignItems: 'center',
}

class PreviewDragAndDrop extends Component {

	render() {

		const { snippets, draftOrder, activeItemId } = this.props;

		return (
			<Droppable droppableId="draftOrder">
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						className="rounded"
						style={getPreviewListStyle(snapshot.isDraggingOver)}
					>
						{draftOrder && draftOrder.map((id, index) => {

							const snippet = snippets[id];

							const { title, text } = snippet;

							return (
								<Draggable className="draggable" key={id} draggableId={id} index={index}>
									{(provided, snapshot) => (
										<div
											className="card"
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											style={getPreviewItemStyle(
												snapshot.isDragging,
												id === activeItemId,
												provided.draggableProps.style,
											)}
										>
											<h5 className="card-title">{title}</h5>
											<p className="card-text">{text.length > 80 ? text.substring(0, 80) + ' ...' : text}</p>
										</div>
									)}
								</Draggable>
							)
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		);
	}
}

export default PreviewDragAndDrop;
