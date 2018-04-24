import React from 'react';
import { object, array } from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip'
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { GrayH4 } from '../../../styles/components';

import { getSnippetItemStyle, getSnippetListStyle } from './styles';

class SnippetDragAndDrop extends React.PureComponent {

	static propTypes = {
		snippets: object.isRequired,
		snippetOrder: array.isRequired,
	}


	render() {

		const { snippets, snippetOrder } = this.props;

		return (
			<Droppable droppableId="snippetOrder" direction="horizontal">
				{(provided, snapshot) => (
					<div
						className="rounded"
						ref={provided.innerRef}
						style={getSnippetListStyle(snapshot.isDraggingOver)}
					>
						{snippetOrder && snippetOrder.map((id, index) => {

							const snippet = snippets[id];

							if (!snippet) return;

							const { title, text } = snippet;

							return (
								<Draggable key={id} draggableId={id} index={index}>
									{(provided, snapshot) => (
										<div>
											<div
												className="card"
												data-tip={text.length > 30 ? text.substring(0, 30) + ' ...' : text}
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												style={getSnippetItemStyle(
													snapshot.isDragging,
													provided.draggableProps.style
												)}
											>
												<p className="card-text">{title}</p>
											</div>
											<ReactTooltip effect="solid" />
										</div>
									)}
								</Draggable>
							)
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		)
	}
}

export default SnippetDragAndDrop;