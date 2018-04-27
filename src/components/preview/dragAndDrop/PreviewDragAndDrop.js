import React, { Component } from 'react';
import { object, array } from 'prop-types';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Spinner from '../../shared/Spinner';

import { GrayH4 } from '../../../styles/components';

import { getPreviewItemStyle, getPreviewListStyle } from './styles';

const NoneYetStyles = {
	display: 'flex',
	alignItems: 'center',
}

class PreviewDragAndDrop extends Component {

	static propTypes = {
		snippets: object.isRequired,
		draftOrder: array.isRequired,
	}

	render() {

		const { snippets, draftOrder, loading } = this.props;

		if (loading) {
			return (
				<div>
					<Droppable droppableId="draftOrder">
						{(provided, snapshot) => (
							<div
								className="rounded"
								ref={provided.innerRef}
								style={getPreviewListStyle(snapshot.isDraggingOver)}
							>
								<div style={{ margin: '100px 0' }}>
									<Spinner />
								</div>
							</div>
						)}
					</Droppable>
				</div>
			)
		}


		if (!draftOrder.length) {
			return (
				<div>
					<Droppable droppableId="draftOrder">
						{(provided, snapshot) => (
							<div
								className="rounded"
								ref={provided.innerRef}
								style={getPreviewListStyle(snapshot.isDraggingOver)}
							>
								<h5 style={{ margin: '100px 0', textAlign: 'center', color: 'var(--gray)' }}>Drag snippets here.</h5>
							</div>
						)}
					</Droppable>
				</div>
			)
		}

		return (
			<div>
				<Droppable droppableId="draftOrder">
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
							className="rounded"
							data-test="draftOrder"
							style={getPreviewListStyle(snapshot.isDraggingOver)}
						>
							{draftOrder && draftOrder.map((id, index) => {

								const snippet = snippets[id];

								if (!snippet) return;

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
			</div>
		);
	}
}

export default PreviewDragAndDrop;
