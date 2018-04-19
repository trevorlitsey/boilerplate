import React from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip'
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { getSnippetItemStyle, getSnippetListStyle } from './styles';

class SnippetDragAndDrop extends React.PureComponent {

	render() {

		const { snippets } = this.props;

		return (
			<Droppable droppableId="snippets" direction="horizontal">
				{(provided, snapshot) => (
					<div
						className="rounded"
						ref={provided.innerRef}
						style={getSnippetListStyle(snapshot.isDraggingOver)}
					>
						{snippets.map((snippet, index) => (
							<Draggable key={snippet.id} draggableId={snippet.id} index={index}>
								{(provided, snapshot) => (
									<div>
										<div
											className="card"
											data-tip={snippet.content.length > 30 ? snippet.content.substring(0, 30) + ' ...' : snippet.content}
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											style={getSnippetItemStyle(
												snapshot.isDragging,
												provided.draggableProps.style
											)}
										>
											<p className="card-text">{snippet.title}</p>
										</div>
										<ReactTooltip effect="solid" />
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		)
	}
}

export default SnippetDragAndDrop;