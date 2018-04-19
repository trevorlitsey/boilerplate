import React from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip'
import { Draggable, Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	background: var(--light);
	padding: 10px;
	margin-bottom: 20px;

	& > .card {
		padding: 8px;
		margin: 2px;
	}

	.icon:hover {
		cursor: pointer;
	}

`

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	padding: grid * 2,
	margin: `0 ${grid}px 0 0`,
	lineHeight: 1,
	minWidth: 100,
	textAlign: 'center',
	display: 'inline-block',

	// styles we need to apply on draggables
	...draggableStyle,
});

const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? 'var(--gray)' : 'var(--light)',
	padding: grid,
	transition: 'all .3s',
	display: 'flex',
	overflow: 'scroll',
});

class SnippetDragAndDrop extends React.PureComponent {

	render() {

		const { snippets } = this.props;

		return (
			<Droppable droppableId="snippets" direction="horizontal">
				{(provided, snapshot) => (
					<div
						className="rounded"
						ref={provided.innerRef}
						style={getListStyle(snapshot.isDraggingOver)}
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
											style={getItemStyle(
												snapshot.isDragging,
												provided.draggableProps.style
											)}
										>
											<p
												className="card-text"
											>
												{snippet.title}
											</p>
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